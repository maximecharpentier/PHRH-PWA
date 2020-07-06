resource "aws_key_pair" "phrh_g12_ssh_key_pair" {
  key_name   = "phrh_g12_public_ssh_key"
  public_key = file(var.ssh_public_key_file)
}

resource "aws_instance" "phrh_g12_instance" {
  key_name               = "${aws_key_pair.phrh_g12_ssh_key_pair.key_name}"
  ami                    = "ami-0e11cbb34015ff725"
  instance_type          = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.phrh_g12_security_groups.id}"]
}