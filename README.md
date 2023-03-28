# PoC Lambda Node 18 to Parquet to S3

## Local

### 1. Instalar dependencias

```bash
npm install

npm install -g lambda-local
```

### 2. Crear .env en base al template y setear las credenciales de AWS para el S3

### 3. Probar localmente tomando el mock y las variables de entorno

```bash
lambda-local -l index.js -h handler -e mock/event.json --envfile .env 
```

## VSC parquet-viewer
<https://marketplace.visualstudio.com/items?itemName=dvirtz.parquet-viewer>

## Production

#### Generate the zip and upload manualy in AWS

```bash
zip -r function.zip index.js node_modules         
```
