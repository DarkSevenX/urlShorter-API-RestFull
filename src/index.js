
import { swaggerDocs } from './routes/swagger.js';
import app from './app.js';

const port = process.env.PORT || 3000 

app.listen(port,() => {
    swaggerDocs(app,port)
    console.log(`server listening on http://localhost:${port}`)
})
