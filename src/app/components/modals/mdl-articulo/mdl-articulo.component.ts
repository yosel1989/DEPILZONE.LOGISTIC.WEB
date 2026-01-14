import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Articulo, ArticuloCategoria, UnidadMedida} from "../../../models/Articulo";
import {ArticuloService} from "../../../services/articulo.service";

import Swal from 'sweetalert2';
import {ArticuloCategoriaService} from "../../../services/articulo-categoria.service";
import {UnidadMedidaService} from "../../../services/unidad-medida.service";
import {AuthService} from "../../../services/auth.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'mdl-articulo',
  templateUrl: './mdl-articulo.component.html',
  styleUrls: ['./mdl-articulo.component.scss']
})
export class MdlArticuloComponent implements OnInit, AfterViewInit, OnDestroy {

  articulo: Articulo | null = null;
  formGroup!: FormGroup
  submitted = false;
  loadingSubmit = false;

  created = false;
  updated = false;

  loadingCat = false;
  collectionCat : ArticuloCategoria[] = [];

  loadingUM = false;
  collectionUM : UnidadMedida[] = [];

  // subscriptions
  sbcForm!: Subscription;

  constructor(
    public bsModalRef: BsModalRef,
    private frmBuilder: FormBuilder,
    private articuloService: ArticuloService,
    private artCategoriaService: ArticuloCategoriaService,
    private unidadMedidaService: UnidadMedidaService,
    private authService: AuthService
  ) {
      this.initForm();
  }

  ngOnInit(): void {
    console.log(this.articulo);
    this.loadCategories();
    this.loadUnits();
    if(this.articulo){
      this.patchForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  initForm(): void{
    this.formGroup = this.frmBuilder.group({
      nombre: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
      codigo: new FormControl(null),
      idUnidadMedida: new FormControl(null, Validators.required),
      idCategoria: new FormControl(null, Validators.required),
      // stock: new FormControl(0, Validators.required),
      idEstado: new FormControl(1, Validators.required)
    })
  }

  patchForm(): void{
    this.formGroup.patchValue({
      nombre: this.articulo?.nombre,
      descripcion: this.articulo?.descripcion,
      codigo: this.articulo?.codigo,
      idUnidadMedida: this.articulo?.idUnidadMedida,
      idCategoria: this.articulo?.idCategoria,
      // stock: this.articulo?.stock,
      idEstado: this.articulo?.idEstado
    });
  }

  onSubmit(): void{
    this.submitted = true;

    if(this.formGroup.invalid){
      return;
    }

    this.loadingSubmit = true;
    if(!this.articulo){
      this.sbcForm = this.articuloService.create(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.created = true;
          Swal.fire({
            text: "Se registro el artículo con exito",
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
    }else{
      this.sbcForm = this.articuloService.update(this.model).subscribe((res: boolean) => {
        if(res){
          this.loadingSubmit = false;
          this.updated = true;
          Swal.fire({
            text: "Se actualizó el artículo con exito",
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
      }, (err: any) => {
        this.loadingSubmit = false;
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

  }

  // getters
  get f(): any{
    return this.formGroup.controls;
  }
  get model(): any{
    return {
      id: this.articulo ? this.articulo.id : 0,
      nombre: this.f.nombre.value,
      descripcion: this.f.descripcion.value,
      codigo: this.f.codigo.value,
      idUnidadMedida: this.f.idUnidadMedida.value ? parseInt(this.f.idUnidadMedida.value) : null,
      idCategoria: this.f.idCategoria.value ? parseInt(this.f.idCategoria.value) : null,
      // stock: this.f.stock.value,
      idUsuarioRegistro: !this.articulo ? this.authService.getUser()?.id : 0,
      idUsuarioModifico: this.articulo ? this.authService.getUser()?.id : 0,
      idEstado: parseInt(this.f.idEstado.value)
    }
  }

  // data
  loadCategories(): void{
    this.loadingCat = true;
    this.artCategoriaService.collection().subscribe((res: ArticuloCategoria[]) => {
      this.collectionCat = res;
      this.loadingCat = false;
    }, (error: any) => {
      console.log(error);
      this.loadingCat = false;
    });
  }
  loadUnits(): void{
    this.loadingCat = true;
    this.unidadMedidaService.collection().subscribe((res: UnidadMedida[]) => {
      this.collectionUM = res;
      this.loadingCat = false;
    }, (error: any) => {
      console.log(error);
      this.loadingCat = false;
    });
  }

}
