import react, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

class DishDetails extends Component {
  renderDish(dish) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comment) {
    if (comment != null)
      return (
        <div className="col-12 col-md-5 ml-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author}, &nbsp;
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(new Date(comment.date))}
              </p>
            </li>
          </ul>
        </div>
      );
    else return <div></div>;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{this.props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 ml-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 ml-1">
            {this.renderComments(this.props.comments)}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetails;
