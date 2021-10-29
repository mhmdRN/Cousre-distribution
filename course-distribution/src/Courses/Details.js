import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {Container,Message,Table,Icon,Divider} from 'semantic-ui-react'
import cookies from 'js-cookies';

const Details=()=> {
    const [crses,setcrses]=useState([]);

    const [Doctors,setDoctors]=useState([]);
    const [Reg,setReg]=useState([]);
    const [loading,setLoading]=useState(false);
    const {id}=useParams();
    useEffect(()=>{
        setLoading(true);
       
        const token=cookies.getItem("token");
        const payload={headers:{Authorization:token}};

        axios.get('http://localhost:4000/courses/details/'+id,payload)
        .then(req=>{
          let x = req.data.Reg.sort((a, b) => (a.Facility_year < b.Facility_year  ? 1 : -1));
          setDoctors(req.data.Doc)
          setcrses(req.data.course);
          setReg(x);
          setLoading(false);
        })
       .catch(err=>{
        
        console.log(err);
      })

        
    },[]);
    

    var name,contracttype,Rank;
    const findDoctor=(Fnumber)=>{
     
        const data=Doctors.filter(i=>i.File_Number === Fnumber);
        console.log(data)
        name=data[0].Fname;
        contracttype=data[0].Contract_Type;
        Rank=data[0].Rank;
    }
  
console.log(Reg)
        return (
            <Container>
                 {
            (loading)? 
            <Message icon style={{marginTop:"20%"}}>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching that content for you.
    </Message.Content>
  </Message>
            :
            <div>
              <Divider horizontal content="INFO"/>
            <Table    >
            <Table.Header>
              <Table.Row >
                  
                <Table.HeaderCell >Code</Table.HeaderCell>
                <Table.HeaderCell >Name</Table.HeaderCell>
                <Table.HeaderCell >Credits</Table.HeaderCell>
                <Table.HeaderCell >Type</Table.HeaderCell>
                <Table.HeaderCell >Semester Nb</Table.HeaderCell>
                <Table.HeaderCell >Total hrs</Table.HeaderCell>
                <Table.HeaderCell >Course hrs</Table.HeaderCell>
                <Table.HeaderCell >Exercise hrs</Table.HeaderCell>
                <Table.HeaderCell >Lab hrs</Table.HeaderCell>
                <Table.HeaderCell >Available</Table.HeaderCell>
                <Table.HeaderCell >Description</Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
                
               
                              <Table.Row>
                              <Table.Cell>{crses.Course_code}</Table.Cell>
                              <Table.Cell>{crses.course_name}</Table.Cell>
                              <Table.Cell>{crses.credits}</Table.Cell>
                              <Table.Cell>{crses.Course_Type}</Table.Cell>
                              <Table.Cell>{crses.Semester_Nb}</Table.Cell>
                              <Table.Cell>{crses.Total_Hours}</Table.Cell>
                              <Table.Cell>{crses.Course_hours}</Table.Cell>
                              <Table.Cell>{crses.Exercise_hours}</Table.Cell>
                              <Table.Cell>{crses.Lab_hours}</Table.Cell>
                              <Table.Cell>{crses.available?'true':'false'}</Table.Cell>
                              <Table.Cell>{crses.Description}</Table.Cell>
                             
                            </Table.Row>
                          
                   
                
             
            </Table.Body>
        
          
          </Table>
          <Divider horizontal content="Registrations"/>
          <Table celled>
                <Table.Header>
                    <Table.Row >
    
                        <Table.HeaderCell >Course Code</Table.HeaderCell>
                        <Table.HeaderCell >Doctor name</Table.HeaderCell>
                        <Table.HeaderCell >Faculity year</Table.HeaderCell>
                        <Table.HeaderCell >Language</Table.HeaderCell>
                        <Table.HeaderCell >Lab - Exercise - Course</Table.HeaderCell>
                       
                        <Table.HeaderCell >Lab_hours</Table.HeaderCell>
                        <Table.HeaderCell >Exercise_hours</Table.HeaderCell>
                        <Table.HeaderCell >Course_hours</Table.HeaderCell>
                        <Table.HeaderCell >Section_ID</Table.HeaderCell>
                        <Table.HeaderCell >Location</Table.HeaderCell>
                  
                    </Table.Row>
                </Table.Header>
    
                <Table.Body>
                    {
                      
                        Reg.map((i, index) => {
                           findDoctor(i.DFile_number)
                        
                            return (
                                
                                <Table.Row>
    
                                    <Table.Cell >{i.Course_Code}</Table.Cell>
                                    <Table.Cell >{name}</Table.Cell>
                                    <Table.Cell >{i.Facility_year}</Table.Cell>
                                    <Table.Cell >{i.Language}</Table.Cell>
                                    <Table.Cell >{(i.Course) ? (i.Lab) ? (i.Exercise)? "C+L+E":"C+L" :(i.Exercise)? "C+E":"C" :
                                                    (i.Lab) ? (i.Exercise)? "L+E":"L" :(i.Exercise)? "E":null
                                                    }</Table.Cell>
                                    
                                    <Table.Cell >{i.Lab_hours}</Table.Cell>
                                    <Table.Cell >{i.Exercise_hours}</Table.Cell>
                                    <Table.Cell >{i.Course_hours}</Table.Cell>
                                    <Table.Cell >{i.Section_ID}</Table.Cell>
                                    <Table.Cell >{i.Location}</Table.Cell>
                                  
                                </Table.Row>
                                
                            )
                        })
    
                    }
    
    
                </Table.Body>
                </Table>
          </div>
        }
           </Container>
        );
    
}
export default Details;