import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchProductInfo } from "../custom_hooks/useFetchProductInfo";
import { IProduct } from "./SearchResults";

const ProductDetail = () => {
  const params = useParams();
  const { fetchProductInfo, isLoading, error } = useFetchProductInfo();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    fetchProductInfo(params.id!, (data) => setProduct(data));
  }, []);

  if (isLoading) {
    return <h2>Loading Product Info...</h2>;
  }

  return (
    <div className="product-detail-container">
      <h1 className="product-detail-title">{product?.title}</h1>

      <div className="product-detail-content">
        <div className="product-detail-image-container">
          <img className="product-detail-image" src={product?.mainImage} alt={product?.title} />
        </div>

        <div className="product-detail-description">
          <p className="product-description">{product?.description}</p>
          <span className="price">${product?.price}</span>
          {product?.inventory! >= 1 ? <button className="btn">Add to Cart</button> : <button className="btn-sold-out" disabled>Sold Out</button>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
