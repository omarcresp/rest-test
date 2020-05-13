import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { userFacade } from '../facades/userFacade';
import { IService } from '../core/interfaces/service.interface';

export const userService: IService = {
  getUsers(req, res) {
    const page = typeof req.query.page === 'string' ? +req.query.page : 1;

    userFacade.get(page).pipe(
      tap(data => res.json(data)),
      catchError(err => {
        res.status(400).send(err)

        return of(null)
      })
    ).subscribe()
  },

  addUser(req, res) {
    userFacade.add(req.body)
      .subscribe(data => res.json({msg: 'success', data}))
  },

  removeUser(req, res) {
    userFacade.remove(req.params.id)
      .subscribe(data => res.json({msg: 'success', data}))
  }
}
