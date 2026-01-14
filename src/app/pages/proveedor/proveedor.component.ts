import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TblProveedorComponent} from "../../components/tables/tbl-proveedor/tbl-proveedor.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Proveedor} from "../../models/Proveedor";
import {MdlProveedorComponent} from "../../components/modals/mdl-proveedor/mdl-proveedor.component";

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit, AfterViewInit {

  @ViewChild('tabla') tabla !: TblProveedorComponent;
  bsModalRef?: BsModalRef | null;
  selected : Proveedor | null = null;

  constructor(
    private modalService: BsModalService
  ) {
    this.bsModalRef = null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.tabla._selected.subscribe((res: Proveedor | null) =>{
      this.selected = res;
    });
  }

  ngOnDestroy(): void {
    this.bsModalRef = null;
  }

  // Button events
  onCreate(): void{
    this.bsModalRef = this.modalService.show(MdlProveedorComponent, { id: new Date().getTime(), class: 'mw-850px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true});
    this.bsModalRef.onHide?.subscribe((res) => {
      console.log('hide modal proveedor');
      if(this.bsModalRef?.content.created){
        this.tabla.showCollection();
      }
    });
  }

  onEdit( proveedor: Proveedor | null = null ): void{

    const initialState = proveedor ? {proveedor: proveedor} : {proveedor: this.selected};
    this.bsModalRef = this.modalService.show(MdlProveedorComponent, { id: new Date().getTime(), class: 'mw-650px', keyboard: false, backdrop: "static",
      ignoreBackdropClick: true, initialState});
    this.bsModalRef.onHide?.subscribe((res) => {
      console.log('hide modal proveedor');
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
