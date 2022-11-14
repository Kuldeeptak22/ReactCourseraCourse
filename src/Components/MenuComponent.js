import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor called");
    this.state = {
      selectedDish: null,
    };
  }

  // lifecycle Mounting method:-
  componentDidMount() {
    console.log("Component Did Mount called");
  }

  // Method 1
  // When clicked on the image this function will active:-
  // we will change the state of selectedDish from null to dish.
  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  render() {
    console.log("Render called");
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card
            key={dish.id}
            onClick={() => {
              this.onDishSelect(dish);
            }}
          >
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <DishDetail dish={this.state.selectedDish} />
      </div>
    );
  }
}

export default Menu;
