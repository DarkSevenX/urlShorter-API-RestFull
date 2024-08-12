import Router from 'express' 
import { shortUrl, redirectUrlShorted } from '../controller/urlController.js'
import { urlValidator } from '../middleware/validator.js'
const router = Router()

router
    .post('/', urlValidator, shortUrl)
    .get('/:urlCode', redirectUrlShorted)

/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Crea una URL corta
 *     description: Genera una URL corta para una URL original si no existe una URL corta ya registrada. Retorna la URL original y la URL corta generada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: http://www.wikipedia.com
 *     responses:
 *       200:
 *         description: URL corta generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                   example: http://www.wikipedia.com
 *                 urlShorted:
 *                   type: string
 *                   example: http://short.url/api/abc123
 *       400:
 *         description: URL inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: invalid url
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message
 */

export default router
