import React from "react";
import { Link } from "react-router-dom";
import ParksContext from '../../context/ParksContext'
import TokenService from "../../services/token-service";

export default class Header extends React.Component {

  static contextType = ParksContext

  // renderLogoutLink(){
  //   return (
  //     <div>
  //       <div>
  //         <Link to={`/favorites`}>Favorites</Link>
  //       </div>

  //       <div>
  //         <Link to="/" onClick={this.context.handleLogoutClick}>
  //           Logout
  //         </Link>
  //       </div>
  //     </div>
  // }

  // renderLoginLink(){

  // }


  handleIfLoggedIn = () => {
    if(TokenService.hasAuthToken()){
      return (
        <div>
          <div>
            <Link to={`/favorites`}>Favorites</Link>
          </div>
  
          <div>
            <Link to="/" onClick={this.context.handleLogoutClick}>
              Logout
            </Link>
          </div>
        </div>
      )
    }
    else{
      return (
        <div>
          <div>
            <Link to="/register">Register</Link>
          </div>
  
          <div>
            <Link to="/Login">Login</Link>
          </div>
        </div>
      );
    }
  }

  // handleIfLoggedIn = () => {
    
  //   if(this.context.loggedIn === true){
  //     return (
  //       <div>
  //         <div>
  //           <Link to={`/favorites`}>Favorites</Link>
  //         </div>
  
  //         <div>
  //           <Link to="/" onClick={this.context.handleLogoutClick}>
  //             Logout
  //           </Link>
  //         </div>
  //       </div>
  //     ); 
  //   }
  //   else{
  //     return (
  //       <div>
  //         <div>
  //           <Link to="/register">Register</Link>
  //         </div>
  
  //         <div>
  //           <Link to="/Login">Login</Link>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <nav>
        <h1>
          <Link to="/">Release Me Human!</Link>
        </h1>
        {this.handleIfLoggedIn()}
      </nav>
    );
  }
}
