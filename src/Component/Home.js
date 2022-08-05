import { useEffect, useState } from "react";
import Brand from "./Brand";
import Category from "./Category";
import ProductCard from "./Product-Card";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const [checkedCategoryState, setCheckedCategoryState] = useState(
    new Array(26).fill(false)
  );
  const [checkedBrandState, setCheckedBrandState] = useState(
    new Array(65).fill(false)
  );

  const [category, setCategory] = useState([]); 
  const [brand, setBrand] = useState([]); 

  useEffect(() => {
    fetch("https://demo7394057.mockable.io/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data.products);
          setCategory([...new Set(data.products.map((item) => item.category))]);
          setBrand([...new Set(data.products.map((item) => item.brand))]);
        setFilteredProduct(data.products);
      });
  }, []);
  useEffect(() => {
    var categoryLength = [...new Set(checkedCategoryState)].length;
    var brandLength = [...new Set(checkedBrandState)].length;
    if(categoryLength===1&&brandLength===1){
      setFilteredProduct(product);
    }
    else if(categoryLength===1&&brandLength!==1){
      var arr_b = [];
      checkedBrandState.forEach((curr, index)=>{
        if(curr){
          arr_b = product.filter((item)=>{
            return item.brand===brand[index];
          }).concat(arr_b);
        }
      })
      setFilteredProduct(arr_b);
    }
    else if(categoryLength!==1&&brandLength===1){
      var arr_c = [];
      checkedCategoryState.forEach((curr, index)=>{
        if(curr){
          arr_c = product.filter((item)=>{
            return item.category===category[index];
          }).concat(arr_c);
        }
      })
      setFilteredProduct(arr_c);
    }
    else{
      var arr_cb = [];
      var arr_result = [];
      checkedCategoryState.forEach((curr, index)=>{
        if(curr){
          arr_cb = product.filter((item)=>{
            return item.category===category[index];
          }).concat(arr_cb);
        }
      });
      checkedBrandState.forEach((curr, index)=>{
        if(curr){
          arr_result = arr_cb.filter((item)=>{
            return item.brand===brand[index];
          }).concat(arr_result);
        }
      })
      setFilteredProduct(arr_result);

    }
  },[checkedCategoryState,checkedBrandState,product,category,brand]);

  const onCategoryChangeHandler = (position) => {
    const updatedCheckedState = checkedCategoryState.map(
      (item, index) => (index === position ? !item : item)
    );

    setCheckedCategoryState(updatedCheckedState);
  } 
  const onBrandChangeHandler = (position) => {
    const updatedCheckedState = checkedBrandState.map(
      (item, index) => (index === position ? !item : item)
    );

    setCheckedBrandState(updatedCheckedState);
  } 
  


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
        <Category onChangeProp={onCategoryChangeHandler} checkedCategoryArray={checkedCategoryState} categoryArray={category}/>
        <Brand onChangeProp={onBrandChangeHandler} checkedBrandArray={checkedBrandState} brandArray={brand}/>
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
