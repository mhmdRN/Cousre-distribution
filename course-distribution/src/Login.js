
import {Icon} from 'semantic-ui-react'
import  { useEffect, useState } from 'react'
import axios from 'axios'
import cookie from "js-cookies"
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const INITIAL_USER={
  Email:"",
  password:""
}
const Login = () => {
  const [user,setUser]=useState(INITIAL_USER);
      const [disabled,setDisabled]=useState(false);
      useEffect(()=>{
        const isuser=Object.values(user).every(el=>Boolean(el));
        isuser?setDisabled(false) : setDisabled(true);
      });
      const [Loading,setLoading]=useState(false);
      const handleChange=(e)=>{
        const {name,value}=e.target;
        setUser(prevstate=>({...prevstate,[name]:value}))
        console.log(user);
      }
  
      const handlelogin=(token)=>{
          cookie.setItem('token',token);
          window.location.href="/distributions"
          }
  
      const handleSubmit=async(e)=>{
          e.preventDefault();
        try{
            setLoading(true);
            const payload={...user};
            const res=await axios.post("http://localhost:4000/",payload);
            handlelogin(res.data);
            setLoading(false)
        }catch(err){
          alert("Please enter a valid account !!")
          setLoading(false)
        }
      }
    
    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link target="_blank" color="inherit" href="https://www.ul.edu.lb/faculte/faculties.aspx">
                Lebanese University 
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        );
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: 'url(https://media-exp1.licdn.com/dms/image/C561BAQGPwXzf4VJ3FQ/company-background_10000/0/1567058449070?e=2159024400&v=beta&t=cTkNrc_5eOxk98-FeX5tdVkgA5p1aP-hGIhwQL8TuIo)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));


    const classes = useStyles();




    return (  
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <h1>Emial: Admin@gmail.com</h1>
            <h1>Password : 03234376x</h1>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                       <Icon name="lock" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="Email"
                            onChange={handleChange}
                              value={user.Email}
                            autoComplete="email"
                        autoFocus
                        />    
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                             onChange={handleChange}
                           value={user.password}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                       
                        <Button
                            type="submit"
                            onClick={handleSubmit} loading={Loading}
                            disabled={disabled || Loading}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                      
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
      </Grid>


    );
}
 
export default Login;
