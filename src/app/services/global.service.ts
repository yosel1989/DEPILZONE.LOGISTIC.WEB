import {Injectable, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credenciales, Usuario} from "../models/Usuario";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {Sede} from "../models/Sede";

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnDestroy{

  _idSede = new BehaviorSubject<number>(0);

  constructor(
  ) {
  }

  ngOnDestroy(): void {
    this._idSede.complete();
  }

}
