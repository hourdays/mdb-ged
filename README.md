# mdb-ged

## Setup
```
npm install
```

## Create Atlas connection config
```
echo "module.exports = {db: 'mongodb+srv://<username>:<password>@<fqdn>/<dbname>?retryWrites=true&w=majority'}" > server/db/atlas.js
```

## Run Express middletier API
```
cd server
nodemon server.js
```

## Run Vue frontend
```
npm run serve
```