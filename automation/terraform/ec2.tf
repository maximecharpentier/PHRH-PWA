resource "aws_key_pair" "phrh_g10_ssh_key_pair" {
  key_name   = "phrh_g10_public_ssh_key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDLFJmbpyPWNdVO6Skh8V0XcBjVMp5wDpBhJJyHxDzN+150gpef/thFGrOERhszqVR5Vei6v8EqMX6oFy39CDzni1fIref6274ohUBOQjrBhTDzTWgF6ZhJtuFti9VCm4MJUTI4aI9y0QF6u+Vi+MoPPKN71siHIjnjLVwg+zcHvACCJNEEZcbQvwaB2ulbCmHyRkg1gNXC00AqTNCnrMz61r2nyLagwHAOnyO3vZXw3sjigUnIAUaz2qvmRfo1I9KZDO3O9eJrC4Wai+gvzCdEhAtQNBdqkkFrdQDH3pHemaOC4ZMWN4FDuPjOyJvJS9xNvXhMwfyZGgBbu6k0mPdWuYBzlYU8LPg8StMHqkK+inkMqKT03LlhH+bm3fDIbGMj6FmKwB5ldGrdCi45kRcgMw27ZZ7aQuDw1Zg19Z1cxQWEjVqO4V1nVEtE+KwcL9cqIwhMrUZxkccTyj+l6xZvgpOqX3cMlQIDhLxx3GbNeB/YxhZvtGw4fQ01oU0MDTAYvGcmReTiog1E4S/yQHlWvo4Sh+KLQ2vR4T/thFmlxqiAYhgvUyLm8I+6MWVE9J08jKBss5wgqnPYnpOIZuzKqBzmOVjdv7dnXvSxD7A3DfmPNSECHTf8SzrO7q1IZbjDuXBw6kjU7/0aKrTpijpCUzP3lfXByjEcm7CbSS9iHQ== blyndusk@blynbuntu"
}

resource "aws_instance" "phrh_g10_instance" {
  key_name               = "${aws_key_pair.phrh_g10_ssh_key_pair.key_name}"
  ami                    = "ami-0e11cbb34015ff725"
  instance_type          = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.phrh_g10_security_groups.id}"]
}