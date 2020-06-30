# Infrastructure

## Terraform

1. Generate RSA **public/private** keys

2. **paste** the public key here: `config/terraform/ec2.tf`

```TF
resource "aws_key_pair" "admin" {
  key_name   = "phrh-key"
  public_key = "<PUBLIC_RSA_KEY>"
}
```

3. (Optional) Replace the **region** here: `config/terraform/provider.tf`

```tf
provider "aws" {
  profile = "default"
  region  = "<YOUR_REGION>"
}

```

4. To create an **AWS EC2 instance** with security groups, public/private key, vpc, run this command:

```bash
terraform init ; terraform plan ; terraform apply
```

## Ansible 

1. get the IPv4 adress on the AWS EC2 console, and replace the **old adress** here : `config/ansible/inventory.ini` :
   
```INI
[app]
<IPV4_EC2_INSTANCE_ADRESS>
```

2. To **install deps** like Python, Docker, run this command:

```bash
ansible-playbook -i inventory.ini app.yml --user ubuntu --private-key <PATH_TO_YOUR_PRIVATE_KEY> --tags="install"       
```

3. To **deploy the application to your EC2 instance**, run this command:

```bash
ansible-playbook -i inventory.ini app.yml --user ubuntu --private-key <PATH_TO_YOUR_PRIVATE_KEY> --tags="deploy"       
```

4. To do all this **in one time**, run this command:

```bash
ansible-playbook -i inventory.ini app.yml --user ubuntu --private-key <PATH_TO_YOUR_PRIVATE_KEY>       
```

