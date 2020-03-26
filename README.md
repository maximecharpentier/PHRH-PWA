# PHRH-PWA
------

------

<p>
  <a href="https://github.com/blyndusk/PHRH-PWA/actions" target="_blank">
    <img src="https://github.com/blyndusk/PHRH-PWA/workflows/Main%20Workflow/badge.svg?branch=master" alt="GitHub Actions"/>
  </a>
  <a href="http://35.180.37.72:8080/" target="_blank">
    <img src="https://img.shields.io/website?url=http%3A%2F%2F35.180.37.72%3A8080" alt="PHRH website"/>
  </a>
  
  <a href="https://github.com/blyndusk/PHRH-PWA/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/blyndusk/PHRH-PWA" alt="GitHub License"/>
  </a>

  <br/>
   <a href="https://github.com/blyndusk/PHRH-PWA/pulls?q=is%3Aopen+is%3Apr" target="_blank">
    <img src="https://img.shields.io/github/issues-pr-raw/blyndusk/PHRH-PWA" alt="GitHub open PR"/>
  </a>
  <a href="https://github.com/blyndusk/PHRH-PWA/pulls?q=is%3Apr+is%3Aclosed" target="_blank">
    <img src="https://img.shields.io/github/issues-pr-closed-raw/blyndusk/PHRH-PWA" alt="GitHub closed PR"/>
  </a>
  <a href="https://github.com/blyndusk/PHRH-PWA/issues?q=is%3Aopen+is%3Aissue" target="_blank">
    <img src="https://img.shields.io/github/issues-raw/blyndusk/PHRH-PWA" alt="GitHub open issues"/>
  </a>
  <a href="https://github.com/blyndusk/PHRH-PWA/issues?q=is%3Aissue+is%3Aclosed" target="_blank">
    <img src="https://img.shields.io/github/issues-closed-raw/blyndusk/PHRH-PWA" alt="GitHub closed issues"/>
  </a>
 
</p>


> A progressive web-app about managing homeless accommodation in hotels

- [PHRH-PWA](#phrh-pwa)
  - [I - Links](#i---links)
    - [1. Apps](#1-apps)
    - [2. Technical choices & specifications](#2-technical-choices--specifications)
    - [3. Docker images](#3-docker-images)
  - [II - Guidelines](#ii---guidelines)
    - [1. Prod & Dev branches](#1-prod--dev-branches)
    - [2. Features & Fix branches](#2-features--fix-branches)
    - [3. Naming chart](#3-naming-chart)
  - [III - Team](#iii---team)
  - [IV - License](#iv---license)

## I - Links

### 1. Apps

- [App](http://35.180.37.72:8080)
- [API](http://35.180.37.72:3001)

### 2. Technical choices & specifications

- [Front-End](https://github.com/blyndusk/PHRH-PWA/blob/master/client/README.md)
- [Back-End](https://github.com/blyndusk/PHRH-PWA/blob/master/server/README.md)
- [Infrastructure](https://github.com/blyndusk/PHRH-PWA/blob/master/terraform/README.md)


### 3. Docker images

- [phrh-client](https://hub.docker.com/r/blyndusk/phrh-client)
- [phrh-fake-server](https://hub.docker.com/r/blyndusk/phrh-fake-server)


## II - Guidelines

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


## III - Team

- **Sophia GOUNANI**
  - Project Leader
  - Designer
- **Nancy CAMPBELL**
  - Design
- **Maxime CHARPENTIER**
  - Front-end
- **Nino LAM**
  - Front-end
- **Nicolas MARTIN**
  - Front-end
- **Pierre-Alexis KRSTIC**
  - Back-end
- **Alexandre DELALOY**
  - Technical leader
  - Infrastructure


## IV - License

Under [MIT](https://github.com/blyndusk/PHRH-PWA/blob/master/LICENSE) license.
