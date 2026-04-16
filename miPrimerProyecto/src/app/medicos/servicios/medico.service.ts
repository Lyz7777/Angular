import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from '../medico';
import { Franja } from '../franja';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private urlEndPoint = 'http://localhost:5000/api/medicos';

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.urlEndPoint);
  }

  getMedico(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.urlEndPoint}/${id}`);
  }

  create(medico: Pick<Medico, 'nombre' | 'apellido' | 'email'>): Observable<Medico> {
    return this.http.post<Medico>(this.urlEndPoint, medico);
  }

  update(medico: Pick<Medico, 'id' | 'nombre' | 'apellido' | 'email'>): Observable<Medico> {
    return this.http.put<Medico>(`${this.urlEndPoint}/${medico.id}`, medico);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.urlEndPoint}/${id}`);
  }

  getFranjasByFecha(idMedico: number, fecha: string): Observable<Franja[]> {
    return this.http.get<Franja[]>(`${this.urlEndPoint}/${idMedico}/franjas`, {
      params: { fecha }
    });
  }

  crearFranja(idMedico: number, franja: Franja): Observable<Franja> {
    return this.http.post<Franja>(`${this.urlEndPoint}/${idMedico}/franjas`, franja);
  }
}
