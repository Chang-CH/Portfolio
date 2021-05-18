import React, { Component } from 'react'
import { connect } from 'react-redux'
import { log_out_user } from '../actions/login.action'
import '../styles/navbar.css'
import axios from 'axios'
import { Typography, Button } from '@material-ui/core'


class Navbar extends Component {
    constructor() {
        super()
        this.handleLogout = this.handleLogout.bind(this)
    }
    
    handleLogout() {
        console.log("logging out")
        this.props.dispatch(log_out_user())
        axios({
            method: 'GET',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then(res => {
            console.log("successfully deleted cookie")
            console.log(res)
        }).then(
            //window.location.pathname = '/login'
        )
        
    }
    

    render() {
        const { loggedIn, name, id, avatar_url, gravatar_url, error } = this.props
        
        if (error) {
            return <div>Error! {error.message}</div>
        }

        return (
            <div className = 'navbar-container'>
                <div className = 'navbar-title-container'>
                    <Typography align = 'center' variant = 'h1' color = 'textPrimary'>Portfol.io</Typography>
                </div>
                <div className = 'navbar-text-container'>
                    <Typography align = 'center' variant = 'h3' color = 'textPrimary'>Welcome {name}!</Typography>
                </div>
                <div className = 'navbar-button-container'>
                    {loggedIn 
                        ? <button onClick = {this.handleLogout} className = 'navbar-button'>
                            logout
                        </button>
                        : <span></span>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
    name: state.login.name,
    id: state.login.id,
    avatar_url: state.login.avatar_url,
    gravatar_url: state.login.gravatar_url,
    error: state.login.error
})

export default connect(mapStateToProps)(Navbar)
