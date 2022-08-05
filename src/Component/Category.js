import Card from "react-bootstrap/Card";
const Category = ({ onChangeProp, checkedCategoryArray, categoryArray }) => {
  return (
    <Card bg={"Light"} text={"dark"} className="mb-2">
      <Card.Header>Category</Card.Header>
      <Card.Body>
        <Card.Text>
          {
          categoryArray.map((items, key) => {
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
