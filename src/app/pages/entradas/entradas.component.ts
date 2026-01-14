import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TblAlmacenComponent} from "../../components/tables/tbl-almacen/tbl-almacen.component";
import { MdlAlmacenComponent } from 'src/app/components/modals/mdl-almacen/mdl-almacen.component';
import { Almacen } from 'src/app/models/Almacen';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit, AfterViewInit {

  @ViewChild('tabla') tabla !: TblAlmacenComponent;
  bsModalRef?: BsModalRef | null;
  selected : Almacen | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla.selected.subscribe((res: Almacen | null) =>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlAlmacenComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( almacen: Almacen | null = null ): void{

    const initialState = almacen ? {almacen: almacen} : {almacen: this.selected};
    this.bsModalRef = this.modalService.show(MdlAlmacenComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
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
