import Card from "react-bootstrap/Card";
import { useState } from "react";
import { Button } from "react-bootstrap";
const Brand = ({ onChangeProp, checkedBrandArray, brandArray }) => {
  const [limit, setLimit] = useState(10);
  const onClickHandler = () => {
    setLimit(limit + 10);
  };
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2" style={{width:'100%'}}>
      <Card.Header>Brand</Card.Header>
      <Card.Body>
        <Card.Text>
          {brandArray.slice(0, limit).map((items, key) => {
            return (
              <p>
                <input
                  type="checkbox"
                  value={items}
                  onChange={() => {
                    onChangeProp(key);
                  }}
                  checked={checkedBrandArray[key]}
                />{" "}
                {items}
              </p>
            );
          })}
          {limit <= brandArray.length ? (
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
export default Brand;
