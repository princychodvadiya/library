const express = require("express")
const connectDB = require("./db/mongodb")
const routes = require('./routes/api/v1/index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');


const app = express()
app.use(express.json());

const _dirname = path.resolve();

const __swaggerDistPath = path.join(_dirname, 'node_modules', 'swagger-ui-dist'); //install swagger-ui-dist

const swaggerDocument = YAML.load(path.resolve('./public', 'api.yaml'));

app.use(
    '/api/docs',
    express.static(__swaggerDistPath, { index: false }), // Serve Swagger UI assets
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            url: '/public/api.yaml' // Path to your YAML file
        }
    })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


connectDB()




app.use('/api/v1', routes);
app.listen(9900,() => {
    console.log("Server is running on port 9900")
})