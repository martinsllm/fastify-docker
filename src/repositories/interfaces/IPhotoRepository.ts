import type { File } from 'fastify-multer/lib/interfaces'
import type Photo from '../../database/models/Photo'

export interface IPhotoRepository {
  getById(id: number): Promise<Photo | null>

  getByUser(userId: number): Promise<Photo[]>

  create(file: File, id: number): Promise<Photo>

  delete(id: number): Promise<Photo | null>
}
