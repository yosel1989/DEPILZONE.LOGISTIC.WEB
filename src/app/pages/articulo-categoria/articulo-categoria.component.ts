import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ArticuloCategoria} from "../../models/Articulo";
import {TblArticuloCategoriaComponent} from "../../components/tables/tbl-articulo-categoria/tbl-articulo-categoria.component";
import {MdlArticuloCategoriaComponent} from "../../components/modals/mdl-articulo-categoria/mdl-articulo-categoria.component";

@Component({
  selector: 'app-articulo-categoria',
  templateUrl: './articulo-categoria.component.html',
  styleUrls: ['./articulo-categoria.component.scss']
})
export class ArticuloCategoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tabla') tabla!: TblArticuloCategoriaComponent;
  bsModalRef?: BsModalRef | null;
  categoriaSeleted : ArticuloCategoria | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: ArticuloCategoria | null)=>{
      this.categoriaSeleted = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlArticuloCategoriaComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( categoria: ArticuloCategoria | null = null ): void{
    const initialState = categoria ? {articuloCategoria: categoria} : {articuloCategoria: this.categoriaSeleted};
    this.bsModalRef = this.modalService.show(MdlArticuloCategoriaComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
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

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tabla.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.tabla.dataSource.paginator) {
      this.tabla.dataSource.paginator.firstPage();
    }
  }

}
