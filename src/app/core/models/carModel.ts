
export interface CarModel{
  products:prodcutCart[];
  sucursal:number;
  total:number;

}
export interface prodcutCart{
  id_articulo:number;
  descripcion:string;
  cantidad:number;
  precio:number;
  total:number
}
