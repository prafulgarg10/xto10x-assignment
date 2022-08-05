import Card from "react-bootstrap/Card";
const Brand = ({ onChangeProp, checkedBrandArray, brandArray }) => {
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2">
      <Card.Header>Brand</Card.Header>
      <Card.Body>
        <Card.Text>
          {
          brandArray.map((items, key) => {
            return (
              <p>
                <input type="checkbox" value={items} onChange={() => {onChangeProp(key)}} checked={checkedBrandArray[key]}/>{" "}
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
export default Brand;
