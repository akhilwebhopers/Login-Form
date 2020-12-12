import React, { Component } from 'react';
import {Link} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonPinCircleOutlinedIcon from '@material-ui/icons/PersonPinCircleOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import NativeSelect from '@material-ui/core/NativeSelect';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ImageUploader from 'react-images-upload';


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
            height:'auto',
            maxWidth: 500,    
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

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = { 
            Name:"",
            Area:"",
            Email:"",
            Password:'',
            Phone:"",
            State:"",
            City:"",
            pictures: null
        }
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: picture[0],
        });
    }

     AuthUser = () => {

       
        const reg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
        const regAlpha = /^[a-zA-Z]+$/

        
        if(!this.state.Name ){
            NotificationManager.info('Please Enter your Name', 'Info', 2000);
            return false;
        }
        else if(this.state.Name.length <= 3 ){
            NotificationManager.error('Name should be More than 3 characters', 'Error', 2000);
            return false;
        }

        else if(!this.state.Email ){
            NotificationManager.info('Please Enter Email', 'Error', 2000);
            return false;
        }

        else if( reg.test(this.state.Email) === false){
            NotificationManager.error('Invalid Email', 'Error', 2000);
            return false;
        }
        else if(! this.state.Phone){
            NotificationManager.info('Please Enter your Phone Number', 'Info', 2000);
            return false;
        }
        else if(this.state.Phone.length <=9 || this.state.Phone.length >12 ){
            NotificationManager.error('Invalid Phone Number', 'Error', 2000);
            return false;
        }

        else if(! this.state.Password){
            NotificationManager.info('Please Enter your Password', 'Info', 2000);
            return false;
        }

        else if(this.state.Password.length <5 ){
            NotificationManager.error('Password Should be more than 5 characters', 'error', 2000);
            return false;
        }

        else if(! this.state.Area){
            NotificationManager.info('Please Enter your Area', 'Info', 2000);
            return false;
        }

        else if(this.state.Area.length <=3 || regAlpha.test(this.state.Area) === false ){
            NotificationManager.error('Please Enter Valid Area Name', 'error', 2000);
            return false;
        }

        else if(! this.state.City){
            NotificationManager.info('Please Select your City', 'Info', 2000);
            return false;
        }
        else if(! this.state.State){
            NotificationManager.info('Please Select your State', 'Info', 2000);
            return false;
        }
        else if(! this.state.pictures){
            NotificationManager.info('Please Upload the Image', 'Info', 2000);
            return false;
        }

        
        let data = new FormData();
        data.append('name', this.state.Name)
        data.append('phone', (this.state.Phone).toString())
        data.append('area', (this.state.Area).toString())
        data.append('password', (this.state.Password).toString())
        data.append('image', this.state.pictures)
        data.append('state', (this.state.State).toString())
        data.append('city', (this.state.City).toString())


        // ----------------------API------------------------------

        fetch ('http://clientapps.webhopers.com:3333/api/app/user',{
            method: 'PUT',
            body: data
        })
        .then((result)=> result.json())
            .then((resp)=>{

                if(resp.success === false){
                    NotificationManager.error(resp.message, 'Error', 2000);
                }
                else{
                    NotificationManager.success("Successfully registered", '', 2000);
                    this.props.history.push({pathname : '/login',})   
                }
                }, (err)=>{
                    console.log("ERROR", err)
                })
        // ---------------------------------------------------------
    }
    
    render()
     {     const { classes } = this.props;
        return (
            <div className={classes.container}>
             <div className={classes.root}>
                <NotificationContainer/>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" style={{ alignItems: 'center',
                                        justifyContent: 'center',}} spacing={2}>
                                        <Grid item xs>

                                              {/* -----------------NAME-------------  */}

                                         <Typography style={{color:"#00B97B "}} component={'h2'} variant={'body2'}>SignUp Now !</Typography>
                                                <div style={{marginTop:"5px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <PersonOutlineIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="input-with-icon-grid_1" 
                                                            type="text" value={this.state.Name} 
                                                            onChange={(e)=> this.setState({Name : e.target.value})} 
                                                            label="Name"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                               { /* ------------------Email------------ */}

                                                <div style={{marginTop:"3px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <EmailOutlinedIcon/>
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="input-with-icon-grid_2" 
                                                            type="text" value={this.state.Email} 
                                                            onChange={(e)=> this.setState({Email : e.target.value})} 
                                                            label="Email" />
                                                        </Grid>
                                                    </Grid>

                                                {/* ------------------Phone NO------------ */}

                                                </div> <div style={{marginTop:"3px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <PhoneIphoneOutlinedIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="input-with-icon-grid_3" 
                                                            type="number" value={this.state.Phone} 
                                                            onChange={(e)=> this.setState({Phone : e.target.value})} 
                                                            label="Phone" />
                                                        </Grid>
                                                    </Grid>


                                                {/* -----------------Password------------ */}

                                                </div> <div style={{marginTop:"3px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <LockOpenIcon />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField id="input-with-icon-grid_4" 
                                                            type="text" value={this.state.Password} 
                                                            onChange={(e)=> this.setState({Password : e.target.value})} 
                                                            label="Password" />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                
                                                {/* ------------------Area------------ */}
                                                
                                                <div style={{marginTop:"3px"}}>
                                                <Grid container spacing={1} alignItems="flex-end">
                                                    <Grid item>
                                                        <PersonPinCircleOutlinedIcon  />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField id="input-with-icon-grid_5" 
                                                        type="text" value={this.state.Area} 
                                                        onChange={(e)=> this.setState({Area : e.target.value})} 
                                                        label="Area" />
                                                    </Grid>
                                                </Grid>
                                                </div> 

                                                {/* ------------------City------------ */}

                                                <div style={{marginTop:"15px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <LocationCityOutlinedIcon  />
                                                        </Grid>
                                                        <Grid item>
                                                        <NativeSelect
                                                            value={this.state.City}
                                                            onChange={(e)=> this.setState({City : e.target.value})}
                                                            name="City"
                                                            style={{minWidth: 200}}
                                                            className={classes.selectEmpty}
                                                            inputProps={{ 'aria-label': 'City' }}
                                                            >
                                                            <option value="">City</option>
                                                            <option value="Bengaluru">Bengaluru</option>
                                                            <option value= "Delhi"> Delhi</option>
                                                            <option value="Lucknow">Lucknow</option>
                                                            <option value="Mumbai">	Mumbai</option>
                                                            <option value= "Jaipur"> Jaipur</option>
                                                            <option value="Mohali">Punjab</option>
                                                            </NativeSelect>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                {/* ------------------State------------ */}

                                                <div style={{marginTop:"15px"}}>
                                                    <Grid container spacing={1} alignItems="flex-end">
                                                        <Grid item>
                                                            <ExploreOutlinedIcon />
                                                        </Grid>
                                                        <Grid item>
                                                        <NativeSelect
                                                            value={this.state.State}
                                                            onChange={(e)=> this.setState({State : e.target.value})}
                                                            name="State"
                                                            style={{minWidth: 200}}
                                                            className={classes.selectEmpty}
                                                            inputProps={{ 'aria-label': 'State' }}
                                                            >
                                                            <option value="">State</option>
                                                            <option value="Punjab">Punjab</option>
                                                            <option value= "Maharashtra">Maharashtra</option>
                                                            <option value="Rajasthan">	Rajasthan</option>
                                                            <option value= "Haryana"> Haryana</option>
                                                            <option value="Delhi">Delhi</option>
                                                            </NativeSelect>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                
                                                {/* ----------------Image------------------- */}

                                                <ImageUploader
                                                        withIcon={true}
                                                        buttonText='Choose images'
                                                        onChange={this.onDrop}
                                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                        maxFileSize={5242880}
                                                    />

                                                 {/* ------------------Button------------ */}

                                                <Button className={classes.button} 
                                                    onClick={this.AuthUser}>
                                                        <b>Register</b>
                                                </Button>  
                                                    <p className={classes.marginSignup}>Already have an account ? &nbsp; 
                                                         <Link style={{color:"#54C346"}} to="/login"> 
                                                            Login
                                                         </Link> 
                                                    </p> 
                                            </Grid>
                                        <Grid item>
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
 
export default withStyles(styles, { withTheme: true })(Signup);