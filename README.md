# PHRH-PWA

> A progressive web-app about managing homeless accommodation in hotels

- [PHRH-PWA](#phrh-pwa)
  - [I - Guidelines](#i---guidelines)
    - [1. Prod & Dev branches](#1-prod--dev-branches)
    - [2. Features & Fix branches](#2-features--fix-branches)
    - [3. Naming chart](#3-naming-chart)
  - [II - Technical choices & specifications](#ii---technical-choices--specifications)
    - [Front-End](#front-end)
    - [Back-End](#back-end)
    - [Infrastructure](#infrastructure)
  - [IV - Team](#iv---team)
  - [V - License](#v---license)

## I - Guidelines

### 1. Prod & Dev branches

- The `master` branch is the **production** branch. **NEVER** push *source* or *compiled* code on it. **Documentation** and stuff like that are allowed

- The `develop` branch is the developement branch (lol). **NEVER DIRECTLY** push *source* or *compiled* code on it. Instead, merge your `<feature|fix>` branches on it

### 2. Features & Fix branches

- A `feature/<client|server>-name-of-the-feature` is used to implement **new content** to the app
  - e.g. `feature/client-router`

- A `fix/<client|server>-bug-to-fix` is used to fix a bug (lol)
  - e.g. `fix/server-env-vars`

- **Delete** your branch if the feature or fix is **done**

### 3. Naming chart

- **"Visitor"** 
  - the person in charge of **going to the hotels** in order to make a **state of insalubrity**. They are also responsible for **organizing their planning** according to the **resources provided** by the planner
- **"Planner"** 
  - the person responsible for **pooling available hotels** organized **according to different criteria and priorities** with **visitors**

 
## II - Technical choices & specifications

### Front-End

- [React](https://reactjs.org/) 
  - for its ease of use, its numerous plugins, its precise doc and its prototype-oriented aspect
- [styled components](https://styled-components.com/)
  - for its dynamism and adaptability

### Back-End

- [Express](https://expressjs.com/)
  - for its ease of use

### Infrastructure

- [AWS](https://aws.amazon.com/)
  - to instantiate our VM in an adequate environment
- [Docker](https://www.docker.com/)
  - for securely building and sharing our client & server
- [Terraform](https://www.terraform.io/)
  - for automation & managing infrastructures

=> [Client Docker image](https://hub.docker.com/repository/docker/blyndusk/phrh-client)

## IV - Team

- Sophia GOUNANI
- Maxime CHARPENTIER 
- Nancy CAMPBELL
- Nino LAM
- Nicolas MARTIN
- Pierre-Alexis KRSTIC
- Alexandre DELALOY


## V - License

Under [MIT](https://github.com/blyndusk/PHRH-PWA/blob/master/LICENSE) license.