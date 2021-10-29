import React, { useEffect, useState } from 'react';
import { Button, Icon, Table ,Container,Message, Divider} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookies from 'js-cookies';

const Distribution = () => {
    const [distributions,setDistributions]=useState([]);
    const[loading,setLoading]=useState(false);
    useEffect( ()=>{
        setLoading(true)
        const token =cookies.getItem("token");
        console.log(token);
        const payload={headers:{ Authorization : token}}
         axios.get('http://localhost:4000/distributions',payload)
         .then((Ds)=>{
          setDistributions(Ds.data);
          setLoading(false);
         })
         .catch(err=>{
           console.log(err);
            window.location.href="/error";
         })
        
    },[])

    const handleCopy= (d)=>{
      const year=new Date().getFullYear();
      const temp=parseInt(year)+1;
        const payload = {
          Name: d.Name+"-copy",
          Registrations: d.Registrations,
          Version:d.Version,
          Date: year+"-"+temp,
      }
       axios.post('http://localhost:4000/distributions/create', payload)
       .then(res=>{
        window.location.href="/distributions";
       })
       .catch(err=>{
        window.location.href="/error";
       })
     
      
    }

    return(
        <Container style={{marginTop:'2em',backgroundColor:"grey"}} >
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

            <Table compact celled style={{fontSize:"15px"}}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Distribution name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Version</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
                {
                    distributions.map(d=>{
                          return(
                              <Table.Row>
                                   <Table.Cell textAlign="center">
                                  <Link to={`/distributions/details/${d._id}`}>
                                  {d.Name}
                                  </Link>
                              </Table.Cell>
                              <Table.Cell textAlign="center">{d.Date}</Table.Cell>
                              <Table.Cell textAlign="center">{d.Version ? "Final":"Not Complete"}</Table.Cell>
                              <Table.Cell collapsing>
                                <Link to={`/distributions/update/${d._id}`}>
                              <Button 
                              content="Update" 
                              color="blue"
                              
                              size='small'
                              icon="redo"
                              />
                              </Link>

                             
                              <Button 
                              content="Copy" 
                              color="facebook"
                              size='small'
                              icon="copy"
                              onClick={()=>{handleCopy(d);}}
                              />
                            
     
                              <Button
                               content="Delete" 
                               icon="trash"
                               color="red"
                               size='small'
                               onClick={()=>{
                                 setLoading(true);
                                 const req =axios.delete('http://localhost:4000/distributions/'+d._id);
                                 setLoading(false);
                                 window.location.reload();
                               }}
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
                  
                      <Link to="/distributions/create">
                  <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    color="green"
                    size='small'
                  >
                    <Icon name='add' />
                    Add Distribution 
                  </Button>
                  </Link>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          </div>
        }
        
        
        </Container>
        
            
    )
            
}
   


export default Distribution;