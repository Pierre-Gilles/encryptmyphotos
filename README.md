
<h1 align="center">
  <br>
  <a href="https://encryptmyphotos.com/"><img src="https://github.com/Pierre-Gilles/encryptmyphotos/raw/master/media/logo.gif" alt="Encrypt My Photos" width="200"></a>
  <br>
  Encrypt My Photos
  <br>
</h1>

<h4 align="center">End-to-end encrypted photo storage built on top of <a href="https://blockstack.org/" target="_blank">Blockstack</a>.</h4>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/Pierre-Gilles/encryptmyphotos.svg">
  <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/encryptmyphotos.svg?style=social">
  <img alt="Travis (.org)" src="https://img.shields.io/travis/Pierre-Gilles/encryptmyphotos.svg">
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#stack">Stack</a> •
  <a href="#how-to-use">Contributing</a> •
  <a href="#license">License</a>
</p>

![Demo](https://github.com/Pierre-Gilles/encryptmyphotos/raw/master/media/demo.jpeg)

## Key Features

* Drag & Drop your pictures to upload them
* End-To-End Encryption thanks to Blockstack technology
* Delete all files if you want to reset your account

## Stack

Encrypt My Photos is fully open-source and use open-source dependencies:

- [Blockstack](https://github.com/blockstack/blockstack.js/) for authentication and storage.
- [Preact](https://github.com/developit/preact) as front-end library. It's a tiny version of React with the same API.
- [Preact-router](https://github.com/developit/preact-router) for app routing.
- [immutability-helper](https://github.com/kolodny/immutability-helper) to mutate a copy of data without changing the original source

## Contributing

You can install Encrypt My Photos locally for development purpose by doing:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

## License

Encrypt My Photos is open-source and released under the MIT license.

---

> [encryptmyphotos.com/](https://encryptmyphotos.com/) &nbsp;&middot;&nbsp;
> Twitter [@encryptmyphotos](https://twitter.com/encryptmyphotos)