import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransaccionTipo} from '../../../models/Transaccion';

import Swal from 'sweetalert2';
import {TransaccionTipoService} from '../../../services/transaccion-tipo.service';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'mdl-transaccion-tipo',
  templateUrl: './mdl-transaccion-tipo.component.html',
  styleUrls: ['./mdl-transaccion-tipo.component.scss']
})
export class MdlTransaccionTipoComponent implements OnInit, AfterViewInit, OnDestroy {

  transaccionTipo: TransaccionTipo | null = null;
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
    private articuloService: TransaccionTipoService,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    if(this.transaccionTipo){
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
      descripcion: new FormControl(null),
      idEstado: new FormControl(1)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.transaccionTipo?.nombre,
      nombreCorto: this.transaccionTipo?.nombreCorto,
      descripcion: this.transaccionTipo?.descripcion,
      idEstado: this.transaccionTipo?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(!this.transaccionTipo){
      this.sbcForm = this.articuloService.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: 'Se registro el nueva tipo de transacción con éxito',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary'
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
          text: 'Ocurrio un error al intentar registrar nuevo tipo de transacción',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
      });
    }else{
      this.sbcForm = this.articuloService.update(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: 'Se actualizó el tipo de transacción con éxito',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary'
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
          text: 'Ocurrio un error al intentar actualizar tipo de transacción',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      });
    }
  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.transaccionTipo ? this.transaccionTipo.id : 0,
      nombre: this.f.nombre.value,
      nombreCorto: this.f.nombreCorto.value,
      descripcion: this.f.descripcion.value,
      idUsuarioRegistro: !this.transaccionTipo ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.transaccionTipo ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }
}
