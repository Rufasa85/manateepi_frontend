import React, { Component } from 'react'
import axios from "axios";
import Secret from './components/Secret';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ManateeForm from './components/ManateeForm';
import Manatee from './components/Manatee';

export default class App extends Component {
  state = {
    name:"",
    password:"",
    loggedInUser:"",
    manateeName:"",
    // url:"http://localhost:8080",
    url:"https://manateepi.herokuapp.com",
    manatees:[]
  }
  componentDidMount(){
    this.readSessions();
    this.getAllManatees();
  }

  handleChange= event=>{
    const {name,value}=event.target;
    this.setState({
      [name]:value
    })
  }

  readSessions = ()=>{
    axios.get(`${this.state.url}/auth/readsessions`,{withCredentials:true}).then(res=>{
      console.log(res.data)
      this.setState({loggedInUser:res.data.user})
    })
  }
  
  getAllManatees = ()=>{
    axios.get(`${this.state.url}/manatee`,{withCredentials:true}).then(res=>{
      this.setState({
        manatees:res.data
      })
    }).catch(err=>{
      console.log(err.response);
    })
  }

  handleLoginFormSubmit = event=>{
    if(event){

      event.preventDefault();
    }
    axios.post(`${this.state.url}/auth/login`,{name:this.state.name,password:this.state.password},{withCredentials:true}).then(res=>{
      console.log(res.data,res.status)
      this.setState({
        name:"",
        password:"",
        loggedInUser:res.data.user
      });
      this.getAllManatees();
    }).catch(err=>{
      console.log(err.response);
      this.setState({
        name:"",
        password:"",
        loggedInUser:""
      })
    })
  }
  handleSignupFormSubmit = event=>{
    event.preventDefault();
    axios.post(`${this.state.url}/auth/signup`,{name:this.state.name,password:this.state.password},{withCredentials:true}).then(res=>{
      console.log(res.data,res.status)
      this.handleLoginFormSubmit();
    }).catch(err=>{
      console.log(err.response);
    })
  }
  handleManateeCreate=event=>{
    event.preventDefault();
    axios.post(`${this.state.url}/manatee`,{manateeName:this.state.manateeName},{withCredentials:true}).then(res=>{
      this.setState({
        manateeName:""
      })
      this.getAllManatees();
    }).catch(err=>{
      console.log(err.response);
    })
  }

  render() {
    return (
      <div>
       <LoginForm name={this.state.name} password={this.state.password}handleChange={this.handleChange} handleLoginFormSubmit={this.handleLoginFormSubmit}/>
       <SignUpForm name={this.state.name} password={this.state.password}handleChange={this.handleChange} handleSignupFormSubmit={this.handleSignupFormSubmit}/>
        {this.state.loggedInUser?(
          <div>
            <Secret name={this.state.loggedInUser.name}/>
            <ManateeForm manateeName={this.state.manateeName} handleChange={this.handleChange} handleManateeCreate={this.handleManateeCreate}/>
            <h5>All the manatees!</h5>
            {this.state.manatees.map(tee=><Manatee key={tee.id}name={tee.name}/>)}
          </div>
          ):(null)}
        <button onClick={this.readSessions}>Readsessions</button>
      </div>
    )
  }
}
