const fs = require('fs');
const AWS = require('aws-sdk');
const Parquet = require('parquetjs');

exports.handler = async (event, context) => {
   try {
      // Obtener los datos del formulario HTML desde el evento
      const formData = event.body;

      // Obtener formId
      const formId = event.formId;

      // Recorrer los campos del formulario HTML y agregarlos al objeto schemaFields
      const schemaFields = {};
      for (const fieldName in formData) {
         if (formData.hasOwnProperty(fieldName)) {
            schemaFields[fieldName] = { type: 'UTF8' };
         }
      }

      // Crear el esquema de Parquet utilizando el objeto schemaFields
      const schema = new Parquet.ParquetSchema(schemaFields);
      const writer = await Parquet.ParquetWriter.openFile(schema, `parquets/${formId}.parquet`);
      await writer.appendRow(formData);
      await writer.close();

      // Guardar el archivo Parquet en el bucket S3 utilizando aws-sdk
      const s3 = new AWS.S3({
         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
       });
      const params = {
         Bucket: 'poc-parquet-teco',
         Key: `parquets/${formId}.parquet`,
         Body: fs.createReadStream(`parquets/${formId}.parquet`),
      };

      await s3.upload(params).promise();

      return {
         statusCode: 200,
      };
   } catch (error) {
      return {
         statusCode: 500,
         error: error.message
      };
   }
};
