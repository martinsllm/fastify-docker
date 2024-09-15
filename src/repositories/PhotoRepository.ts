import type { File } from 'fastify-multer/lib/interfaces'
import Photo from '../database/models/Photo'
import type { IPhotoRepository } from './interfaces/IPhotoRepository'

class PhotoRepository implements IPhotoRepository {
  async getById(id: number): Promise<Photo | null> {
    const photo = await Photo.findByPk(id)
    return photo
  }

  async getByUser(userId: number): Promise<Photo[]> {
    const photos = await Photo.findAll({
      where: {
        userId,
      },
    })

    return photos
  }

  async create(file: File, id: number): Promise<Photo> {
    const { filename, path: url } = file

    const uploadedPhoto = await Photo.create({
      filename,
      url,
      userId: id,
    })

    return uploadedPhoto
  }

  async delete(id: number): Promise<Photo | null> {
    const foundPhoto = await this.getById(id)

    if (foundPhoto != null) {
      await Photo.destroy({
        where: {
          id,
        },
      })
    }

    return foundPhoto
  }
}

export default PhotoRepository
