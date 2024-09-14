import type { File } from 'fastify-multer/lib/interfaces'
import type { IPhotoRepository } from '../repositories/interfaces/IPhotoRepository'
import PhotoRepository from '../repositories/PhotoRepository'

class PhotoController {
  private readonly photoRepository: IPhotoRepository

  constructor() {
    this.photoRepository = new PhotoRepository()
  }

  async create(file: File, id: number) {
    const uploadedPhoto = await this.photoRepository.create(file, id)
    return uploadedPhoto
  }
}

export default PhotoController
