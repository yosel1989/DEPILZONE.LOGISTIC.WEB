export class Almacen{
  id!: number;
  nombre!: string;
  idSede!: number;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;
  sede!: string;
  constructor() {
  }
}



export class AlmacenUbicacion{
  id!: number;
  nombre!: string;
  idSede!: number;
  idAlmacen!: number;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;
  sede!: string;
  almacen!: string;
  constructor() {
  }
}


