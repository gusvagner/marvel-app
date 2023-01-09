import { Observable } from "rxjs";

export interface IBaseService {
  get<TClass>(url: string): Observable<TClass>;
}
