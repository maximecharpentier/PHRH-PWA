# PHRH-PWA

> A progressive web-app about managing homeless accommodation in hotels

- [PHRH-PWA](#phrh-pwa)
  - [I - Guidelines](#i---guidelines)
    - [1. Prod & Dev branches](#1-prod--dev-branches)
    - [2. Features & Fix branches](#2-features--fix-branches)
  - [II - Client](#ii---client)
    - [Todo list](#todo-list)
  - [III - Server / API](#iii---server--api)
    - [Todo list](#todo-list-1)
  - [IV - Infrastructure](#iv---infrastructure)
    - [Images](#images)
  - [V - Team](#v---team)
  - [VI - License](#vi---license)

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
 
## II - Client

### Todo list

- [ ] Create React App (choose JS/TS)
- [ ] Install a linter
- [ ] Jest is already installed, create UT/DT
- [ ] Create GitHub Actions

## III - Server / API

### Todo list

## IV - Infrastructure

We use a AWS EC2 instance to run our app, with docker images.

### Images


## V - Team

- Sophia GOUNANI
- Maxime CHARPENTIER 
- Nancy CAMPBELL
- Nino LAM
- Nicolas MARTIN
- Pierre-Alexis KRSTIC
- Alexandre DELALOY


## VI - License

Under [MIT](https://github.com/blyndusk/PHRH-PWA/blob/master/LICENSE) license.