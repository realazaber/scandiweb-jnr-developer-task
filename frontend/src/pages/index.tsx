import Product from "../components/Product";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/Product";
import { baseUrl } from "../helper";

export default function Index() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(baseUrl + "/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <Row className="justify-content-center">
      {products.length === 0 ? (
        <h2 className="text-center">Please add a product</h2>
      ) : (
        products.map((product) => (
          <Product
            key={product.id}
            sku={product.sku}
            name={product.name}
            price={product.price}
            type={product.type}
            megabytes={product.megabytes}
            weight={product.weight}
            width={product.width}
            height={product.height}
            depth={product.depth}
          />
        ))
      )}
    </Row>
  );
}
