import {PriorityDAO} from "../interface/PriorityDAO";
import {Observable} from "rxjs";
import {Priority} from "../../model/priority";

export class PriorityDAOArray implements PriorityDAO {
  add(priority: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(priority: Priority): Observable<Priority> {
    return undefined;
  }

}
