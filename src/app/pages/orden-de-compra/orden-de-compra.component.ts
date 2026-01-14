import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {OrdenCompra} from "../../models/OrdenCompra";
import {TblOrdenCompraComponent} from "../../components/tables/tbl-orden-compra/tbl-orden-compra.component";
import {MdlOrdenCompraComponent} from "../../components/modals/mdl-orden-compra/mdl-orden-compra.component";
import {Transaccion} from "../../models/Transaccion";
import Swal from "sweetalert2";
import {OrdenCompraService} from "../../services/orden-compra.service";

@Component({
  selector: 'app-orden-de-compra',
  templateUrl: './orden-de-compra.component.html',
  styleUrls: ['./orden-de-compra.component.scss']
})

export class OrdenDeCompraComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tabla') tabla!: TblOrdenCompraComponent;
  bsModalRef?: BsModalRef | null;
  selected : OrdenCompra | null = null;

  constructor(
    private modalService: BsModalService,
    private api: OrdenCompraService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: OrdenCompra | null)=>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlOrdenCompraComponent, { id: new Date().getTime(), class: 'modal-fullscreen', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }
  onShow(item: OrdenCompra | null = null): void{
    const t = item ? item : this.selected;
    this.api.find(item!.id).subscribe((res: OrdenCompra) => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }
  onConfirm(item: OrdenCompra | null = null): void{
    const t = item ? item : this.selected;
    Swal.fire({
      title: 'Confirmar Orden de Compra',
      text: `¿Desea confirmar la Orden de Compra N° ${t?.id}?`,
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
        Swal.fire({
          text: `Se confirmo la Orden de Compra N° ${t?.id}`,
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        }).then( (result) => {
          if (result.value) {
          }
        });
      }
    })
  }
  onCancel(item: OrdenCompra | null = null): void{
    const t = item ? item : this.selected;
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
