import React,{useState,useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";

export default function From(){

    const [user, setUser]=useState({
        "heading": "",
        "description": "",
        "completeornot": "",
        "commentsupdate": "",
       
      });

      const {id} = useParams();

      useEffect(()=>{

        loadUser();
       }, [])


      const loadUser = async () =>{
        const result = await axios.get(`http://localhost:3003/users/${id}`);
          setUser(result.data);
      }
      
    return(
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">Back to Home</Link>
            <h1 className="display-4">User Id: {id}</h1>
            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">heading: {user.heading}</li>
                <li className="list-group-item">description: {user.description}</li>
                <li className="list-group-item">complete or not: {user.completeornot}</li>
                <li className="list-group-item">comments/update: {user.commentsupdate}</li>
            

            </ul>
            
        </div>
    )
}