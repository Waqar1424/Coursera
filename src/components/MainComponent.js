import React, { Component } from 'react';
import Header from './HeaderCompnents';
import Footer from './FooterComponent';
import Home from './HomeComponents';
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

  onDishSelect(dishId){
    this.setState({ selectedDish : dishId});
}



  render() {
    const Homepage =() => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }
    return (
      <div>      
      {/* <Navbar dark>
        <div className="container" >
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar> */}
      <Header/>
      <Switch>
        <Route path='/home' component={Homepage}/>
        <Route path="/menu" component={() => <Menu dishes={this.state.dishes}/>}/>
        <Route path="/contactus" component={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default Main;
