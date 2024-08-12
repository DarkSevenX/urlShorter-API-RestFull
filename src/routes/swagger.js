import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const options ={
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nd short API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/urlRoutes.js']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) =>{
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export { swaggerDocs }
    
