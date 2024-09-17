import fs, { type PathLike } from 'fs'
import path from 'path'
import { decode } from 'jsonwebtoken'
import UserController from '../controllers/UserController'

const userController = new UserController()

export const verifyDirectoryPath = async (token: string) => {
  const decodedToken = decode(token)

  let dir = ''
  const basePath = './tmp/uploads'

  if (decodedToken) {
    const user = await userController.getById(decodedToken.id)
    dir = path.resolve(basePath, user?.name.split(' ').join('_'))
    createPath(dir)
  }

  return dir
}

export const createPath = (filePath: PathLike) => {
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true })
}

export const deleteFile = (file: PathLike) => {
  if (fs.existsSync(file)) {
    fs.unlink(file, err => {
      if (err) throw err
    })
  }
}
