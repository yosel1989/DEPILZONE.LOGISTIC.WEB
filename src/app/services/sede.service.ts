import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Sede} from "../models/Sede";
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SedeService {
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

  collection(): Observable<Sede[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/sede`, {headers: this.headers}).pipe(
      map((response:any) => {
        const collection : Sede[] = [];
        if(response.status === 200){
          response.data.forEach((x: any) => {
            const cat = new Sede();
            cat.id = x.id;
            cat.nombre = x.nombre;
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
