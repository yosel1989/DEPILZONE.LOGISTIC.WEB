import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import { UnidadMedida} from "../../models/Articulo";
import {TblUnidadMedidaComponent} from "../../components/tables/tbl-unidad-medida/tbl-unidad-medida.component";
import {MdlUnidadMedidaComponent} from "../../components/modals/mdl-unidad-medida/mdl-unidad-medida.component";

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit, AfterViewInit {

  selected: UnidadMedida | null = null;

  @ViewChild('tabla') tabla!: TblUnidadMedidaComponent;
  bsModalRef!: BsModalRef | null;
  unitSelected : UnidadMedida | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: UnidadMedida | null) => {
      this.selected = res;
    });
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlUnidadMedidaComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( um: UnidadMedida | null = null ): void{

    const initialState = um ? {unidadMedida: um} : {unidadMedida: this.unitSelected};
    this.bsModalRef = this.modalService.show(MdlUnidadMedidaComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
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
