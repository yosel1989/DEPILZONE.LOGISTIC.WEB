
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Articulo} from "../models/Articulo";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ArticuloProveedorService {
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

  create(articulo: Articulo): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/api/articuloProveedor`, articulo,{headers: this.headers}).pipe(
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

}
