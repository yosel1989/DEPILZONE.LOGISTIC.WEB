import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlmacenUbicacion} from "../../models/Almacen";
import {MdlAlmacenUbicacionComponent} from "../../components/modals/mdl-almacen-ubicacion/mdl-almacen-ubicacion.component";
import {TblAlmacenUbicacionComponent} from "../../components/tables/tbl-almacen-ubicacion/tbl-almacen-ubicacion.component";

@Component({
  selector: 'app-almacen-ubicacion',
  templateUrl: './almacen-ubicacion.component.html',
  styleUrls: ['./almacen-ubicacion.component.scss']
})
export class AlmacenUbicacionComponent implements OnInit, AfterViewInit {

  @ViewChild('tabla') tabla !: TblAlmacenUbicacionComponent;
  bsModalRef?: BsModalRef | null;
  selected : AlmacenUbicacion | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla.selected.subscribe((res: AlmacenUbicacion | null) =>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlAlmacenUbicacionComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.onReload();
      }
    });
  }

  onEdit( ubicacion: AlmacenUbicacion | null = null ): void{

    const initialState = ubicacion ? {ubicacion: ubicacion} : {ubicacion: this.selected};
    this.bsModalRef = this.modalService.show(MdlAlmacenUbicacionComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false, initialState});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.updated){
        this.tabla.showCollection();
      }
    });
  }

  onReload(): void{
    this.tabla.showCollection();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.tabla.dataSource.paginator) {
      this.tabla.paginator.firstPage();
    }
  }

}
