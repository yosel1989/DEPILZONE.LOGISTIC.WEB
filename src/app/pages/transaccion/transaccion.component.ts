import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Transaccion} from "../../models/Transaccion";
import { MdlTransaccionComponent } from 'src/app/components/modals/mdl-transaccion/mdl-transaccion.component';
import { TblTransaccionComponent } from 'src/app/components/tables/tbl-transaccion/tbl-transaccion.component';
import {TransaccionService} from "../../services/transaccion.service";

import Swal from 'sweetalert2';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss']
})
export class TransaccionComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tabla') tabla!: TblTransaccionComponent;
  bsModalRef?: BsModalRef | null;
  selected : Transaccion | null = null;

  constructor(
    private modalService: BsModalService,
    private api: TransaccionService,
    private auth: AuthService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: Transaccion | null)=>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlTransaccionComponent, { id: new Date().getTime(), class: 'modal-fullscreen', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onCancel( transaccion: Transaccion | null = null ): void{
    const t = transaccion ? transaccion : this.selected;
    Swal.fire({
      title: 'Anular Transacción',
      text: `¿Desea anular la ${t?.tipoTransaccion} N° ${t?.id}?`,
      icon: 'question',
      buttonsStyling: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
      }
    }).then( (result) => {
      if (result.value) {
        const item = new Transaccion();
        item.id = t!.id;
        item.idUsuarioModifico = this.auth.getUser()!.id;
        this.api.cancel(item).subscribe((res) => {
          if(res){
            Swal.fire({
              text: `Se anulo la ${t?.tipoTransaccion} N° ${t?.id}`,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
            this.tabla.showCollection();
          }else{
            Swal.fire({
              title: 'Error',
              text: `Ocurrio un error al anular cancelar la ${t?.tipoTransaccion} N° ${t?.id}`,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
          }
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: `Ocurrio un error al intentar anular la ${t?.tipoTransaccion} N° ${t?.id}`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          });
        })
      }
    })
  }

  onConfirm( transaccion: Transaccion | null = null ): void{
    const t = transaccion ? transaccion : this.selected;
    Swal.fire({
      title: 'Confirmar Transacción',
      text: `¿Desea confirmar la Transacción N° ${t?.id}?`,
      icon: 'question',
      buttonsStyling: false,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-light',
      }
    }).then( (result) => {
      if (result.value) {
        const item = new Transaccion();
        item.id = t!.id;
        item.idUsuarioModifico = this.auth.getUser()!.id;
        this.api.confirm(item).subscribe((res) => {
          if(res){
            Swal.fire({
              text: `Se confirmo la Transacción N° ${t?.id}`,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
            this.tabla.showCollection();
          }else{
            Swal.fire({
              title: 'Error',
              text: `Ocurrio un error al intentar confirmar la Transacción N° ${t?.id}`,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'btn btn-primary'
              }
            });
          }
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: `Ocurrio un error al intentar confirmar la Transacción N° ${t?.id}`,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Aceptar',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          });
        })
      }
    })
  }

  onShow( transaccion: Transaccion | null = null ): void{
    const t = transaccion ? transaccion : this.selected;
  }

  onReload(): void{
    this.tabla.showCollection();
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.tabla.dataSource.paginator) {
      this.tabla.dataSource.paginator.firstPage();
    }
  }

}
