import {Proveedor} from "./Proveedor";

export class Articulo{
  id!: number;
  nombre!: string;
  descripcion!: string;
  codigo!: string | null;
  idUnidadMedida!: number;
  idCategoria!: number;
  stock: number = 0;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string;
  unidadMedida!: string;
  categoria!: string;
  estado!: string;
  numeroProveedores: number = 0;
  proveedores: Proveedor[] = [];
  constructor() {
  }
}


export class ArticuloStock extends Articulo{
  // id: number;
  idArticulo!: number;
  stockInicial!: number;
  // stock!: number;
  apartado: number = 0;
  idSede!: number;
  idAlmacen!: number;
  idAlmacenUbicacion!: number | null;
  idTransaccion!: number;
  // idUsuarioRegistro!: number;
  // idUsuarioModifico!: number
  // fechaRegistro!: Date;
  // fechaModifico!: Date | null;
  // idEstado!: number;

  // secondary
  // usuarioRegistro!: string;
  // usuarioModifico!: string;
  articulo!: string;
  sede!: string;
  almacen!: string;
  almacenUbicacion!: string | null;
  transaccion!: string | null;
  // estado!: string;
  // constructor() {
  // }
}

export class ArticuloOrden extends Articulo{
  // id!: number;
  idOrdenCompra!: number;
  // idEstado!: number;
  cantidad: number = 0;
  idProveedor: number | null = null;

  // secondary
  // nombre!: string;
  // estado!: string;
  proveedor: string | null = null;
  // constructor() {
  // }
}


export class UnidadMedida{
  id!: number;
  nombre!: string;
  nombreCorto!: string;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string;
  estado!: string;
  constructor() {
  }
}

export class ArticuloCategoria{
  id!: number;
  nombre!: string;
  descripcion!: string;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;
  constructor() {
  }
}



