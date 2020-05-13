import { Model, Document } from 'mongoose'
import { from } from 'rxjs'
import { map, combineLatest } from 'rxjs/operators'

export const ProjectRepository = <T extends Document>(model: Model<Document, {}>) => ({
  /**
   * Obtener registros paginados
   * @param page Numero de pagina a buscar
   * @param perPage Items por pagina a consultar
   */
  get(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage
    const query = model.find().limit(perPage).skip(skip)

    return from(query.exec()).pipe(
      combineLatest(from(model.estimatedDocumentCount().exec())),
      map(([results, count]) => ({
        data: results as T[],
        perPage,
        page,
        total: count
      }))
    )
  },

  /**
   * Añadir un objecto a la coleccion
   * @param body Objeto a añadir
   */
  add(body: object) {
    const entity = new model() as T
    const bodyKeys = Object.keys(body)

    bodyKeys.forEach(key => entity[key] = body[key])

    return from(entity.save())
  },

  /**
   * Remove an item from the colecction
   * @param id The id of the element to remove
   */
  remove(id: string) {
    const query = model.remove({ _id: id })

    return from(query.exec())
  }
})
