import React, { useEffect, useState } from 'react'
import { Button, Form, Icon, Message, Segment,Container } from 'semantic-ui-react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import cookie from 'js-cookies';

const INITIAL_USER={
    Fname:"",
    Email:"",
    phone_Number:"",
    File_Number:"",
    Lname:"",
    Mname:"",
    Rank:"",
    Contract_Type:"",
    Email:"",
    password:""
  }
const Signup = () => {
               
  const [user,setUser]=useState(INITIAL_USER);
  const [disabled,setDisabled]=useState(false);
  const [Loading,setLoading]=useState(false);

  useEffect(()=>{
    const isuser=Object.values(user).every(el=>Boolean(el));
    isuser?setDisabled(false) : setDisabled(true);
  });
  
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
        const payload={...user}
        const res=await axios.post( "http://localhost:4000/signup",payload);
        console.log(res.data);
        handlelogin(res.data)
      }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false); 
    }
  }

    return (
        <Container text>
    <Message 
    attached
    header="Get Started !"
    icon="settings"
    content="Create a new account"
    color="teal"
    />
    <Form onSubmit={handleSubmit} loading={Loading}>
      <Segment>
        <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="First name"
        placeholder="Name"
        name="Fname"
        onChange={handleChange}
        value={user.Fname}
        />
       
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Middle name"
        placeholder="Middle name"
        name="Mname"
        onChange={handleChange}
        value={user.Mname}
        />
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Last name"
        placeholder="Name"
        name="Lname"
        onChange={handleChange}
        value={user.Lname}
        />
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Name"
        placeholder="Phone"
        name="phone_Number"
        onChange={handleChange}
        value={user.phone_Number}
        />
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="File Number"
        placeholder="File Number"
        name="File_Number"
        onChange={handleChange}
        value={user.File_Number}
        />
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Rank"
        placeholder="Rank"
        name="Rank"
        onChange={handleChange}
        value={user.Rank}
        />
            <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Contract Type"
        placeholder="Contract Type"
        name="Contract_Type"
        onChange={handleChange}
        value={user.Contract_Type}
        />
       
         <Form.Input 
        fluid
        icon="envelope"
        iconPosition="left"
        label="Email"
        placeholder="Email"
        type="email"
        name="Email"
        onChange={handleChange}
        value={user.Email}
        />
        <Form.Input 
        fluid
        type="password"
        icon="lock"
        iconPosition="left"
        label="Password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={user.password}
        />
         <Button
        icon="signup"
        type="submit"
        color="orange"
        content="Signup"
        disabled={disabled || Loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
      Existing user?{" "}
      <Link href="/login">
        <a>Log in here</a>
      </Link>{" "}instead
    </Message>
        </Container>
    );
};

export default Signup;