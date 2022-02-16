import React, { Component } from 'react';
import Header from './HeaderCompnents';
import Footer from './FooterComponent';
import Home from './HomeComponents';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Redirect, Route, Switch } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
        
        
    };
  }

 


  render() {
    const DishWithId = ({match}) =>{
      return(
          <DishDetail  dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                      comments={this.state.comments.filter((commment) => commment.id === parseInt(match.params.dishId,10))[0]}
                      // comments={this.state.comments}
                       />
      );
    };
    const Homepage =() => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
 
    return (
      <div>      
      <Header/>
      <Switch>
        <Route path='/home' component={Homepage}/>
        <Route path='/aboutus' component={() => <About leader={this.state.leaders}/>}/>
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Route exact path="/contactus" component={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default Main;
