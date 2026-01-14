interface ArticuloOrdenInterface{
  id: number;
  idOrdenCompra: number;
  idArticulo: number;
  idEstado: number;
  cantidad: number;
  idProveedor: number | null;

  // secondary
  articulo: string;
  estado: string;
  proveedor: string;
}
