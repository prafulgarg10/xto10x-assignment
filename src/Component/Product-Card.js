import Card from "react-bootstrap/Card";
const ProductCard = ({
  title,
  rating,
  imagesrc,
  description,
  price,
  ratingcount,
  mrp,
}) => {
  return (
    <Card style={{ width: "270px" }}>
      <Card.Img variant="top" src={imagesrc} />
      <Card.Body>
        <p>
          {rating.toFixed(1)}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="green"
            className="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>{" "}
          |{" "}
          {ratingcount > 1000
            ? (
                ratingcount / Math.pow(10, ratingcount.toString().length - 1)
              ).toFixed(1) + "k"
            : ratingcount}
        </p>
        <Card.Title style={{ height: "100px" }}>{title}</Card.Title>
        <Card.Text style={{ height: "80px" }}>{description}</Card.Text>
        <Card.Text>
          Rs.{price} <s>{mrp}</s>{" "}
          <span style={{ color: "orange" }}>(Rs.{mrp - price} Off)</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
