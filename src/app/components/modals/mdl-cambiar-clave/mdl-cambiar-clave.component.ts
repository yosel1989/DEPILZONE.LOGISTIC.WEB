import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import Swal from 'sweetalert2';
import {AuthService} from "../../../services/auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'mdl-cambiar-clave',
  templateUrl: './mdl-cambiar-clave.component.html',
  styleUrls: ['./mdl-cambiar-clave.component.scss']
})


export class MdlCambiarClaveComponent implements OnInit, AfterViewInit, OnDestroy {

  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;
  showPassword = false;
  showOldPassword = false;

  // subscriptions
  sbcForm!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required)
    },{

      validator: this.ConfirmedValidator('newPassword', 'repeatPassword')

    });
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      console.log(this.formGroup);
      return;
    }

    this.loadingSubmit = true;
    this.sbcForm = this.authService.changePassword(this.authService.getUser()!.id, this.f.oldPassword.value, this.f.newPassword.value).subscribe((res: boolean) => {
      if(res){
        this.loadingSubmit = false;
        Swal.fire({
          text: "Se cambio la contraseña con exito",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary"
          }
        }).then( (result) => {
          if (result.value) {
            this.bsModalRef.hide();
            this.authService.logout();
          }
        });
      }
    }, (err: any) => {
      this.loadingSubmit = false;
      // console.error(err.error.message);
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
    return this.formGroup.controls;
  }

  // events
  changePassword(): void{
    this.showPassword = !this.showPassword;
  }
  changeOldPassword(): void{
    this.showOldPassword = !this.showOldPassword;
  }

  // validator
  ConfirmedValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {

        return;

      }

      if (control.value !== matchingControl.value) {

        matchingControl.setErrors({ confirmedValidator: true });

      } else {

        matchingControl.setErrors(null);

      }

    }

  }

}
