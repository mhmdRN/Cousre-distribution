import React, { useEffect } from 'react'
import {Menu,Icon} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'
import cookie from 'js-cookies';

const Navbar=()=>{
 const Location=useLocation();
  const isactive=(url)=>{
    if(Location.pathname.startsWith(url))
      return true;
    else
      return false
  }
 
    return(
    
        
      <Menu pointing inverted stackable >
          <Link to='/courses'>
      <Menu.Item
        name='Courses'
        active={isactive('/courses')}
        
      >
         <Icon color="red" size="large" name="book"/>
      Courses
        </Menu.Item>
      </Link>
        <Link to='/doctors'>
      <Menu.Item
        name='Doctors'
        active={isactive('/doctors')}
        
      >
      <Icon color="red" size="large" name="users"/>
      Doctors
      </Menu.Item>
      </Link>
      <Link to='/registrations'>
      <Menu.Item
        name='Course assignments'
        active={isactive('/registrations')}
       
      >
         <Icon color="red" size="large" name="book"/>
         Course assigmnets
        </Menu.Item>

      </Link>
      <Link to='/distributions'>
      <Menu.Item
        name='Distributions'
        active={isactive('/distributions')}
        
      >
         <Icon color="red" size="large" name="list"/>
          Distributions
        </Menu.Item>
      </Link>
    
     
      <Menu.Menu position='right'>
      <Link to="/logout">
        <Menu.Item
          name='logout'
          active={isactive('/logout')}
          onClick={()=>{
              cookie.removeItem('token');
              window.location.href="/";  
        }}
        />
        </Link>
      </Menu.Menu>
     
    </Menu>

   
    
    )
}
export default Navbar;