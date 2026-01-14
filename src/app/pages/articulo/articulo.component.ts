import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TblArticuloComponent} from "../../components/tables/tbl-articulo/tbl-articulo.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {MdlArticuloComponent} from "../../components/modals/mdl-articulo/mdl-articulo.component";
import {Articulo} from "../../models/Articulo";
import {MdlArticuloProveedoresComponent} from "../../components/modals/mdl-articulo-proveedores/mdl-articulo-proveedores.component";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit, AfterViewInit {

  @ViewChild('tabla') tabla !: TblArticuloComponent;
  bsModalRef?: BsModalRef | null;
  selected : Articulo | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla.selected.subscribe((res: Articulo | null) =>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlArticuloComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( articulo: Articulo | null = null ): void{

    const initialState = articulo ? {articulo: articulo} : {articulo: this.selected};
    this.bsModalRef = this.modalService.show(MdlArticuloComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false, initialState});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.updated){
        this.onReload();
      }
    });
  }

  onShowProviders(articulo: Articulo): void{
    const initialState = { articulo: articulo };
    this.bsModalRef = this.modalService.show(MdlArticuloProveedoresComponent, { class: 'modal-fullscreen', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false, initialState});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.onReload();
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
