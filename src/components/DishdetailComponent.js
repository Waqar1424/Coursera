import react, {Component} from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';



class DishDetails extends Component{
    renderDish(dish) {
        if (dish != null) {
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
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <div className="mt-3">{comment.comment}</div>
                        <div className="mt-2">-- {comment.author}, {comment.date}</div>
                    </li>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>{comments}</ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render(props) {
        return <div className='row'>
            <div className='col-12 col-md-5 m-1'>   
                {this.renderDish(this.props.dish)}
            </div>
            <div className='col-12 col-md-5 m-1'>   
                {this.renderComments(this.props.dish)}
            </div>
        </div>
    }
}

export default DishDetails;