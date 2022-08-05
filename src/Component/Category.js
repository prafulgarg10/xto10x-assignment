import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const Category = ({ onChangeProp, checkedCategoryArray, categoryArray }) => {
  const [limit, setLimit] = useState(10);
  const onClickHandler = () => {
    setLimit(limit + 10);
  };
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2" style={{width:'100%'}}>
      <Card.Header>Category</Card.Header>
      <Card.Body>
        <Card.Text>
          {categoryArray.slice(0, limit).map((items, key) => {
            return (
              <p>
                <input
                  type="checkbox"
                  value={items}
                  onChange={() => {
                    onChangeProp(key);
                  }}
                  checked={checkedCategoryArray[key]}
                />{" "}
                {items}
              </p>
            );
          })}
          {limit <= categoryArray.length ? (
            <Button
              variant="link"
              onClick={onClickHandler}
              style={{ padding: "0px" }}
            >
              Load more
            </Button>
          ) : (
            ""
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Category;
