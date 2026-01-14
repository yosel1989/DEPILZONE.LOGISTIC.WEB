import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {TransaccionTipo} from "../models/Transaccion";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransaccionTipoService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
  }

  create(tipo: TransaccionTipo): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/transaccionTipo`, tipo,{headers: this.headers}).pipe(
      map((response: any) => {

        if(response.status === 200){
          return true;
        }

        throw throwError(response.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  update(tipo: TransaccionTipo): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/transaccionTipo/${tipo.id}`, tipo,{headers: this.headers}).pipe(
      map((response:any) => {

        if(response.status === 200){
          return true;
        }

        throw throwError(response.message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  collection(): Observable<TransaccionTipo[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/transaccionTipo`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : TransaccionTipo[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new TransaccionTipo();
            cat.id = x.id;
            cat.nombre = x.nombre;
            cat.nombreCorto = x.nombreCorto;
            cat.descripcion = x.descripcion;
            cat.fechaRegistro = new Date(x.fechaRegistro);
            cat.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            cat.idEstado = x.idEstado;
            cat.estado = x.estado;
            cat.usuarioRegistro = x.usuarioRegistro;
            cat.usuarioModifico = x.usuarioModifico;
            collection.push(cat);
          });
        }
        return collection;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

}
