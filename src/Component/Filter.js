import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
const Filter = ({ title, onChangeProp, checkedArray }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://demo7394057.mockable.io/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        (title==='Category') ? setProduct([...new Set(data.products.map(item => item.category))]) : setProduct([...new Set(data.products.map(item => item.brand))]);
        
      });
  }, [title]);
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {
          (title==='Category') ?
            product.map((items, key) => {
              return (
                <p>
                  <input type="checkbox" value={items} onChange={() => {onChangeProp(key)}} checked={checkedArray[key]}/>{" "}
                  {items}
                </p>
              );
            })
          : 
          product.map((items, key) => {
            return (
              <p>
                <input type="checkbox" value={items} onChange={() => {onChangeProp(key+26)}} checked={checkedArray[key+26]}/>{" "}
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
export default Filter;
