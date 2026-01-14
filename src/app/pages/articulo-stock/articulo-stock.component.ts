import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ArticuloStock} from "../../models/Articulo";
import {TblArticuloStockComponent} from "../../components/tables/tbl-articulo-stock/tbl-articulo-stock.component";
import {MdlArticuloStockComponent} from "../../components/modals/mdl-articulo-stock/mdl-articulo-stock.component";

@Component({
  selector: 'app-articulo-stock',
  templateUrl: './articulo-stock.component.html',
  styleUrls: ['./articulo-stock.component.scss']
})
export class ArticuloStockComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tabla') tabla!: TblArticuloStockComponent;
  bsModalRef?: BsModalRef | null;
  categoriaSeleted : ArticuloStock | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: ArticuloStock | null)=>{
      this.categoriaSeleted = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlArticuloStockComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( articuloStock: ArticuloStock | null = null ): void{
    const initialState = articuloStock ? {articuloStock: articuloStock} : {articuloCategoria: this.categoriaSeleted};
    this.bsModalRef = this.modalService.show(MdlArticuloStockComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
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
