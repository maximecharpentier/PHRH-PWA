resource "aws_default_vpc" "default" {
  tags = {
    Name = "PHRH VPC"
  }
}