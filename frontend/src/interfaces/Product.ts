export interface IProduct {
  id: Number;
  name: String;
  sku: String;
  price: Number;
  type: String;

  weight?: Number;

  megabytes?: Number;

  width?: Number;
  height?: Number;
  depth?: Number;
}
