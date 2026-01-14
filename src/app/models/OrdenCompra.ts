export class OrdenCompra{
  id!: number;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number;
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;
  items: number = 0;

  detalle: OrdenCompraDetalle[] = [];
  constructor() {
  }
}

export class OrdenCompraDetalle{
  id!: number;
  idOrdenCompra!: number;
  idArticulo!: number;
  cantidad: number = 0;
  idProveedor: string | null = null;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number;
  fechaRegistro!: Date;
  fechaModifico!: Date | null;

  //secondary
  unidadMedida!: string;
  articulo!: string;
  proveedor!: string | null;
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  constructor() {
  }
}


