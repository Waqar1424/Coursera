import react, {Component} from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';



class DishDetail extends Component{
    renderDish(dish) {
        if (dish != null) {
            return (
                
                <Card className="col-12 col-md-5 m-1">
                    
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
                    <div className="container">
                    <div className="row">
                    <li key={comment.id}>
                        <div className="mt-3">{comment.comment}</div>
                        <div className="mt-2">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                    </li>
                    </div>
                    </div>
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
    

    render() {
        if(this.props.dish != null){
        return (
            <div className="container">
        <div className='row'>  
                
                {this.renderDish(this.props.dish)}
              
                {this.renderComments(this.props.dish)}
            </div>
        </div>
    
        );
        }else{
            <div></div>
        }

    }
}

export default DishDetail;