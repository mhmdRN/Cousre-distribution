import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Message, Table, Icon, Divider, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import cookies from 'js-cookies';

const Details = () => {
  const [doctor, setdoctor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Reg, setReg] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const token=cookies.getItem("token");
    const payload={headers:{Authorization:token}};
    axios.get('http://localhost:4000/doctors/details/' + id)
    .then(Dr=>{
      console.log(Dr.data.Reg);
      let x = Dr.data.Reg.sort((a, b) => (a.Facility_year < b.Facility_year  ? 1 : -1));
      setReg(x);
      setdoctor(Dr.data.Doctor);
      setLoading(false);
    })
    .catch(err=>{

      window.location.href="/error"
    })
  

  }, []);
  console.log(Reg);
  return (
    <Container >
      {
        (loading) ?
          <Message icon style={{ marginTop: "20%" }}>
            <Icon name='circle notched' loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
          </Message>
          :
          (
            <Container fluid>
              <Divider section horizontal>Info</Divider>
            <Table    >
            <Table.Header>
              <Table.Row >

                <Table.HeaderCell >First name</Table.HeaderCell>
                <Table.HeaderCell >Middle name</Table.HeaderCell>
                <Table.HeaderCell >Last name</Table.HeaderCell>
                <Table.HeaderCell >File number</Table.HeaderCell>
                <Table.HeaderCell >Email</Table.HeaderCell>
                <Table.HeaderCell >Phone number</Table.HeaderCell>
                <Table.HeaderCell >Rank</Table.HeaderCell>
                <Table.HeaderCell >Contract type</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>


              <Table.Row>
                <Table.Cell >{doctor.Fname}</Table.Cell>
                <Table.Cell >{doctor.Mname}</Table.Cell>
                <Table.Cell >{doctor.Lname}</Table.Cell>
                <Table.Cell >{doctor.File_Number}</Table.Cell>
                <Table.Cell >{doctor.Email}</Table.Cell>
                <Table.Cell >{doctor.phone_Number}</Table.Cell>
                <Table.Cell >{doctor.Rank}</Table.Cell>
                <Table.Cell >{doctor.Contract_Type}</Table.Cell>

              </Table.Row>




            </Table.Body>


          </Table>
          <Divider horizontal section>Registrations</Divider>
           <Table>
           <Table.Header>
             <Table.Row >
   
               <Table.HeaderCell >Course Code</Table.HeaderCell>
               <Table.HeaderCell >Faculity year</Table.HeaderCell>
               <Table.HeaderCell >Language</Table.HeaderCell>
              
               <Table.HeaderCell >Lab - Course - Exercise</Table.HeaderCell>
               <Table.HeaderCell >Course hours</Table.HeaderCell>
               <Table.HeaderCell >Exercise hours</Table.HeaderCell>
               <Table.HeaderCell >Lab hours</Table.HeaderCell>
               <Table.HeaderCell >Section ID</Table.HeaderCell>
   
             </Table.Row>
           </Table.Header>
   
           <Table.Body>
   
             {
               Reg.map((R) => {
                 return (
   
                   <Table.Row>
                     <Table.Cell textAlign="center">{R.Course_Code}</Table.Cell>
                     <Table.Cell textAlign="center">{R.Facility_year}</Table.Cell>
                     <Table.Cell textAlign="center">{(R.EN_Section) ? (R.FR_Section) ? "A & F" : "A" :
                       (R.FR_Section) ? "F" : null
                     }</Table.Cell>
                     <Table.Cell textAlign="center" >{(R.Course) ? (R.Lab) ? (R.Exercise)? "C+L+E":"C+L" :(R.Exercise)? "C+E":"C" :
                                                    (R.Lab) ? (R.Exercise)? "L+E":"L" :(R.Exercise)? "E":null
                                                    }</Table.Cell>
                   
                     <Table.Cell textAlign="center">{R.Course_hours}</Table.Cell>
                     <Table.Cell textAlign="center">{R.Exercise_hours}</Table.Cell>
                     <Table.Cell textAlign="center">{R.Lab_hours}</Table.Cell>
                     <Table.Cell textAlign="center">{R.Section_ID}</Table.Cell>
                   </Table.Row>
                 )
               }
              
               )
             }
   
   
   
   
           </Table.Body>
   
         </Table>
         <Link to="/doctors">
           <Button
            content="Back"
             icon="arrow left"
             color="red" 
              /></Link>
         </Container>
          )
         
      }
    
    </Container>
    
  );

}
export default Details;