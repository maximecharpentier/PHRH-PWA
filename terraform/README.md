# Infrastructure

- [Infrastructure](#infrastructure)
  - [People in charge](#people-in-charge)
  - [Technical choices](#technical-choices)
    - [1. Docker & Docker Compose](#1-docker--docker-compose)
      - [Why we are using it](#why-we-are-using-it)
      - [How we are using it](#how-we-are-using-it)
    - [2. AWS](#2-aws)
      - [Why we are using it](#why-we-are-using-it-1)
      - [How we are using it](#how-we-are-using-it-1)
    - [3. Terraform](#3-terraform)
      - [Why we are using it](#why-we-are-using-it-2)
      - [How we are using it](#how-we-are-using-it-2)
    - [4. GitHub Actions](#4-github-actions)
      - [Why we are using it](#why-we-are-using-it-3)
      - [How we are using it](#how-we-are-using-it-3)

## People in charge

- Alexandre Delaloy

## Technical choices

### 1. Docker & Docker Compose

#### Why we are using it

We use `Docker` firstly for its capacity to **create apps in remote dev environments**, but also for its ability to **connect different apps to each other**, and finally for its **ease of use and automation**.

#### How we are using it

We create **two images**:

- [phrh-client](https://hub.docker.com/repository/docker/blyndusk/phrh-client) 
  - the React App, versioned by each release
  - running on port [8080](http://35.180.37.72:8080/)
  - [Dockerfile 🔗](https://github.com/blyndusk/PHRH-PWA/blob/master/client/Dockerfile)
  - ![](https://img.shields.io/docker/pulls/blyndusk/phrh-client?style=flat-square)
- [phrh-fake-server](https://hub.docker.com/repository/docker/blyndusk/phrh-fake-server)
  - the API we're using a this moment, a JSON turned into a RESP API using [json-server](https://github.com/typicode/json-server)
  - running on port [3001](http://35.180.37.72:3001/)
  - [Dockerfile 🔗](https://github.com/blyndusk/PHRH-PWA/blob/master/server/Dockerfile)
  - ![](https://img.shields.io/docker/pulls/blyndusk/phrh-fake-server?style=flat-square)

### 2. AWS

#### Why we are using it

We use `AWS` first of all for its **free virtual machine instance solutions**, but also for its **customization choices**.

#### How we are using it

We use an `Ubuntu` VM to host our **client** & **server apps**.

### 3. Terraform

#### Why we are using it

We use `Terraform` for its capacity to **automate all the creation of an instance of a virtual machine** and all its **configuration**, in the `Infrastructure as Code` form

#### How we are using it

We create an **Ubuntu@18.04** (type `ami-096b8af6e7e8fb927`) *instance*, located in Paris (`eu-west-3`). [Source file 🔗](https://github.com/blyndusk/PHRH-PWA/blob/master/terraform/ec2.tf).

We use a *security group* that allows **all ountbound connections**, but only allows inbound connections on ports `8080` and `3001` (**client** and **server** apps), and `22` (**SSH**). [Source file 🔗](https://github.com/blyndusk/PHRH-PWA/blob/master/terraform/security_groups.tf).

Obviously, we provide a **public key** to be able to connect in `SSH`.

### 4. GitHub Actions

#### Why we are using it

We use `GitHub Actions` to be able to check at **each merge in development**, and especially at each **production launch**, that the code is well **linted**, **tested** and **built**

#### How we are using it

We use a [YML file 🔗](https://github.com/blyndusk/PHRH-PWA/blob/master/.github/workflows/main.yml) which will, step by step, install `node@10.x.x` on an `Ubuntu` VM, then in the client folder:
- **install** dependencies
- **lint** source files
- **build** the app
- **test** the app
