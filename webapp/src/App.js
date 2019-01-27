import React, { Component } from 'react';
import {NavLink, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
import {Employees} from "./Employees";
import {Suppliers} from "./Suppliers";
import {Test} from "./Test";
import bg from "./bg.svg";

class App extends Component {
  constructor(){
    super();
    this.state={
      isLoggedin:false
    }
  }

 componentDidMount(){
  localStorage.getItem("owner")&&this.setState({isLoggedin:true});
 }
  render() {
    return (
      <div style={{
        width:"100%",
        height:"100vh",
      
      }} className="App">
        <div style={{width:"100%", height:"100%", position:"absolute", zIndex:-99, overflow:"hidden", textAlign:"center", opacity:"0.2"}}><img style={{height:"100%"}} src={bg}/></div>
        {!this.state.isLoggedin?
        <Switch>
          <Redirect to="/login"/>
        </Switch>:
        <div style={{display:"flex", width:"calc(100% - 40px)", justifyContent:"space-between", padding:"20px", color:"white", backgroundColor:"#03a9f4"}}>
          <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/employees">Employees</NavLink>
          <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/suppliers">Suppliers</NavLink>
          <NavLink style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} to="/test">Test</NavLink>

          <div style={{color:"white", textDecoration:"none", cursor:"pointer", fontWeight:"bold"}} onClick={()=>{this.setState({isLoggedin:false}); localStorage.clear()}}>Logout</div>
        </div>
        }
        <Switch>
          <Route exact path="/login" render={()=><Login loggedIn={this.state.isLoggedin} loginSuccess={(d)=>{this.setState({isLoggedin:true, owner:d})}}/>}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/employees" render={()=><Employees owner={this.state.owner}/>}/>
          <Route exact path="/suppliers" render={()=><Suppliers owner={this.state.owner}/>}/>
          <Route exact path="/test" render={()=><Test />}/>
        </Switch>

        
      </div>
    );
  }
}

export default App;
