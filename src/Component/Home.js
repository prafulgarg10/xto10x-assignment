import { useEffect, useState } from "react";
import Filter from "./Filter";
import ProductCard from "./Product-Card";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const [checkedState, setCheckedState] = useState(
    new Array(26 + 65).fill(false)
  );

  const [categorybrand, setCategoryBrand] = useState([]); //adding category and brand in this array

  useEffect(() => {
    fetch("https://demo7394057.mockable.io/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data.products);
        setCategoryBrand(
          [...new Set(data.products.map((item) => item.category))].concat([
            ...new Set(data.products.map((item) => item.brand)),
          ])
        );
        setFilteredProduct(data.products);
        // console.log(data.products);
      });
  }, []);


  const onChangeHandler = (position) => {
    const updatedCheckedState = checkedState.map(
      (item, index) => (index === position ? !item : item)
    );

    setCheckedState(updatedCheckedState);
    var filterproduct;
    if([...new Set(updatedCheckedState)].length===1){
        filterproduct = product;
    }
    else{
      filterproduct = updatedCheckedState.reduce(
      (prod, currentState, index) => {
        if (index < 26) {
          if (currentState === true) {
            var arr = product.filter((items) => {
                return items.category.includes(categorybrand[index]);
              })
              .concat(prod);
            return arr;
          }
          return prod;
        } else {
          if (currentState === true) {
            var arr1 = product
              .filter((items) => {
                return items.brand.includes(categorybrand[index]);
              })
              .concat(prod);
            return arr1;
          }
          return prod;
        }
      },
      []
    );
    }

    setFilteredProduct(filterproduct);
  };


  return (
    <div
      style={{ display: "flex", gap: "10px", width: "100%", marginTop: "20px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
          width: "20%",
        }}
      >
        <Filter
          title="Category"
          onChangeProp={onChangeHandler}
          checkedArray={checkedState}
        />
        <Filter
          title="Brand"
          onChangeProp={onChangeHandler} 
          checkedArray={checkedState} 
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          width: "80%",
          alignContent: 'flex-start'
        }}
      >
        {filteredProduct.map((items, num) => {
          return (
            <ProductCard
              title={items.productName}
              key={num}
              rating={items.rating}
              imagesrc={items.searchImage}
              description={items.product}
              price={items.price}
              ratingcount={items.ratingCount}
              mrp={items.mrp}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
