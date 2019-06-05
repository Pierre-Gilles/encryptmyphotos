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

- Drag & Drop your pictures to upload them
- End-To-End Encryption thanks to Blockstack technology
- Delete all files if you want to reset your account

## Stack

Encrypt My Photos is fully open-source and use open-source dependencies:

- [Blockstack](https://github.com/blockstack/blockstack.js/) for authentication and storage.
- [Preact](https://github.com/developit/preact) as front-end library. It's a tiny version of React with the same API.
- [Preact-router](https://github.com/developit/preact-router) for app routing.
- [immutability-helper](https://github.com/kolodny/immutability-helper) to mutate a copy of data without changing the original source

## FAQ

### What is Encrypt My Photos?

Encrypt my Photos is an app which allows you to store pictures in the cloud (like Google Photos), but in a privacy-friendly and decentralized way thanks to Blockstack technology.

### Can I delete my data?

Yes. If you wish to start again and clean your account, you can wipe all pictures stored.

### How much storage can I use?

We use Blockstack Gaia storage to store files, so there is no limit in the amount of pictures you can upload. It's unlimited!

### Is it really free?

Yes! Encrypt My Photos is sponsored by Blockstack App Mining challenge, therefore we don't charge our user and the app remains free to use!

### Why do I need to create a Blockstack account?

As we use Blockstack technology to store pictures, you need to create an account on their platform to use Gaia storage. You can read more on their [website](https://blockstack.org/) about how their technology works.

### What is different from Google Photos or other alternative ?

Both products allows users to store pictures online, but our technology is completely different. We respect the privacy of our users by encrypting their picture before storing them online. It means that if you store pictures in our app, you and only you will be able to see them. We won't even know that you are storing pictures on our platform, because we don't have any centralized database.

For more information on the technology, you can read more on [Blockstack website](https://blockstack.org/).

## Contributing

You can install Encrypt My Photos locally for development purpose by doing:

```bash
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
