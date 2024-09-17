import fs, { type PathLike } from 'fs'

export const createDirectory = (filePath: PathLike) => {
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true })
}

export const deleteFile = (file: PathLike) => {
  if (fs.existsSync(file)) {
    fs.unlink(file, err => {
      if (err) throw err
    })
  }
}
