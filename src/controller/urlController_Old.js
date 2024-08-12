import db from "../db.js";
import shortid from "shortid";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the director

const createUrl = (req,res) => {
    const { url } = req.body

    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi; 
    const regex = new RegExp(urlRegex)

    if (!url.match(regex)) {
        console.log('invalid url');
        return res.status(400).json({error: 'invalid url'})
    }

    try {
        const existingUrl = db.prepare('select * from urls where originalUrl = ?').get(url)

        if (existingUrl) {
            return res.json({
                original_url: existingUrl.originalUrl,
                urlShorted: existingUrl.shortUrl 
            })
        } 
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal Server Error' });     
    }

    try {
        const shortUrl = shortid.generate()
        const insertUrl = db.prepare('insert into urls(originalUrl,shortUrl) values (?,?)').run(url,shortUrl)

        const newUrl = db.prepare('select * from urls where originalUrl = ?').get(url)
        return res.json({
            original_url:newUrl.originalUrl,
            urlShorted:newUrl.shortUrl
        }) 
    } catch (error) {
        console.error('Database error:' + error.message)
        return res.status(500).json({error: 'Internal server error'})
    }
}

const redirectUrlShorted = (req,res) => {
    const { urlCode } = req.params
    
    try {
    
        const urlSelect = db.prepare('select * from urls where shortUrl = ?').get(urlCode)

        if (!urlSelect) {
            const htmlFilePath = path.join(__dirname,'../public/notFound.html')
            return res.status(404).sendFile(htmlFilePath)
        }

        res.redirect(urlSelect.originalUrl)

    } catch (error) {
        console.log('internal server error', error)
        res.status(500).json({error: 'internal server error'})
    }
}

export {
    createUrl,
    redirectUrlShorted
}
