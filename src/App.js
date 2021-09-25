import { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [data, setData] = useState([]);
  const [likeData, setLikeData] = useState([]);
  const [dislikeData, setDislikeData] = useState([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((response) => response.json())
      .then((data) => {
        setData(data.slice(0, 5));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data.length === 0]);

  const handleLike = (el) => {
    setLikeData([...likeData, el]);
    let updatedData = [...data];
    updatedData = updatedData.filter((e) => e.id !== el.id);
    setData(updatedData);
  };

  const handleDislike = (el) => {
    setDislikeData([...dislikeData, el]);
    let updatedData = [...data];
    updatedData = updatedData.filter((e) => e.id !== el.id);
    setData(updatedData);
  };

  const showData = data.length ? (
    data.map((el) => {
      return (
        <Col key={el.id} style={{ marginTop: "1rem" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={el.download_url}
              width="200"
              height="200"
            />
            <Card.Body>
              <Card.Title>{el.author}</Card.Title>

              <Button
                variant="danger"
                onClick={() => {
                  handleLike(el);
                }}
              >
                Like
              </Button>
              <Button
                variant="primary"
                style={{ marginLeft: "2rem" }}
                onClick={() => {
                  handleDislike(el);
                }}
              >
                Dislike
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  ) : (
    <p>...loading</p>
  );

  const leftDataColumn = likeData.length ? (
    likeData.map((el) => {
      return (
        <Col key={el.id} style={{ marginTop: "1rem" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={el.download_url}
              width="200"
              height="200"
            />
            <Card.Body>
              <Card.Title>{el.author}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  ) : (
    <p>No like post yet!</p>
  );
  const rightDataColumn = dislikeData.length ? (
    dislikeData.map((el) => {
      return (
        <Col key={el.id} style={{ marginTop: "1rem" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={el.download_url}
              width="200"
              height="200"
            />
            <Card.Body>
              <Card.Title>{el.author}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  ) : (
    <p>No dislike post yet!</p>
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#FFF8E5" }}>
      <Row>
        {/* like data column */}
        <Col style={{ border: "2px solid red" }}>
          <Row>
            {leftDataColumn.length && <h2>Like posts are </h2>}
            {leftDataColumn}
          </Row>
        </Col>
        {/* actual  data column */}
        <Col style={{ border: "2px solid black" }}>
          <Row>
            {showData.length && <h2>The Posts are </h2>}
            {showData}
          </Row>
        </Col>
        {/* dislike data column */}
        <Col style={{ border: "2px solid blue" }}>
          <Row>
            {rightDataColumn.length && <h2>Dislike posts are </h2>}
            {rightDataColumn}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default App;
