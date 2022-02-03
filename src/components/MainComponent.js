import React, { Component } from 'react';
import Header from './HeaderCompnents';
import Footer from './FooterComponent';
import Home from './HomeComponents';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { Redirect, Route, Switch } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
        
    };
  }

  onDishSelect(dishId){
    this.setState({ selectedDish : dishId});
}



  render() {
    const Homepage =() => {
      return(
        <Home/>
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
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
      </div>
    );
  }
}

export default Main;
