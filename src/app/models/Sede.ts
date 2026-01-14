export class Sede{
  id!: number;
  nombre!: string;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number
  fechaRegistro!: Date;
  fechaModifico!: Date | null;
  idEstado!: number;

  idHash!: string;

  // secondary
  usuarioRegistro!: string;
  usuarioModifico!: string | null;
  estado!: string;
  constructor() {
  }
}

