import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Transaccion} from "../models/Transaccion";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransaccionService {
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

  create(tipo: Transaccion): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/transaccion`, tipo,{headers: this.headers}).pipe(
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

  confirm(item: Transaccion): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/transaccion/${item.id}/confirmar`, item,{headers: this.headers}).pipe(
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

  cancel(item: Transaccion): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/transaccion/${item.id}/cancelar`, item,{headers: this.headers}).pipe(
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

  find(idTransaccion: number): Observable<Transaccion> {
    return this.http.get<any>(`${environment.apiUrl}/api/transaccion/${idTransaccion}`,{headers: this.headers}).pipe(
      map(({ data, message, status}) => {

        if(status === 200){

          const model = new Transaccion();
          model.id = data.id;
          model.idTipoTransaccion = data.idTipoTransaccion;
          model.tipoTransaccion = data.tipoTransaccion;
          model.idSedeOrigen = data.idSedeOrigen;
          model.sedeOrigen = data.sedeOrigen;
          model.idSedeDestino = data.idSedeDestino;
          model.sedeDestino = data.sedeDestino;
          model.fechaRegistro = new Date(data.fechaRegistro);
          model.fechaModifico = data.fechaModifico ? new Date(data.fechaModifico) : null;
          model.idEstado = data.idEstado;
          model.estado = data.estado;
          model.usuarioRegistro = data.usuarioRegistro;
          model.usuarioModifico = data.usuarioModifico;

          return model;
        }

        throw throwError(message);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  collection(): Observable<Transaccion[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/transaccion`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Transaccion[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new Transaccion();
            cat.id = x.id;
            cat.idTipoTransaccion = x.idTipoTransaccion;
            cat.tipoTransaccion = x.tipoTransaccion;
            cat.idSedeOrigen = x.idSedeOrigen;
            cat.sedeOrigen = x.sedeOrigen;
            cat.idSedeDestino = x.idSedeDestino;
            cat.sedeDestino = x.sedeDestino;
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
