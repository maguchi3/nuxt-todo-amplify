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

- .config/.env.sample を参考に.env.development を作成。 API_KEY などの値を設定する
- plugin/amplify.js に設定が反映される

## launch App and Login

localhost を立ち上げる

```bash
$ npm run dev
```

SignIn が必要なので、メールアドレスと test 用の password でアカウントを作成してログイン。

これでアプリの動作が確認できるはず。
