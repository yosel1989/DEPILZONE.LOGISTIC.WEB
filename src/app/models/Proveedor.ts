export class Proveedor{
  id!: number;
  ruc!: string;
  razonSocial!: string;
  contactoNombre!: string | null;
  contactoApellido!: string | null;
  contactoTelefono!: string | null;
  contactoCorreo!: string | null;
  idUbicacion!: string | null;
  direccion!: string | null;
  idUsuarioRegistro!: number;
  idUsuarioModifico!: number;
  fechaRegistro!: Date | null;
  fechaModifico!: Date | null;
  idEstado!: number;

  //secondary
  usuarioRegistro!: string | null;
  usuarioModifico!: string | null;
  estado!: string;
  ciudad!: string | null;
  distrito!: string | null;
  ubigeo!: string | null;
  constructor() {
  }
}
