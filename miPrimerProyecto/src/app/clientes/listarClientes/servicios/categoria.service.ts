import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlEndPoint = 'http://localhost:5000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }
}
