import React, { useEffect, useState } from 'react';
import { Container ,Table,Button,Icon,Message, TableFooter} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookies'

const Registrations = () => {
    const [Reg,setReg]=useState([]);
    const [Loading,setLoading]=useState(false);
    const [Doctors, setDoctors] = useState([]);
    const [allCrs,  setAllCrs] = useState([]);
    const [search,setSearch]=useState([]);
    const year=new Date().getFullYear();
    const temp=parseInt(year)+1;
    const [searchInput,setSearchInput]=useState(year+"-"+temp);
    useEffect(()=>{
        setLoading(true);
        const token=cookies.getItem("token");
        const payload={headers:{Authorization:token}};
        axios.get("http://localhost:4000/distributions/create",payload)
        .then((req)=>{
          const myData = [].concat(req.data.Reg)
          .sort((a, b) => a.Facility_year  < b.Facility_year  ? 1 : -1);
          setReg(myData);
          setDoctors(req.data.Doc);
          setSearch(prev=>(myData.filter(i=>i.Facility_year.startsWith(searchInput))))
          setLoading(false);
        })
        .catch(err=>{
          console.log(err);
          window.location.href="/error"
        })
         axios.get("http://localhost:4000/registrations",payload)
    .then(data=>{
      setAllCrs(data.data.Cs);
    })
    .catch(err=>{
      window.location.href="/error"
    })
       
    },[]);
    var Dname;
    const findDoctor=(Fnumber)=>{
      const data=Doctors.filter(i=>i.File_Number === Fnumber);
      console.log(data[0].Fname)
      Dname=data[0].Fname;
    
  }

  const handleSearch=(e)=>{
    const {name,value}=e.target;
    setSearchInput(value);
    const x=Reg.filter(i=>i.Facility_year.startsWith(value));
    x.length!==0?setSearch(x):setSearch(Reg)
       }

       
   const handleCopy=(Reg)=>{
     
    setLoading(true);
    const payload={
      ...Reg,
      Facility_year:year+"-"+temp,
    }
    axios.post("http://localhost:4000/registrations/create", payload)
    .then(result=>{
      setLoading(false);
      window.location.href='/registrations';
    })
    .catch(err=>{
      setLoading(false);
      window.location.href="/error"
    })
       }



const handleCopyReg=()=>{
  setLoading(true);
  
  axios.post("http://localhost:4000/registrations/createcopy", search)
  .then(result=>{
    setLoading(false);
    window.location.reload();
    setSearchInput(year+"-"+temp);
  })
  .catch(err=>{
    setLoading(false);
    window.location.href="/error"
  })
}
var sections=0;
const findNbSection=(code)=>{
  sections=0;
  const data=Reg.filter(i=>i.Course_Code===code && i.Facility_year===searchInput);
  sections=data.length;

}


    return (
        <Container>
            {
                (Loading)?
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
                  <select onChange={handleSearch} value={searchInput}
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
              placeholder="Search by year "
              >
                  <option value="2020-2021">2020-2021</option>
                  <option value="2021-2022">2021-2022</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2026-2027">2026-2027</option>
                  <option value="2027-2028">2027-2028</option>
                 
              
              </select>
              <Icon name="search" size='big' />
              </div>
              {
                allCrs.map(k=>{
                  findNbSection(k.Course_code);
                  return(
                    <>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <h2 style={{textAlign:"center"}}>{k.course_name} ({k.Course_code})</h2>
                    <h2 style={{textAlign:"center"}}>Sections : {sections}</h2>
                    </div>
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
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
        
                    <Table.Body>
                        {
                            search.map((i, index) => {
                              findDoctor(i.DFile_number)
                                return (
                                  <>
                                    {
                                      (i.Course_Code===k.Course_code)?
                                    <Table.Row>
        
                                    <Table.Cell >{i.Course_Code}</Table.Cell>
                                    <Table.Cell >{Dname}</Table.Cell>
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
                                    <Table.Cell collapsing>
                                    <Link to={`/registrations/update/${i._id}?code=${i.Course_Code}&Dr=${i.DFile_number }&
                                    L=${i.Language}&C=${i.Course}&E=${i.Exercise}&La=${i.Lab}&Ch=${i.Course_hours+""}
                                    &Eh=${i.Exercise_hours+""}&Lah=${i.Lab_hours+""}&S=${i.Section_ID}&Lo=${i.Location}
                                    &Mc=${k.Course_hours}&Me=${k.Exercise_hours}&Ml=${k.Lab_hours}
                                    `}>
                                  <Button 
                                  content="Edit" 
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
                              onClick={()=>{handleCopy(i);}}
                              />
                                  <Button
                                   content="Delete" 
                                   icon="trash"
                                   color="red"
                                   size='small'
                                   onClick={async ()=>{
                                     const req =await axios.delete('http://localhost:4000/registrations/'+i._id);
                                      window.location.reload();
                                   }}
                                   />
                                    </Table.Cell>
                                </Table.Row>:null
                              
                                    }
                                      </>
                                    
                                )
                            })
        
                        }
        
        
                    </Table.Body>
                    <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='11'>
                <Link to={`/registrations/create?code=${k.Course_code}&Ch=${k.Course_hours}&Eh=${k.Exercise_hours}&Lh=${k.Lab_hours}`}>
              <Button
              content="Add Section"
                floated='right'
                icon="add"
                color="green"
                size='small'
    
              />
              </Link>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
                    </Table>
                    </>
                  )
                })
              }
               
                <Button content="copy" color="linkedin" onClick={()=>{handleCopyReg()}} />
                
           
                </div>
                
            }
           
         </Container>
    );
};

export default Registrations;