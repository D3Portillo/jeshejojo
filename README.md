# Jeshejojo

A pet project to practice solidity. It's an Instagram-ish app that stores text, a fontColor and background color. The final idea is add the ability to mint a post for your self as an NFT.

## Project Summary / Stack

This project evolved from taking the entry course to Solidity development in buildspace -> https://buildspace.so/p/build-solidity-web3-app.

Take a look to `contracts/` folder.

In this app, user likes are stored on a redis(Using Upstash). Those are being staled served to end user from a Vercel Function.

Alchemy notify is being used as an oracle to execute a Vercel Function which then creates a Tweet whenever a new item arrives at [@jeshejojo_app](https://twitter.com/jeshejojo_app)

As any dev looking back to old code I know some stuff is wrong. But I'm proud I jumped into The Space with this :). Keep coding.
