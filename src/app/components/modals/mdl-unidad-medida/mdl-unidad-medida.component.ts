import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UnidadMedida} from "../../../models/Articulo";

import Swal from 'sweetalert2';
import {AuthService} from "../../../services/auth.service";
import {UnidadMedidaService} from "../../../services/unidad-medida.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'mdl-unidad-medida',
  templateUrl: './mdl-unidad-medida.component.html',
  styleUrls: ['./mdl-unidad-medida.component.scss']
})
export class MdlUnidadMedidaComponent implements OnInit, AfterViewInit, OnDestroy {

  unidadMedida: UnidadMedida | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  // subscription
  sbcForm!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private api: UnidadMedidaService,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    if(this.unidadMedida){
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if(this.sbcForm){this.sbcForm.unsubscribe()}
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      nombre: new FormControl(null, Validators.required),
      nombreCorto: new FormControl(null, Validators.required),
      idEstado: new FormControl(1)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.unidadMedida?.nombre,
      nombreCorto: this.unidadMedida?.nombreCorto,
      idEstado: this.unidadMedida?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(!this.unidadMedida){
      this.sbcForm = this.api.create(this.model).subscribe((res: any) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: "Se registro la nueva unidad de medida con éxito",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          }).then( (result) => {
            if (result.value) {
              this.bsModalRef.hide();
            }
          });
        }
      }, (error: any) => {
        this.loadingSubmit = false;
        console.error(error);
        Swal.fire({
          text: "Ocurrio un error al intentar registrar nueva unidad de medida",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary"
          }
        })
      });
    }else{
      this.sbcForm = this.api.update(this.model).subscribe((res: any) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: "Se actualizó la unidad de medida con éxito",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "btn btn-primary"
            }
          }).then( (result) => {
            if (result.value) {
              this.bsModalRef.hide();
            }
          });
        }
      }, (error: any) => {
        this.loadingSubmit = false;
        console.error(error);
        Swal.fire({
          text: "Ocurrio un error al intentar actualizar la unidad de medida",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "btn btn-primary"
          }
        })
      });
    }
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.unidadMedida ? this.unidadMedida.id : 0,
      nombre: this.f.nombre.value,
      nombreCorto: this.f.nombreCorto.value,
      idUsuarioRegistro: !this.unidadMedida ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.unidadMedida ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }
}
