import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Link} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import menlog from '../Images/menlog.jpg';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import TextField from '@material-ui/core/TextField';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import {Redirect} from 'react-router-dom'



const styles = theme => ({

    container:{
        width: "80%",
        height: "80%",
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
        marginTop:"40px",
        alignItems: 'center',   
      },

      button:{
            left: "80px",
            marginTop:"40px",
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #6bfe7c 30%, #53ffcb 90%)',
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
            padding: theme.spacing(2),
            margin: 'auto',
            height:'auto',
            maxWidth: 800,
           
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
class Login extends Component {
    constructor(props){
        super(props)
        console.log(props)

        const token = localStorage.getItem('Token')
        let LoggedIn = true
        if(token == null){
          LoggedIn = false
        }

        this.state = { 
            Phone : "",
            Password:'',
            Name:"",
            Area:"",
            Email:"",
            State:"",
            City:"",
            Picture: null,
            LoggedIn      
        }
    }

    check = () => {
        NotificationManager.error('Error message', 'Click me!', 2000, () => {
            alert('callback');
          });
          return
    }

    AuthUser = (e) => {
       
      
        if(! this.state.Password || !this.state.Phone ){
            NotificationManager.warning('Please Enter Phone and Password', 'Warning', 2000)
            return false;
        }
        if(!this.state.Phone){
            NotificationManager.error('Invalid Phone', 'Error', 2000)
            return   
        }
        if(! this.state.Password || this.state.Password.length <5){
            NotificationManager.error('invalid Password', 'Error', 2000)
            return false;
        }

        axios.post('your Api', {
          phone: this.state.Phone.toString(),
          password: this.state.Password
        })
        .then((resp)=>{
            if(resp.success === false){
            }
            else{
              const token = resp.data.data.items[0]


              // ------------Local Storage--------------

              localStorage.setItem('Token', token)

              let newUser = {
                Name: this.state.Name,
                Phone: this.state.Phone,
                Area: this.state.Area,
                State: this.state.State,
                City: this.state.City,
              }
              let oldData = localStorage.getItem("data");
              if(oldData){
                  oldData = JSON.parse(oldData);
                  oldData.push(newUser)
             } 
              else
                oldData = [newUser]
                localStorage.setItem("data",JSON.stringify(oldData))

                // -----------------------------------------
           
              this.props.history.push({pathname : '/home',
                                Phone : this.state.Phone,
                                Name : this.state.Name,
                                Area : this.state.Area,
                                State : this.state.State,
                                City : this.state.City,
                                Picture : this.state.Picture
                              })   
                          }
                    }, 
          
          (err)=>{
            NotificationManager.error("Invalid Phone no. and Password", 'Error', 2000);
              console.log("ERROR Fail", err) })
          }

      


          
                
     
    render()

     {const { classes } = this.props;
     if(this.state.LoggedIn){
       return <Redirect to="/home" />
     }



        return (
            <div className={classes.container}>
               
                <div className={classes.root}>
                <NotificationContainer/>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={menlog} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" style={{ alignItems: 'center',
                                justifyContent: 'center',}} spacing={2}>
                                <Grid item xs>             
                                              <div style={{marginTop:"25%"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <PersonOutlineIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="Phone" 
                                                            type="text" value={this.state.Phone} 
                                                            onChange={(e)=> this.setState({Phone : e.target.value})} 
                                                            label="Phone" />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div style={{marginTop:"10px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <LockOpenIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="Password" 
                                                            type="password" label="Password" 
                                                            value={this.state.Password} 
                                                            onChange={(e)=> this.setState({Password : e.target.value})} />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                      <Button className={classes.button} 
                                                              onClick={this.AuthUser}>
                                                        <b>Login</b>
                                                </Button>  
                                                <Typography className={classes.marginSignup} component={'p'} >
                                                     Don't have account ? &nbsp; 
                                                         <Link style={{color:"#54C346"}} to="/signup"> 
                                                            SignUp
                                                         </Link> 
                                                    
                                           </Typography>         
                                      </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </div>  
        );
    }
}


export default withStyles(styles, { withTheme: true })(Login) ;
 
