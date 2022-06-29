import React, {useState,useEffect} from "react";
import axios from "axios";
import { Link,NavLink } from "react-router-dom";
import {MdDelete} from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import {GrView} from "react-icons/gr"
import swal from 'sweetalert';




export default function Home(){
    const [users, setUsers]=useState([])
    const [value, setValue]=useState("")
    const [order, setOrder]=useState("ASC")

    
    
    const sorting = (col)=>{
        if(order === "ASC"){
           const sorted = [...users].sort((a,b)=>
              a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
           );
           setUsers(sorted);
           setOrder("DSC");
        }
        if(order === "DSC"){
          const sorted = [...users].sort((a,b)=>
             a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
          );
          setUsers(sorted);
          setOrder("ASC");

       }
    }
    
                                 
    const handleSearch = async (e)=>{
         e.preventDefault()
         return await axios.get(`http://localhost:3003/users?q=${value}`).then((result)=> {
           setUsers(result.data);
           setValue("");
          })
           .catch((err) =>console.log(err))
    
    }

     useEffect(()=>{
        loadUsers(0, 4, 0);
     },[])

      const loadUsers = async ()=>{
          const result = await axios.get(`http://localhost:3003/users`)
              
             setUsers(result.data)
            
              
           
           
        }

         const deleteUser = async id =>{
          let res = await axios.delete(`http://localhost:3003/users/${id}`)
           loadUsers();
           
          if(res){
            swal({
              title: "Are you sure want to Delete?",
              text: "Once deleted, you will not be able to recover this imaginary file!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                  icon: "success",
                });
              } else {
                swal("Your imaginary file is safe!");
              }
            });
         }else{
          swal({
          title: "Fail to Delete Employee",
          icon: "warning",
          });
         }
         }

        
         

    return(
        <div className="container">
           <div className="py-4">
               <h1>Home page</h1>
               
               <form class="d-flex py-3" onSubmit={handleSearch}>
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value} onChange={(e)=>setValue(e.target.value)} />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
               <table class="table border shadow">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th onClick={()=>sorting("heading")} scope="col">Heading</th>
      <th onClick={()=>sorting("description")} scope="col">Description</th>
      <th onClick={()=>sorting("completeornot")} scope="col">Completeornot</th>
      <th >Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user,index)=>(
        <tr>
         <th scope="row">{index + 1}</th>
         <td>{user.heading}</td>
         <td>{user.description}</td>
         <td>{user.completeornot}</td>
         
         <td>
         
         <Link  to={`/form/${user.id}`} >
          <GrView  size='20'/>
         </Link>
       
        
         
         <Link className="btn shadow-none " to={`/editform/${user.id}`} >
           <GrEdit className="text-primary ms-3" size='20' />
         </Link>
      

         <button className="btn shadow-none"  onClick={() => deleteUser(user.id)} >
           <MdDelete className="text-danger ms-3" size='20' />
         </button>

      
         </td>
         
        </tr>

        
        
    
    ))}
        
  </tbody>
</table>
          
           </div>
         
    
        </div>
    )
}