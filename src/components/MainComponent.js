import React, { Component } from 'react';
import Header from './HeaderCompnents';
import Footer from './FooterComponent';
import Home from './HomeComponents';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component {

  constructor(props) {
    super(props);
  }


 


  render() {
    const DishWithId = ({match}) =>{
      return(
          <DishDetail  dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                      comments={this.props.comments.filter((commment) => commment.id === parseInt(match.params.dishId,10))[0]}
                      // comments={this.state.comments}
                       />
      );
    };
    const Homepage =() => {
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
 
    return (
      <div>      
      <Header/>
      <Switch>
        <Route path='/home' component={Homepage}/>
        <Route path='/aboutus' component={() => <About leader={this.props.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Route exact path="/contactus" component={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
