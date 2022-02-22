import react, {Component} from "react";
import { Button,Modal, ModalHeader, ModalBody,Label, Row, Col} from "reactstrap";
import {Control, LocalForm, Errors} from 'react-redux-form';

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
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModel();
    }

    render(){
        return(
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
                        <Label htmlFor="customerName" md={3}>Your Name</Label>
                        <Col md={12}>
                        <Control.text model=".customerName" id="customerName" name="customerName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                         <Errors
                                        className="text-danger"
                                        model=".customerName"
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
                <Label htmlFor="message" md={4}>Your Feedback</Label>
                    <Col md={12}>
                        <Control.textarea model=".message" id="message" name="message"
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

export default CommentForm;