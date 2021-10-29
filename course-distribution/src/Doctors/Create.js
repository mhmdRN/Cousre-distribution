import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon, Input } from "semantic-ui-react";
import axios from "axios";
import {Link,useHistory} from 'react-router-dom';
//import { Helmet } from 'react-helmet';

const CREATE_DOCTOR = {
  Fname: "",
  Email: "",
  phone_Number: "",
  File_Number: 0,
  Lname: "",
  Mname: "",
  Rank: "",
  Contract_Type: "",
};
const Create = () => {
  const [create_doc, set_create_doc] = useState(CREATE_DOCTOR);
  const [Loading,setLoading]=useState(false);
  const history=useHistory();
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e);
    set_create_doc((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    setLoading(true);
     axios.post("http://localhost:4000/doctors/create", create_doc)
     .then(res=>{
       window.location.href='/doctors';
     })
     .catch(err=>{
       alert("File number already exists ");
     })
     setLoading(false);
   
     
  };
  return (
   
      <Container>
        <Form onSubmit={handleSubmit} loading={Loading}>
          <Form.Group widths="equal">
            <Form.Field value={CREATE_DOCTOR.Fname}>
              <label>First Name</label>
              <Input
                required
                placeholder="First Name"
                name="Fname"
                onChange={handleInput}

              />
            </Form.Field>

            <Form.Field value={CREATE_DOCTOR.Mname}>
              <label> Middle Name</label>
              <Input
                required
                name="Mname"
                onChange={handleInput}
                placeholder="Middle Name"
              />
            </Form.Field>

            <Form.Field value={CREATE_DOCTOR.Lname}>
              <label>Last Name:</label>
              <Input
                required
                placeholder="Last Name"
                name="Lname"
                onChange={handleInput}
              />
            </Form.Field>
          </Form.Group>
          <Divider section/>
          <Form.Group widths="3">
            <Form.Field value={CREATE_DOCTOR.Email}>
              <label>Email</label>
              <Input
                required
                type="email"
                control={Input}
                placeholder="Email"
                name="Email"
                onChange={handleInput}
              />
            </Form.Field>
            <Form.Field value={CREATE_DOCTOR.phone_Number}>
              <label>Phone Number</label>
              <Input
                required
                align="center"
                width="4"
                placeholder="Phone Number"
                name="phone_Number"
                onChange={handleInput}
              />
            </Form.Field>

            <Form.Field value={CREATE_DOCTOR.File_Number}>
              <label>File Number</label>
              <Input
                required
                type="number"
                name="File_Number"
                onChange={handleInput}
                width="4"
                placeholder="File Number"
              />
            </Form.Field>
          </Form.Group>
          <Divider section/>
          <Form.Group widths="equal">
           

            <Form.Field value={CREATE_DOCTOR.Rank}>
              <label>Rank</label>
              
                <select name="Rank" onChange={handleInput}>
                <option value="" selected disabled hidden>Select Rank</option>
                  <option value="Doctor" >Doctor</option>
                  <option value="Head of Department" >Head of Department</option>
                  <option value="Doctor Assistant" >Doctor Assistant</option>
                  </select>
            </Form.Field>

            <Form.Field value={CREATE_DOCTOR.Contract_Type}>
              <label>Contract Type</label>
            
               <select name="Contract_Type" onChange={handleInput}>
               <option value="" selected disabled hidden>Select contract type</option>
                  <option value="Full Time" >Full Time</option>
                  <option value="Part Time" >Part Time</option>
                  <option value="Mallak" >Mallak</option>
                  </select>
            </Form.Field>
          </Form.Group>
          <Divider section/>
          <Form.Field>
            <Button color="green" floated="right">
              <Icon name="add"/>
              Create Doctor</Button>
          </Form.Field>
        </Form>
        <Link to="/doctors">
           <Button
            content="Back"
             icon="arrow left"
             color="red" 
             /></Link>
      </Container>
  );
};
export default Create;
