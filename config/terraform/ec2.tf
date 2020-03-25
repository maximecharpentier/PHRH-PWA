resource "aws_key_pair" "admin" {
  key_name   = "phrh-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDuUG0DtWnHIkR8z7zdSSIkIwuPfCpgwgPsPtwCvQ2VmHfFmdO9E/DWUQKLX2Taf/89qNcEcq86wu9OU3xBx1fSOVJ1yc8US5shUICgdPD+ozRmT2qnxcNzgmNRtV1oFhhM8BWvzCRNV8lmlW/Lkb/kTye/wKEAnYGEq4OFGW7aHBIuJ3AQ1ILL3Mkh8iT6JCoc6iuEo68m2kQdC1KDsS4s0kU6ySTpJZQZQM3vYQD/C/sd54DVf1WJCQVZLk9ttWZQMEVb2HVYih+e0lfX/UAeVoS/hvoazGJEZOl+6q0pVHsUMUNZwHNLDldZslXYzzAl9GNtQ9PObS8Gd1EXcRBR alexandre.delaloy@FR-PAR1-M16183"
}

resource "aws_instance" "phrh-server" {
  ami           = "ami-096b8af6e7e8fb927"
  instance_type = "t2.micro"
  key_name      = "phrh-key"
  vpc_security_group_ids = [
    "${aws_security_group.phrh_security_group.id}"
  ]
}