import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
      >
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    const commentListItems = comments.map((comment) => {
      return (
        <Fade in>
          <li key={comment.id}>
            <div>
              <p>{comment.comment}</p>
              <p>
                --{comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          </li>
        </Fade>
      );
    });
    return (
      <div className=" col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>{commentListItems}</Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleComment = this.handleComment.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleComment(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.yourname,
      values.message
    );
  }

  render() {
    return (
      <>
        <Button className="btn btn-primary" outline onClick={this.toggleModal}>
          <i className="fa fa-solid fa-pencil"></i> Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleComment(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    defaultValue="1"
                    model=".rating"
                    className="rating"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="yourname" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".yourname"
                    id="yourname"
                    name="yourname"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      required: "*Required:",
                      minLength: " Must be greater than 2 characters",
                      maxLength: " Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMessage) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMessage}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
