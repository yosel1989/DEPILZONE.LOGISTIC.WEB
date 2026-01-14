import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {UCiudad, UDepartamento, UDistrito} from "../models/Ubigeo";
import {Observable, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UbigeoService {
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

  department(): Observable<UDepartamento[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/ubigeo/departamento`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : UDepartamento[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new UDepartamento();
            model.id = x.id;
            model.nombre = x.nombre;
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


  cities(idDepartamento: string): Observable<UCiudad[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/ubigeo/departamento/${idDepartamento}/ciudades`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : UCiudad[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new UCiudad();
            model.id = x.id;
            model.nombre = x.nombre;
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

  districts(idDepartamento: string, idCiudad: string): Observable<UDistrito[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/ubigeo/departamento/${idDepartamento}/${idCiudad}/distritos`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : UDistrito[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const model = new UDistrito();
            model.id = x.id;
            model.nombre = x.nombre;
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
