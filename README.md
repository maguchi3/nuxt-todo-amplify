# nuxt-todo

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Amplify Setup
[Amplifyのドキュメント](https://docs.amplify.aws/cli/teams/shared)に、すでに構築されたAmplifyの環境を利用する方法が記載されています。

initを実行して以下のように設定します。
```bash
$ amplify init
? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: dev
? Choose your default editor: Visual Studio Code
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile
? Please choose the profile you want to use default
```

## launch App and Login
localhostを立ち上げる
```bash
$ npm run dev
```

SignInが必要なので、メールアドレスとtest用のpasswordでアカウントを作成してログイン。

これでアプリの動作が確認できるはず。
