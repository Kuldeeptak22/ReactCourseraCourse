import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  //Method Render dish card and Image:-
  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Method for Render Comments:-
  renderComments(comments) {
    if (comments != null) {
      const commentListItems = comments.map((comment) => {
        return (
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
        );
      });
      return (
        <div className=" col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">{commentListItems}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    if (this.props.dish != null) {
      return (
        <div className="row">
          {this.renderDish(this.props.dish)}
          {this.renderComments(this.props.dish.comments)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default DishDetail;
