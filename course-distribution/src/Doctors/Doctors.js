import React, { useEffect, useState } from 'react';
import { Button, Icon, Table ,Container,Message, Radio, Modal} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookies from 'js-cookies';
import ReactToExcel from 'react-html-table-to-excel';

const Doctor = () => {
    const [doctors,setDoctors]=useState([]);
    const[loading,setLoading]=useState(false);
    const[open,setOpen]=useState(false);
    const [search,setSearch]=useState([]);
    const [searchInput,setSearchInput]=useState('');
    const x=false;

    useEffect(()=>{
        setLoading(true)
        const token=cookies.getItem("token");
        const payload={headers:{Authorization:token}};
         axios.get('http://localhost:4000/doctors',payload)
        .then(Drs=>{
          setDoctors(Drs.data);
          setSearch(Drs.data)
          setLoading(false);
          console.log(Drs.data);
        })
        .catch(err=>{
          window.location.href="/error"
        })
       
        
    },[])

    const handleSearch=(e)=>{
      const {name,value}=e.target;
      setSearchInput(value);
      const x=doctors.filter(i=>i.File_Number.startsWith(value));
      x.length!==0?setSearch(x):setSearch(doctors)
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
            <div>
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
              placeholder="Search by Dr. ID "
              />
              <Icon name="search" size='big' />
              </div>
            <Table compact celled style={{fontSize:"15px"}} id="doctors">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Archived</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">First name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Last name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
                {
                    search.map(d=>{
                          return(

                              <Table.Row  >  
                                <Table.Cell>
                                <Radio toggle
                                  checked={d.Archived}
                                onClick={async ()=>{
                                  setLoading(true);
                                  const archived=!d.Archived;
                                  const data=axios.put("http://localhost:4000/doctors/update-archived/"+d._id,{archived,d});
                                  window.location.reload();
                                  setLoading(false);
                                }}
                                />
                                </Table.Cell>
                               
                                   <Table.Cell textAlign="center">
                                  <Link to={`/doctors/details/${d._id}`}>
                                  {d.Fname}
                                  </Link>
                              </Table.Cell>
                      
                              <Table.Cell textAlign="center">{d.Lname}</Table.Cell>
                              <Table.Cell textAlign="center">{d.Email}</Table.Cell>
                              <Table.Cell collapsing>
                                <Link to={`/doctors/update/${d._id}` }>
                              <Button 
                              content="Update" 
                              color="blue"
                              
                              size='small'
                              icon="redo"
                              />
                              </Link>
                              <Button
                            content="Delete" 
                            labelPosition='right'
                            icon='trash'
                            onClick={() =>{ 
                              setOpen(false)
                              setLoading(true);
                              console.log(d.fname);
                              const req =axios.delete(`http://localhost:4000/doctors/${d._id}`);
                              setLoading(false);
                              window.location.reload();
                            }}
                            color="red"
                          />
                             

  
                              </Table.Cell>
                            </Table.Row>
                            
                          )
                    })
                   
                }
             
            </Table.Body>
        
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='12'>
                    <Link to='/doctors/create'>
                  <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    color="green"
                    size='small'
                  >
                    <Icon name='add' />
                    Add Doctor
                  </Button>
                  </Link>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
            <ReactToExcel 
            table="doctors"
            filename="Doctors Table"
            sheet="Sheet"
            buttonText="Export To Excel"
            className="ui primary button"
            />
            </div>
        }
        
        
        </Container>
        
            
    )
            
}
   


export default Doctor;