
import { body, validationResult } from "express-validator"

export const result = (req,res,next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  next()
}

export const urlValidator = [
  body('url')
    .isString().withMessage('url must be string')
    .notEmpty().withMessage('url should not be empty')
    .exists().withMessage('url is required'),
  (req,res,next) => {
    result(req,res,next)
  }
]
