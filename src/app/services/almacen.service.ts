import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Almacen} from "../models/Almacen";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlmacenService {
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

  create(almacen: Almacen): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/almacen`, almacen,{headers: this.headers}).pipe(
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

  update(almacen: Almacen): Observable<boolean> {
    return this.http.put<any>(`${environment.apiUrl}/api/almacen/${almacen.id}`, almacen,{headers: this.headers}).pipe(
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

  collection(): Observable<Almacen[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/almacen`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Almacen[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new Almacen();
            cat.id = x.id;
            cat.nombre = x.nombre;
            cat.sede = x.sede;
            cat.idSede = x.idSede;
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

  collectionBySede(sede: number): Observable<Almacen[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/almacen/sede/${sede}`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Almacen[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new Almacen();
            cat.id = x.id;
            cat.nombre = x.nombre;
            cat.sede = x.sede;
            cat.idSede = x.idSede;
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
