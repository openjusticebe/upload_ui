[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/betagouv/andi-matching/graphs/commit-activity)
[![Generic badge](https://img.shields.io/badge/Open-Justice-green.svg)](https://shields.io/)
<p align="center">
  <a href="https://openjustice.be">
    <img alt="logo Openjustice.be" src="https://openjustice.be/wp-content/uploads/2020/10/cropped-Open-Justice.png" width="90" />
  </a>
</p>
<h1 align="center">
  Openjustice.be
</h1>

[OpenJustice.be](https://openjustice.be) is a non-profit legaltech aiming to open up access to legal knowledge (court decisions, law, doctrine, ...) and instill a true digital-native culture in the world of belgian justice digitalisation.

# Upload UI
This component is part of our service to provide a public and free repository of anonymised belgian court decisions.

## Stack
This interface is a JAMstack [Gatsby](https://www.gatsbyjs.org/) application. Accessibility, in all its forms, is as essential to us as it is -or should be- to any digital public service. [React](https://fr.reactjs.org/) is second to none for the tools in provides natively to achieve high levels of web accessibility.

## Deploy locally
After cloning the repository, the application can be run directly or through docker :
```bash
# Install gatsby if needed
> npm install -g gatsby-cli
# Install dependencies
> yarn install
# Run develop server
> gatsby develop
# After initialisation, local server is available under http://localhost:8000/
```

```bash
# Run using Docker
> docker build -t "ui" ./  && docker run --rm -it -p 80:80 ui 
# After initialisation, local server is available under http://localhost/
```

## Full local environment
Using [docker-compose](https://docs.docker.com/compose/), a full local development environment, missing only partial functionnality, can be run.

```bash
# set local env variables
> . localdev/env.sh
# run docker-compose
> docker-compose -f localdev/docker-compose.yml up
# Re-build a single container
> docker-compose -f localdev/docker-compose.yml up -d --no-deps --build tika_api
```
