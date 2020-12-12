import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import axios from 'axios';



const styles = theme => ({
 
    container:{
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
      GridView:{
        flex:1,
      },
      login_img:{
        height: "100%",
        width: "100%",
      },
      login_comp:{
        height: "100%",
        width: "100%",
        color: theme.palette.text.secondary,

      },
      marginUser: {
        display: 'flex',
        position: "absolute",
        top: "40%",
        left: "20%",
        transform: "translate(-50%, -50%)" 
      },
      marginPass: {
        display: 'flex',
        position: "absolute",
        top: "50%",
        left: "20%",
        transform: "translate(-50%, -50%)" 
      },
      marginSignup: {
        left: "100px",
        marginTop:"30px",
        alignItems: 'center',    
      },
      button:{
            left: "80px",
            marginTop:"20px",
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #37FF48 30%, #37FFBC  90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
          },
          root: {
            flexGrow: 1,
          },
          paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            marginTop:"10%",
            marginBottom:"10%",
            height:'600px',
            maxWidth: 300,    
          },
          image: {
            width: 400,
            height: 400,
          },
          img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
          },
  });

class Home extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem('Token')
        let LoggedIn = true
        if(token == null){
          LoggedIn = false
        }


        this.state = { 
            Name:props.location.Name,
            Area:props.location.Area,
            Email:"",
            Password:'',
            Phone:props.location.Phone,
            State:props.location.State,
            City:props.location.City,
            pictures: props.location.picture,
            LoggedIn
        }


        const UItems = localStorage.getItem('data');
        let JItems = JSON.parse(UItems);
        for (let i =0 ; i < JItems;  i ++){
          this.state.Name = JItems[i].Name;
          this.state.Phone = JItems[i].Phone;
          this.state.City = JItems[i].City;
          this.state.Area = JItems[i].Area;
          this.state.State = JItems[i].State;   
        }
        this.onDrop = this.onDrop.bind(this);
      }

    onDrop(picture) {
        this.setState({
            pictures: picture[0],
        });
    }


    GetInfo () {
      axios.get('http://clientapps.webhopers.com:3333/api/app/user', {
        params: {
          Name : this.setState.Name
        }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });     
    }


    Logout = (e) => {
      localStorage.removeItem("Token");
      localStorage.removeItem("data");
      this.props.history.push({pathname : '/login',})
    }

    render()
          {
            const { classes } = this.props;

          if (this.state.LoggedIn === false){
            return <Redirect to='/login'/>
          }

        return (
            <div className={classes.container}>
             <div className={classes.root}>
                <NotificationContainer/>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" style={{ alignItems: 'center',
                                        justifyContent: 'center',}} spacing={2}>
                                      <PersonOutlineIcon style={{fontSize:"100px", color:"green"}}/>
                                      <h1 style={{color:"#008659 "}}>{this.state.Name}</h1>
                                      <p>  
                                        <span style={{color:"#006B47 ", fontSize:"18px"}}>Phone :</span> 
                                        <span style={{color:"#5B5B5B"}}> {this.state.Phone}</span>
                                      </p>
                                      <p>  
                                        <span style={{color:"#006B47 ", fontSize:"18px"}}>Area :</span>
                                        <span style={{color:"#5B5B5B"}}> {this.state.Area}</span>
                                      </p>
                                      <p>  
                                        <span style={{color:"#006B47 ", fontSize:"18px"}}>State :</span> 
                                        <span style={{color:"#5B5B5B"}}> {this.state.State}</span>
                                      </p>
                                      <p>  
                                        <span style={{color:"#006B47 ", fontSize:"18px"}}>City :</span> 
                                        <span style={{color:"#5B5B5B"}}> {this.state.City}</span>
                                      </p>
                                      <Button onClick={this.Logout} variant="contained" color="secondary"><b>Logout</b></Button>                       
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>  
        );
     }
  }
 
export default withStyles(styles, { withTheme: true })(Home);