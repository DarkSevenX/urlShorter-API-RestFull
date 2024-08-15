import prisma from "../db.js";
import shortid from "shortid";

const domain = process.env.DOMAIN

export const shortUrl = async (req,res) => {
  try {
    const { url } = req.body

    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi; 
    const regex = new RegExp(urlRegex)

    if (!url.match(regex)) {
        console.log('invalid url');
        return res.status(400).json({error: 'invalid url'})
    }

    const existingUrl = await prisma.url.findUnique({
      where: {
        originalUrl: url
      }
    })

    if (existingUrl) {
      return res.json({
        originalUrl: existingUrl.originalUrl,
        urlShorted: `${domain}/${existingUrl.urlCode}`
      })
    }

    const urlCodeGenerated = shortid.generate() 
    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        urlCode: urlCodeGenerated
      }
    }) 

    res.json({
      originalUrl: newUrl.originalUrl,
      urlShorted: `${domain}/${newUrl.urlCode}`
    })

  } catch (error) {
    res.status(500).json(error.message)
  }
}


export const redirectUrlShorted = async (req,res) => {
  const { urlCode } = req.params
    
  try {
    const url = await prisma.url.findUnique({
      where: { urlCode: urlCode }
    })

    if (!url) {
      return res.status(404).json({error: 'url not found'})
    }

    res.redirect(url.originalUrl)
    
  } catch (error) {
    res.status(500).json(error.message)
    console.log(error)

  }
}
