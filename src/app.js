import express from 'express'
import morgan from 'morgan';
import { swaggerDocs } from './routes/swagger.js';
import cors from 'cors'
import ulrRouter from './routes/urlRoutes.js'
import '../cron.js'

const app = express()
const port = process.env.PORT || 3000 

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

swaggerDocs(app,port)
app.use('/', ulrRouter)

export default app
