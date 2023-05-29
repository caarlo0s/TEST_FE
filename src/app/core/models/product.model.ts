export interface ProductModel{
  id_articulo:number;
  codigo: string;
  descripcion:string;
  precio: string;
  imagen: string;

}
export interface StockProductModel{
  id_stock_tienda:number;
  id_articulo_r: number;
  id_tienda_r:number;
  stock: number;
  date_create: Date;

}

export interface StockStoreModel{
  sucursal:string;
  stock:number;

}
