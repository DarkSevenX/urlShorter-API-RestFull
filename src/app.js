import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import ulrRouter from './routes/urlRoutes.js'


const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api', ulrRouter)

export default app
