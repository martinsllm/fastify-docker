import multer from 'fastify-multer'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'
import { decode } from 'jsonwebtoken'
import UserController from '../controllers/UserController'

const userController = new UserController()

export default {
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const token = req.headers.authorization
      const decodedToken = decode(token)

      const user = await userController.getById(decodedToken.id)

      const basePath = './tmp/uploads'
      const dir = path.resolve(basePath, user?.name.split(' ').join('_'))

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

      cb(null, dir)
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(6).toString('hex')
      cb(null, `${hash}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimes = ['image/jpeg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type!'))
    }
  },
}
