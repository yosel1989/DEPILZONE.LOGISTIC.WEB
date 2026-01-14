import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {AlmacenUbicacion} from "../models/Almacen";

@Injectable({ providedIn: 'root' })
export class AlmacenUbicacionService {
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

  create(ubicacion: AlmacenUbicacion): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/almacenUbicacion`, ubicacion,{headers: this.headers}).pipe(
      map(({message, status}) => {

        if(status === 200){
          return true;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  update(ubicacion: AlmacenUbicacion): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/almacenUbicacion/${ubicacion.id}`, ubicacion,{headers: this.headers}).pipe(
      map(({message, status}) => {

        if(status === 200){
          return true;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  collection(): Observable<AlmacenUbicacion[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/almacenUbicacion`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : AlmacenUbicacion[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new AlmacenUbicacion();
            model.id = x.id;
            model.nombre = x.nombre;
            model.idSede = x.idSede;
            model.sede = x.sede;
            model.idAlmacen = x.idAlmacen;
            model.almacen = x.almacen;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  collectionByAlmacen(idAlmacen: string): Observable<AlmacenUbicacion[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/almacenUbicacion/almacen/${idAlmacen}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : AlmacenUbicacion[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new AlmacenUbicacion();
            model.id = x.id;
            model.nombre = x.nombre;
            model.idSede = x.idSede;
            model.sede = x.sede;
            model.idAlmacen = x.idAlmacen;
            model.almacen = x.almacen;
            model.idUsuarioRegistro = x.idUsuarioRegistro;
            model.idUsuarioModifico = x.idUsuarioModifico;
            model.fechaRegistro = new Date(x.fechaRegistro);
            model.fechaModifico = x.fechaModifico ? new Date(x.fechaModifico) : null;
            model.idEstado = x.idEstado;
            model.estado = x.estado;
            model.usuarioRegistro = x.usuarioRegistro;
            model.usuarioModifico = x.usuarioModifico;
            collection.push(model);
          });
        }
        return collection;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

}
