# Flip Tech Test

## Disclaimer

Mohon maaf karena lupa berdiskusi dengan HR interview, saya punya keterbatasan di laptop sehingga tidak bisa develop React Native versi iOS-nya.

## About

Project ini dibuat menggunakan [Expo](https://docs.expo.dev/).

### RUN IT LOCALLY

```bash
$ yarn install
$ yarn start
```

Untuk runningnya, silahkan download aplikasi Go-expo pada smartphone.

## Folder Structures

#### components

Berisi semua global reusable components

#### screens

Berisi semua screen dari App

#### services

Berisi function untuk melakukan request ke server

#### themes

Berisi configurasi warna atau tema untuk App.

#### stores

Berisi store yang digunakan pada aplikasi. Store yang saya gunakan adalah [zustand](https://github.com/pmndrs/zustand)


## Enhance Developer Experience (DX)

### Module Resolver

Make import path more readable.

### Typescript

Untuk menambah DX pada project ini, saya menggunakan Typescript sehingga user bisa terbantu dengan typing baik di komponen props maupun di kodingan secara general.

### TDD (Test Driven Development)

Untuk kali ini saya melakukan TDD untuk proses pembuatan utility functions yang ada pada folder `utils/`. Sedangkan untuk melihat file testnya bisa menuju ke folder `utils/__tests__`.
