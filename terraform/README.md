# Infrastructure

## People in charge

- Alexandre Delaloy

## Technical choices

### Docker & Docker Compose

#### Why we are using it

We use `Docker` firstly for its capacity to **create apps in remote dev environments**, but also for its ability to **connect different apps to each other**, and finally for its **ease of use and automation**.

#### How we are using it

We create **two images**:

- [phrh-client](https://hub.docker.com/repository/docker/blyndusk/phrh-client)
  - the React App, versioned by each release
  - running on port [8080](http://35.180.37.72:8080/)
- [phrh-fake-server](https://hub.docker.com/repository/docker/blyndusk/phrh-fake-server)
  - the API we're using a this moment, a JSON turned into a RESP API using [json-server](https://github.com/typicode/json-server)
  - running on port [3001](http://35.180.37.72:3001/)

### AWS

#### Why we are using it

We use `AWS` first of all for its **free virtual machine instance solutions**, but also for its **customization choices**.

#### How we are using it

We use an `Ubuntu` VM to host our **client** & **server apps**.

### Terraform

#### Why we are using it

We use `Terraform` for its capacity to **automate all the creation of an instance of a virtual machine** and all its **configuration**, in the `Infrastructure as Code` form

#### How we are using it

We create an **Ubuntu@18.04** (type `ami-096b8af6e7e8fb927`) *instance*, located in Paris (`eu-west-3`)

We use a *security group* that allows **all ountbound connections**, but only allows inbound connections on ports `8080` and `3001` (**client** and **server** apps), and `22` (**SSH**)

Obviously, we provide a **public key** to be able to connect in `SSH`.



