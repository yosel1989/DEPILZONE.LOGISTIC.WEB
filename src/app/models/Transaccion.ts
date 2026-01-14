export class TransaccionTipo{
  id!: number;
  nombre!: string;
  nombreCorto!: string;
  descripcion!: string |null;
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

export class Transaccion{
  id!: number;
  idTipoTransaccion!: number;
  idSedeOrigen!: number;
  idSedeDestino!: number;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number;
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  tipoTransaccion!: string;
  sedeOrigen!: string | null;
  sedeDestino!: string | null;
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;

  detalle: TransaccionDetalle[] = [];
  constructor() {
  }
}

export class TransaccionDetalle{
  id!: number;
  idTransaccion!: number;
  idArticuloStock!: number;
  cantidad!: number;
  cantidadReal!: number;
  observacion: string | null = null;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number;
  fechaRegistro!: Date;
  fechaModifico!: Date | null;

  //secondary
  unidadMedida!: number;
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  constructor() {
  }
}


