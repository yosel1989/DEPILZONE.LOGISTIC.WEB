import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticuloCategoria} from '../../../models/Articulo';

import Swal from 'sweetalert2';
import {ArticuloCategoriaService} from '../../../services/articulo-categoria.service';
import {AuthService} from '../../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'mdl-articulo-categoria',
  templateUrl: './mdl-articulo-categoria.component.html',
  styleUrls: ['./mdl-articulo-categoria.component.scss']
})
export class MdlArticuloCategoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  articuloCategoria: ArticuloCategoria | null = null;
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
    private articuloService: ArticuloCategoriaService,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    if(this.articuloCategoria){
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
      descripcion: new FormControl(null),
      idEstado: new FormControl(1)
    });
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.articuloCategoria?.nombre,
      descripcion: this.articuloCategoria?.descripcion,
      idEstado: this.articuloCategoria?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;
    this.loadingSubmit = true;

    if(this.formGroup.invalid){
      this.loadingSubmit = false;
      return;
    }

    if(!this.articuloCategoria){
      this.sbcForm = this.articuloService.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: 'Se registro la nueva categoria con éxito',
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
          text: 'Ocurrio un error al intentar registrar nueva categoria',
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
            text: 'Se actualizó la categoria con éxito',
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
          text: 'Ocurrio un error al intentar actualizar categoria',
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
      id: this.articuloCategoria ? this.articuloCategoria.id : 0,
      nombre: this.f.nombre.value,
      descripcion: this.f.descripcion.value,
      idUsuarioRegistro: !this.articuloCategoria ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.articuloCategoria ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }
}
