import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TransaccionTipo} from "../../models/Transaccion";
import {TblTransaccionTipoComponent} from "../../components/tables/tbl-transaccion-tipo/tbl-transaccion-tipo.component";
import { MdlTransaccionTipoComponent } from 'src/app/components/modals/mdl-transaccion-tipo/mdl-transaccion-tipo.component';

@Component({
  selector: 'app-transaccion-tipo',
  templateUrl: './transaccion-tipo.component.html',
  styleUrls: ['./transaccion-tipo.component.scss']
})
export class TransaccionTipoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tabla') tabla!: TblTransaccionTipoComponent;
  bsModalRef?: BsModalRef | null;
  selected : TransaccionTipo | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla?.selected.subscribe((res: TransaccionTipo | null)=>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlTransaccionTipoComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: false});
    this.bsModalRef.onHide?.subscribe((res) => {
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( tipo: TransaccionTipo | null = null ): void{
    const initialState = tipo ? {transaccionTipo: tipo} : {transaccionTipo: this.selected};
    this.bsModalRef = this.modalService.show(MdlTransaccionTipoComponent, { class: 'mw-650px', keyboard: false, backdrop: "static",
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
