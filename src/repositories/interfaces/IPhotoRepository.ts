import type { File } from 'fastify-multer/lib/interfaces'
import type Photo from '../../database/models/Photo'

export interface IPhotoRepository {
  getByUser(userId: number): Promise<Photo[]>

  create(file: File, id: number): Promise<Photo>
}
