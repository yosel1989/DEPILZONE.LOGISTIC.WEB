import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Almacen} from '../../../models/Almacen';

import Swal from 'sweetalert2';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import {AlmacenService} from "../../../services/almacen.service";
import {Sede} from "../../../models/Sede";
import {SedeService} from "../../../services/sede.service";



@Component({
  selector: 'mdl-almacen',
  templateUrl: './mdl-almacen.component.html',
  styleUrls: ['./mdl-almacen.component.scss']
})
export class MdlAlmacenComponent implements OnInit, AfterViewInit, OnDestroy {

  almacen: Almacen | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  sedes: Sede[] = [];

  // subscription
  sbcForm: Subscription | null;
  sbcSedes: Subscription | null;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private almacenService: AlmacenService,
    private sedeService: SedeService,
    private authService: AuthService
  ) {
      this.initForm();
      this.sbcForm = null;
      this.sbcSedes = null;
  }

  ngOnInit(): void {
    this.sedeCollection();
    if(this.almacen){
      this.patchForm()
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
      idSede: new FormControl('', Validators.required),
      idEstado: new FormControl(1)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.almacen?.nombre,
      idSede: this.almacen?.idSede,
      idEstado: this.almacen?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(!this.almacen){
      this.sbcForm = this.almacenService.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: 'Se registro el nuevo almacen con éxito',
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
          text: 'Ocurrio un error al intentar registrar nuevo almacen',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        })
      });
    }else{
      this.sbcForm = this.almacenService.update(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: 'Se actualizó el almacen con éxito',
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
          text: 'Ocurrio un error al intentar actualizar el almacen',
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
      id: this.almacen ? this.almacen.id : 0,
      nombre: this.f.nombre.value,
      idSede: parseInt(this.f.idSede.value),
      idUsuarioRegistro: !this.almacen ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.almacen ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }

  // get data
  sedeCollection(): void{
    this.sbcSedes = this.sedeService.collection().subscribe((res: Sede[]) => {
      this.sedes = res;
    }, (err: any) => {
      console.log(err);
    })
  }
}
