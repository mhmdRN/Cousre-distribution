import React, { useEffect, useState } from 'react';
import { Button, Icon, Table ,Container,Message,Radio} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactToExcel from 'react-html-table-to-excel';
import cookies from 'js-cookies';
import '../index.css';

const Course = () => {
    const [courses,setCourses]=useState([]);
    const [search,setSearch]=useState([]);
    const [searchInput,setSearchInput]=useState('');
    const[loading,setLoading]=useState(false);
   

    useEffect(()=>{
        setLoading(true)
        const token=cookies.getItem("token");
        const payload={headers:{Authorization:token}};
        axios.get('http://localhost:4000/courses',payload)
        .then((Crs)=>{
          setCourses(Crs.data);
          setSearch(Crs.data);
          setLoading(false);
        })
        .catch(err=>{
         window.location.href="/error";

        });
        
    },[])

      const handleSearch=(e)=>{
        const {value}=e.target;
        setSearchInput(value);
        const x=courses.filter(i=>i.Course_code.startsWith(value));
        x.length!==0?setSearch(x):setSearch(courses)
      }
     
      

    return(
        <Container style={{marginTop:'2em'}}>
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
            <div >
              <div>
              <input type="search" onChange={handleSearch} value={searchInput}
              style={{
                width:250,
                height:35,
                borderRadius:15,
                borderWidth:1,
                textAlign:"center",
                marginLeft:"40%",
                borderColor:"#eee",
                outline:"none"
              }}
              placeholder="Search by code"
              />
              <Icon name="search" size='big' />
              </div>
            <Table compact celled style={{fontSize:"15px"}} id="course-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Archived</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Code</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Credits</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Type</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Semester Nb</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Total hrs</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Course hrs</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Exercise hrs</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Lab hrs</Table.HeaderCell>
                
                <Table.HeaderCell/>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
                {
                    search.map(c=>{
                          return(
                              <Table.Row>
                                 <Table.Cell>
                                <Radio toggle
                                  checked={c.Archived}
                                onClick={async ()=>{
                                  setLoading(true);
                                  const archived=!c.Archived;
                                  await axios.put("http://localhost:4000/courses/update-archived/"+c._id,{archived,c});
                                  window.location.reload();
                                  setLoading(false);
                                }}
                                />
                                </Table.Cell>
                                
                              <Table.Cell>
                                <Link to={`courses/details/${c._id}`}>
                                {c.Course_code}
                                </Link>
                                </Table.Cell>
                              <Table.Cell>{c.course_name}</Table.Cell>
                              <Table.Cell>{c.credits}</Table.Cell>
                              <Table.Cell>{c.Course_Type}</Table.Cell>
                              <Table.Cell>{c.Semester_Nb}</Table.Cell>
                              <Table.Cell>{c.Total_Hours}</Table.Cell>
                              <Table.Cell>{c.Course_hours}</Table.Cell>
                              <Table.Cell>{c.Exercise_hours}</Table.Cell>
                              <Table.Cell>{c.Lab_hours}</Table.Cell>
                              <Table.Cell collapsing>
                                <Link to={`/courses/update/${c._id}` }>
                              <Button 
                              content="Update" 
                              color="blue"
                              
                              size='small'
                              icon="redo"
                              />
                              </Link>
                              <Button
                              content="Delete" 
                              icon='trash'
                                onClick={ async () =>{ 
                                 
                                  setLoading(true);
                                   await axios.delete('http://localhost:4000/courses/'+c._id);
                                  setLoading(false);
                                  window.location.reload();
                                }}
                                color="red"
                               />
                             
{/*                                
                             <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={<Button color="red" ><Icon name="trash"/>Delete</Button>}
                            >
                  <Modal.Header>Verification</Modal.Header>
                  <Modal.Content image>
                    <Modal.Description>
                      <p>
                      Are you sure you want to delete this course with all its Registrations ?
                      </p>
      
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                      cancel
                    </Button>
                    <Button
                      content="Yes,I am sure" 
                      labelPosition='right'
                      icon='checkmark'
                      onClick={ () =>{ 
                        setOpen(false)
                        setLoading(true);
                        const req = axios.delete('http://localhost:4000/courses/'+c._id);
                        setLoading(false);
                        window.location.reload();
                      }}
                      positive
                    />
                  </Modal.Actions>
                </Modal> */}
                              </Table.Cell>
                            </Table.Row>
                          )
                    })
                   
                }
             
            </Table.Body>
          </Table>
      
          <Link to='/courses/create'>
                  <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    color="green"
                    size='small'
                  >
                    <Icon name='add' />
                    Add Course 
                  </Button>
                  </Link>
               
          <ReactToExcel 
          table="course-table"
          filename="Course Table"
          sheet="Sheet"
          buttonText="Export To Excel"
          className="ui primary button"
          />
          
          <Button icon="left arrow" content="Back" color="red"/>
    
          </div>
        }
        
        
        </Container>
        
            
    )
            
}
   


export default Course;