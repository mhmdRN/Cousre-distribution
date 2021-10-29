import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon, Input } from "semantic-ui-react";
import {useParams,Link} from 'react-router-dom'
import axios from "axios";
import cookies from 'js-cookies';
const Update = () => {
  const [dr, setdr] = useState([]);
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const token=cookies.getItem("token");
    const payload={headers:{Authorization:token}};
      axios.get("http://localhost:4000/doctors/update/"+id,payload)
      .then((res) => {
        setdr(res.data);
      })
      .catch((err) => {
        window.location.href="/error"
      });
  });

  const CREATE_DOCTOR = {
    Fname: dr.Fname,
    Email: dr.Email,
    phone_Number: dr.phone_Number,
    File_Number: dr.File_Number,
    Lname: dr.Lname,
    Mname: dr.Mname,
    Rank: dr.Rank,
    Contract_Type: dr.Contract_Type,
  };
  const [create_doc, set_update_doc] = useState(CREATE_DOCTOR);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e);
    set_update_doc((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    axios.put("http://localhost:4000/doctors/update/"+id, create_doc)
    .then(res=>{
      window.location.href="/doctors";
    })
    .catch(err=>{
      console.log(err)
    })
    
     

  };
  return (
   
    <Container>
    <Form  loading={Loading}>
      <Form.Group widths="equal">
        <Form.Field value={CREATE_DOCTOR.Fname}>
          <label>First Name</label>
          <Input
            required
            placeholder={CREATE_DOCTOR.Fname}
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
            placeholder={CREATE_DOCTOR.Mname}
          />
        </Form.Field>

        <Form.Field value={CREATE_DOCTOR.Lname}>
          <label>Last Name:</label>
          <Input
            required
            placeholder={CREATE_DOCTOR.Lname}
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
            placeholder={CREATE_DOCTOR.Email}
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
            placeholder={CREATE_DOCTOR.phone_Number}
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
            placeholder={CREATE_DOCTOR.File_Number}
          />
        </Form.Field>
      </Form.Group>
      <Divider section/>
      <Form.Group widths="equal">
       

        <Form.Field value={CREATE_DOCTOR.Rank}>
          <label>Rank</label>
          
            <select name="Rank" onChange={handleInput} >
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
        <Button color="green" onClick={handleSubmit}  floated="right">
          <Icon name="redo"/>
          Update Doctor</Button>
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
export default Update;
