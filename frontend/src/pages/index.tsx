import Product from "@/components/Product";
import { Row } from "react-bootstrap";

export default function Index() {
  const products = [
    {
      sku: "DVD001",
      name: "DVD Movie",
      price: 10.99,
      type: "DVD",
      megabytes: 700,
    },
    {
      sku: "BOOK001",
      name: "Book",
      price: 15.99,
      type: "book",
      weight: "1.5 lbs",
    },
    {
      sku: "FURN001",
      name: "Table",
      price: 99.99,
      type: "furniture",
      width: 28,
      height: 24,
      depth: 24,
    },
    {
      sku: "DVD002",
      name: "DVD TV Series",
      price: 29.99,
      type: "DVD",
      megabytes: 1400,
    },
    {
      sku: "BOOK002",
      name: "Novel",
      price: 12.49,
      type: "book",
      weight: "1.2 lbs",
    },
    {
      sku: "FURN002",
      name: "Chair",
      price: 49.99,
      type: "furniture",
      width: 24,
      height: 22,
      depth: 32,
    },
    {
      sku: "DVD003",
      name: "DVD Documentary",
      price: 9.99,
      type: "DVD",
      megabytes: 900,
    },
    {
      sku: "BOOK003",
      name: "Cookbook",
      price: 18.99,
      type: "book",
      weight: "2.0 lbs",
    },
    {
      sku: "FURN003",
      name: "Sofa",
      price: 199.99,
      type: "furniture",
      width: 78,
      height: 34,
      depth: 32,
    },
  ];

  return (
    <Row className="justify-content-center">
      {products.map((product, index) => (
        <Product
          key={index}
          sku={product.sku}
          name={product.name}
          price={product.price}
          type={product.type}
          megabytes={product.megabytes}
          width={product.width}
          height={product.height}
          depth={product.depth}
        />
      ))}
    </Row>
  );
}
