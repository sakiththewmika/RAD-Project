import React, { Component } from 'react';
import "./NavBarStyles.css";

class NavBar extends Component{
    state={clicked:false};
    handleClick=()=>{
        this.setState({clicked:!this.state.clicked})
    }
    render(){
    return(
        <div>
        <nav>
            <div id='div1'>
            <a href=''><img src='./assets/icon.svg'/></a>
            <a href='' style={{fontWeight:'bolder'}}>ABCD</a>
            </div>
            
            <div>
                <ul id='navbar' className={this.state.clicked?"#navbar active":"#navbar"}>
                    <li><a href='h' className='active'>About Us</a></li>
                    <li><a href='h0'>Services</a></li>
                    <li><a href='h1'>FAQ</a></li>
                    
                </ul>
            </div>
            <div>
            <i class="bi bi-bag-fill" id='bag' ></i>
            </div>
            <div id='mobile' onClick={this.handleClick}>
                <i id='bar'
                className={this.state.clicked?"bi bi-x-lg":"bi bi-list"}>

                </i>
                
                
            {/* <i className="bi bi-list"></i> */}
            {/* <i className="bi bi-x-lg"></i> */}
            </div>
        </nav>
        </div>
    )
}
}
export default NavBar;