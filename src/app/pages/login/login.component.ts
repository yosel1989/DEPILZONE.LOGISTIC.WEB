import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Credenciales, Usuario} from "../../models/Usuario";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';

import Swal from 'sweetalert2';
import {environment} from "../../../environments/environment";
import {Sede} from "../../models/Sede";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;
  frmGroup!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private frmBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void{
    this.frmGroup = this.frmBuilder.group({
      usuario: new FormControl(null, Validators.required),
      clave: new FormControl(null, Validators.required)
    })
  }

  toggleShow(event: MouseEvent): void{
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.frmGroup.invalid){
      return;
    }

    this.loading = true;
    const _u = new Credenciales();
    _u.usuario = this.f.usuario.value;
    _u.clave =  this.f.clave.value;
    _u.clave =  this.f.clave.value;
    this.authService.login(_u).subscribe( (res: Usuario)=>{

      const sede = new Sede();
      sede.id = res.idSede;
      sede.nombre = res.sede;

      this.authService.setUser(res);
      this.authService.setSede(sede);

      this.router.navigate(['/']);

    }, err => {
      this.loading = false;
      Swal.fire({
        title: 'Error',
        text: err.error.message,
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Aceptar',
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      });
    });

  }

  // getters
  get f(): any{
    return this.frmGroup.controls;
  }

}
