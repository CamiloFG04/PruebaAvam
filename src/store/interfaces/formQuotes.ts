export interface Form {
  cliente_id: number;
  valor: number;
  fecha: string;
  productos: Producto[];
}

export interface Producto {
  producto: number;
  cantidad: number;
  valorU: number;
  ValorT: number;
}

export interface ProductoDialog {
  nombre: string;
  producto: number;
  cantidad: number;
  valorU: number;
  ValorT: number;
  img: string;
}

export interface ProductoFinal {
  id: number;
  cantidad: number;
}
