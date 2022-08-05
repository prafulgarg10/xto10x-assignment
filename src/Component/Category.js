import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
const Category = ({ onChangeProp, checkedCategoryArray }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://demo7394057.mockable.io/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct([...new Set(data.products.map(item => item.category))]);
        
      });
  }, []);
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2">
      <Card.Header>Category</Card.Header>
      <Card.Body>
        <Card.Text>
          {
          product.map((items, key) => {
            return (
              <p>
                <input type="checkbox" value={items} onChange={() => {onChangeProp(key)}} checked={checkedCategoryArray[key]}/>{" "}
                {items}
              </p>
            );
          })
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Category;
