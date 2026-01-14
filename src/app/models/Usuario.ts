export class Usuario{
  id!: number;
  nombre!: string;
  usuario!: string;
  perfil!: string;
  idPerfil!: number;
  idSede!: number;
  idGenero!: number;

  // secondary
  sede!: string;
  constructor() {
  }
}

export class Credenciales{
  usuario!: string;
  clave!: string;
}
