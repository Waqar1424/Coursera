import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron} from 'reactstrap';


class Header extends Component {
  render() {
    return(
        <React.Fragment>        
        <div>
           <Navbar dark expand="md">
             <div className="container">
            <NavbarBrand className='mr-auto' href="/">
              <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
            </NavbarBrand>
            </div>
        </Navbar>
       
        </div>
        </React.Fragment>
    );
  }
}

export default Header;