import {AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormGroup} from "@angular/forms";

import {Subscription} from 'rxjs';
import {MatSort} from "@angular/material/sort";
import {Proveedor} from "../../../models/Proveedor";
import {ProveedorService} from "../../../services/proveedor.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {UtilitiesService} from "../../../services/utilities.service";
import {Articulo, ArticuloStock} from 'src/app/models/Articulo';
import {MdlBuscarProveedorComponent} from "../mdl-buscar-proveedor/mdl-buscar-proveedor.component";
import Swal from "sweetalert2";
import {ArticuloProveedorService} from "../../../services/articulo-proveedor.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'mdl-articulo-proveedores',
  templateUrl: './mdl-articulo-proveedores.component.html',
  styleUrls: ['./mdl-articulo-proveedores.component.scss'],
  animations: [
    trigger('slideFromBottom', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms {{delay}}ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }, ))
      ], { params: { delay: 10 } })
    ])
  ]
})


export class MdlArticuloProveedoresComponent implements OnInit, AfterViewInit, OnDestroy {

  articulo!: Articulo;

  formGroup!: FormGroup
  submitted = false;

  created = false;
  updated = false;

  // subscriptions
  sbcForm!: Subscription;
  loadingSubmit = false;

  proveedores: Proveedor[] = [];
  sbcProveedores: Subscription | null = null;
  loadingProveedores = false;

  displayedColumns: string[];
  dataSource : MatTableDataSource<Proveedor>;

  @ViewChild(MatSort) sort!: MatSort;

  bsModalBuscarProveedor!: BsModalRef | null;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor(
    public bsModalRef: BsModalRef,
    private proveedorService: ProveedorService,
    private api: ArticuloProveedorService,
    public util: UtilitiesService,
    private modalService: BsModalService,
    private authService: AuthService
  ) {
    this.displayedColumns = [
      'id',
      'ruc',
      'razonSocial',
      'contactoNombre',
      'contactoApellido',
      'contactoTelefono',
      'contactoCorreo',
      'ciudad',
      'distrito',
      'direccion',
      'estado',
      // 'fechaRegistro',
      // 'fechaModifico',
      'actions'
    ];
    this.dataSource = new MatTableDataSource<Proveedor>([]);
  }

  ngOnInit(): void {
    this.showCollection();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  initForm(): void{
  }

  onSubmit(): void{
    this.submitted = true;

    if(!this.dataSource.data.length){
      this.Toast.fire({
        icon: 'error',
        title: 'Falta añadir proveedores'
      });
      this.loadingSubmit = false;
      return;
    }

    Swal.fire({
      text: 'Desea guardar la relación de proveedores?',
      icon: 'question',
      reverseButtons: true,
      buttonsStyling: false,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light'
      }
    }).then( (result) => {
      if (result.value) {
        this.loadingSubmit = true;

        this.sbcForm = this.api.create(this.model).subscribe((res: boolean) => {
          if(res){
            this.loadingSubmit = false;
            this.created = true;
            Swal.fire({
              text: 'Se registro la relación de proveedores con éxito',
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
            text: 'Ocurrio un error al intentar registrar la relación de proveedores',
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          })
        });

      }
    });

  }

  // getters
  get model(): any{
    return {
      id: this.articulo.id,
      idUsuarioRegistro: this.authService.getUser()?.id ,
      proveedores : this.dataSource.data.map(x => {
        const proveedor = new Proveedor();
        proveedor.id = x.id;
        return proveedor;
      })
    }
  }

  // data
  showCollection(): void{
    this.loadingProveedores = true;
    this.sbcProveedores = this.proveedorService.collectionByArticle(this.articulo.id).subscribe((res: Proveedor[]) => {
      this.dataSource.data = res;
      this.loadingProveedores = false;
    }, (error: any) => {
      console.log(error);
      this.loadingProveedores = false;
    })
  }

  // events
  onSearchProvider(): void{
    const initialState = {_collectionSelected: this.dataSource.data};
    this.bsModalBuscarProveedor = this.modalService.show(MdlBuscarProveedorComponent, { id: new Date().getTime(), class: 'mw-850px modal-dialog-centered modal-dialog-scrollable', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true, initialState});
    this.bsModalBuscarProveedor.content._selected.subscribe((res: Proveedor[]) => {
      this.dataSource.data = res.concat(...this.dataSource.data);
    });
  }
  onRemove(idProveedor: number): void{
    this.dataSource.data = this.dataSource.data.filter( x => x.id !== idProveedor);
  }

}
