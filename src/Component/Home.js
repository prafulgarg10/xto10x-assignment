import { useEffect, useState } from "react";
import Brand from "./Brand";
import Category from "./Category";
import ProductCard from "./Product-Card";
import styles from "./css/Home.module.css";

const Home = () => {
  const [product, setProduct] = useState([]); //contain all product
  const [filteredProduct, setFilteredProduct] = useState([]); //contain filtered product

  const [checkedCategoryState, setCheckedCategoryState] = useState(
    new Array(26).fill(false) 
  );
  const [checkedBrandState, setCheckedBrandState] = useState(
    new Array(65).fill(false)
  );

  const [category, setCategory] = useState([]); //all unique categories
  const [brand, setBrand] = useState([]); //all unique brand

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
    var categoryLength = [...new Set(checkedCategoryState)].length; //to check whether all values are false or all are true
    var brandLength = [...new Set(checkedBrandState)].length;
    if (categoryLength === 1 && brandLength === 1) {
      setFilteredProduct(product);       //both category and brand checkboxes are not selected or all selected
    } 
    else if (categoryLength === 1 && brandLength !== 1) {
      var arr_b = [];                    //category checkboxes are not selected and brand checkboxes have some selected
      checkedBrandState.forEach((curr, index) => {
        if (curr) {
          arr_b = product
            .filter((item) => {
              return item.brand === brand[index];
            })
            .concat(arr_b);
        }
      });
      setFilteredProduct(arr_b);
    } 
    else if (categoryLength !== 1 && brandLength === 1) {
      var arr_c = [];                   //brand checkboxes are not selected and category checkboxes have some selected
      checkedCategoryState.forEach((curr, index) => {
        if (curr) {
          arr_c = product
            .filter((item) => {
              return item.category === category[index];
            })
            .concat(arr_c);
        }
      });
      setFilteredProduct(arr_c);
    } else {
      var arr_cb = [];                // both brand and category have some checkboxes selected
      var arr_result = [];
      checkedCategoryState.forEach((curr, index) => {
        if (curr) {
          arr_cb = product
            .filter((item) => {
              return item.category === category[index];
            })
            .concat(arr_cb);
        }
      });
      checkedBrandState.forEach((curr, index) => {
        if (curr) {
          arr_result = arr_cb
            .filter((item) => {
              return item.brand === brand[index];
            })
            .concat(arr_result);
        }
      });
      setFilteredProduct(arr_result);
    }
  }, [checkedCategoryState, checkedBrandState, product, category, brand]);


  const onCategoryChangeHandler = (position) => {
    const updatedCheckedState = checkedCategoryState.map((item, index) =>
      index === position ? !item : item
    );
    //this is taking care of checkboxes checked status
    setCheckedCategoryState(updatedCheckedState);
  };


  const onBrandChangeHandler = (position) => {
    const updatedCheckedState = checkedBrandState.map((item, index) =>
      index === position ? !item : item
    );
    //this is taking care of checkboxes checked status
    setCheckedBrandState(updatedCheckedState);
  };

  return (
    <div className={styles.main}>
      <div className={styles.filter}>
        <Category
          onChangeProp={onCategoryChangeHandler}
          checkedCategoryArray={checkedCategoryState}
          categoryArray={category}
        />
        <Brand
          onChangeProp={onBrandChangeHandler}
          checkedBrandArray={checkedBrandState}
          brandArray={brand}
        />
      </div>
      <div className={styles.product}>
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
