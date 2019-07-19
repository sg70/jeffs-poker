# jeffs-poker

Jeff's Planning Poker

## Preperation

Create the files .prod.env and .dev.env and fill the firebase configuration

``` bash
FIREBASE_APIKEY=<API-KEY>
FIREBASE_DBURL=<URL>
FIREBASE_PROJECT=<PROJECT_ID>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
quasar dev

# build for production with minification
quasar build

# run all tests
quasar test
```

For detailed explanation on how things work, checkout the [guide](https://quasar.dev/start/quasar-cli).

## Deployment

``` bash
# install the Firebase CLI
npm install -g firebase-tools

# sign into Firebase
firebase login

# select Firebase project
firebase use <PROJECT_ID>

# deploy to Firebase
firebase deploy
```

For more details read [Firebase CLI Reference](https://firebase.google.com/docs/cli)
