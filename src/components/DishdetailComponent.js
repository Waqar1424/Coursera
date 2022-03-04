import react, {Component} from "react";
import { Link } from "react-router-dom";
import {Card,CardImg,CardTitle,CardBody,CardText,Breadcrumb,BreadcrumbItem,Button,Modal, ModalHeader, ModalBody,Label, Row, Col} from "reactstrap";
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

  constructor(props){
    super(props);
    this.state = {
        isModalOpen: false
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

toggleModel(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    console.log(this.state);
}
handleSubmit(values){
  this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    this.toggleModel();
}


     render() {
       return (
        <div>
        <Button outline onClick={this.toggleModel}><span className="fa fa-pencil"></span>{' '}Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader close={<Button className="fa fa-close close" onClick={this.toggleModel}></Button>}>Submit Comment
                </ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col className="col-12">
                            <Control.select model=".rating" name="rating"
                                className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                </Row>
                <Row className="form-group">
                        <Label htmlFor="author" md={3}>Your Name</Label>
                        <Col md={12}>
                        <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                        </Col>
                </Row>
                <Row className="form-group">
                <Label htmlFor="comment" md={4}>Your Feedback</Label>
                    <Col md={12}>
                        <Control.textarea model=".comment" id="comment" name="comment"
                            rows="6"
                            className="form-control" />
                    </Col>
                </Row>
                <Row className="form-group">
                <Col>
                    <Button type="submit" color="primary">
                    Submit
                    </Button>
                </Col>
                </Row>
                </LocalForm>
                </ModalBody>
            </Modal>
        
        </div>
        );
     }
}
  function RenderDish({dish}) {
        return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  function RenderComments({comments, addComment, dishId}){
    if(comments == null){
        return(
            <div></div>
        )
    }
    const cmnts = comments.map(comment=>{
        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>--{comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'2-digit'
                }).format(new Date(comment.date))}
                </p>
            </li>
        )
    })
    return(
        <div className='col-12 cold-md-5 m-1'>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {cmnts}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    )
}

  const DishDetails = (props) => {
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) 
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
              <div className="col-12 col-md-5 ml-1">
                <RenderDish dish={props.dish}/>
              </div>
              <div className="col-12 col-md-5 ml-1">
              <RenderComments comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}/>
              </div>
            </div>
          </div>
        );
    else
        return(   
          <div></div>
        );
  }

export default DishDetails;