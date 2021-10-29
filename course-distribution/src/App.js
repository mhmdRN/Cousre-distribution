import 'semantic-ui-css/semantic.min.css'
import {Switch,BrowserRouter,Route} from 'react-router-dom';
import Registration from './Registrations/Registrations';
import CreateRegistration from './Registrations/Create';
import Navbar from './Navbar';
import Doctors from './Doctors/Doctors';
import Courses from './Courses/Course'; 
import CreateCourse from './Courses/Create'; 
import CreateDoctor from './Doctors/Create'; 
import Details from './Courses/Details';
import DoctorDetails from './Doctors/Details';
import Update from './Courses/Update';
import DoctorUpdate from './Doctors/Update';
import Distributions from './Distributions/Distributions';
import CreateDistribution from './Distributions/Create';
import DistributionDetails from './Distributions/Details';
import RegistrationUpdate from './Registrations/Update';
import DistributionUpdate from './Distributions/Update';
import Signup from './Signup';
import Login from './Login';
import Error from './Error';
import cookies from 'js-cookies';




const token=cookies.getItem("token");
function App() {
  
  return (
   
   <BrowserRouter>
   {
     token &&  <Navbar/>
   }
  
   <Switch>{
      (!token) ? <Route exact path="/" component={Login} />:  <Route exact path='/' component={Distributions}/>
     }
    
     <Route exact path="/signup" component={Signup}/>
   {(token) ? <Route exact path='/courses' component={Courses}/>:<Route exact path='/courses' component={Login}/>}
   <Route exact path='/distributions' component={Distributions}/>
   <Route exact path='/doctors' component={Doctors}/>
   <Route  path="/courses/details/:id" component={Details}/>
   {(token) ? <Route path='/courses/create' component={CreateCourse}/> : <Route path='/courses/create' component={Login}/>  }
   <Route path='/courses/update/:id' component={Update}/>

   <Route  path="/doctors/details/:id" component={DoctorDetails}/>
   {(token) ?<Route path='/doctors/create' component={CreateDoctor}/> :<Route path='/doctors/create' component={Login}/>  }
   <Route path='/doctors/update/:id' component={DoctorUpdate}/>
  
   <Route path='/distributions/create' component={CreateDistribution}/>
   <Route path='/distributions/details/:id' component={DistributionDetails}/>
   <Route path='/distributions/update/:id' component={DistributionUpdate}/>
 
   {(token)?<Route exact path='/registrations' component={Registration}/>:<Route exact path='/registrations' component={Login}></Route>}
   {(token) ? <Route path='/registrations/create' component={CreateRegistration} />: <Route path='/registrations/create' component={Login} />}
   <Route path='/registrations/update/:id' component={RegistrationUpdate}/>
   <Route path='/error' component={Error}/>

   </Switch>
  
   </BrowserRouter>
  
  );
}

export default App;
