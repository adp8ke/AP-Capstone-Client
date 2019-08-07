import React from 'react';
import './App.css';
import Header from '../Header/Header'
import {Route, Switch} from 'react-router-dom'
import LandingPage from '../../routes/LandingPage/LandingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import ParkPage from '../../routes/ParkPage/ParkPage'
import ParkListPage from '../../routes/ParkListPage/ParkListPage'
import FavoritesPage from '../../routes/FavoritesPage/FavoritesPage'
import TokenService from '../../services/token-service'
import config from '../../config'
import ParksContext from '../../context/ParksContext'
import {withRouter} from 'react-router'

class App extends React.Component{

  state = {
    loggedIn: null,
    parks: [],
    search: '',
    favorites: []
  }

  handleSearchSubmit = e =>{

    e.preventDefault()

    const url = `${config.API_ENDPOINT}/parks?search=${this.state.search}`
    

    fetch(url)
        .then(res=>{
            if(!res.ok){
                throw new Error(res.statusText)
            }
            return res.json()
        })
        .then(data=>{
            console.log(data)
            this.setState({
                parks: data,
            },
            ()=>this.props.history.push('parks')
            )
            console.log(this.state.parks)
  
        })
        .catch(err=>{
            console.error(err)
        })
        .then(()=>{
          this.setState({
            search: ''
          })
        })
        .catch(err=>{
          console.error(err)
      })
}

  handleLoginSuccess = () => {

    this.setState({
      loggedIn: true
    })

    this.props.history.goBack()
    
}

handleLogoutClick = () => {
  TokenService.clearAuthToken()
  this.setState({
    loggedIn: false
  })
};

setSearch = search => {
  this.setState({
    search,
  })
}

getFavorites = () =>{

  fetch(`${config.API_ENDPOINT}/favorites`)
    .then(res=>{
      if(res.ok){
        return res.json()
      }
      throw new Error(res.statusText)
    })
    .then(resJson =>{
      this.setState({
        favorites: resJson
      })
    })
    .catch(error =>{
      console.log(error)
    })
    // .then(()=>{
    //   const {userId} = this.state.favorites
    // })
  }



  render(){
    return(
      <ParksContext.Provider
        value={{
          parks: this.state.parks,
          loggedIn: this.state.loggedIn,
          search: this.state.search,
          setSearch: this.setSearch,
          onLoginSuccess: this.handleLoginSuccess,
          handleLogoutClick: this.handleLogoutClick,
          handleSearchSubmit: this.handleSearchSubmit,
          favorites: this.state.favorites,
          getFavorites: this.getFavorites
        }}
        >
      <div className="App">
        <header>
          <Header {...this.props}/>
        </header>
        <main>
          <Switch>
            <Route exact path ={'/'} render={props=> <LandingPage {...props}/>}/>
            <Route path={'/login'} component={LoginPage}/>
            <Route path ={'/register'} component={RegistrationPage}/>
            <Route exact path ={'/parks'} component={ParkListPage}/>
            <Route path={'/parks/:parkId'} render={props=> <ParkPage {...props}/>}/>
            <Route path={'/favorites'} render={props=> <FavoritesPage {...props}/>}/>
          </Switch>
        </main>

      </div>
      </ParksContext.Provider>
    )
  }
}

export default withRouter(App);
