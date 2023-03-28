# PoC Lambda Node 18 to Parquet to S3

## Local

```bash
npm install

npm install -g lambda-local
```

```bash
lambda-local -l index.js -h handler -e mock/event.json --envfile .env 
```

## Production

#### Generate the zip and upload manualy in AWS

```bash
zip -r function.zip index.js node_modules         
```
