import axios from "axios";
import React,{useState,useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom"
import swal from 'sweetalert';
 
export default function EditForm(){
    
    const navigate = useNavigate();
    const {id} = useParams();
     
    const [user, setUser]=useState({
      "heading": "",
      "description": "",
      "completeornot": "",
      "commentsupdate": "",
      
    });
    
    const [errors, setErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);
    const { heading,description,completeornot,commentsupdate } = user;

    const validate = (user) =>{

      let errors = {};
      
        if (!user.heading.trim()) {
           errors.heading= "heading is required!"
        }

        if (!user.description) {
          errors.description= "description is required!"
       }
       if (!user.completeornot) {
        errors.completeornot= "complete or not is required!"
       }
       if (!user.commentsupdate) {
        errors.commentsupdate= "comments/update is required!"
       }
       
       
       return errors;

    }

    const onInputChange = e =>{

      setUser({...user,[e.target.name]: e.target.value})
    }

    useEffect(()=>{

        loadUser();
    }, [])

    const onSubmit = async e =>{
      e.preventDefault();
      setErrors(validate(user));
      setIsSubmit(true);
      if(Object.keys(errors).length===0 && isSubmit)
      {
     let res =  await axios .put(`http://localhost:3003/users/${id}`,user);
      navigate("/")

      if(res){
        swal({
          title: "Form Edit Successfully",
          icon: "success",
          
        });
      }else{
        swal({
          title: "Fail to Edit Form",
          icon: "warning",
        });
      }
    }  
    };

    const loadUser = async () =>{
      const result = await axios.get(`http://localhost:3003/users/${id}`);
        setUser(result.data);
    }
    
    return(
        
             <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor: '#dfe6e9',
        width:700,
        marginLeft:300
        
    }}>
        
       
    <form class="row g-3" >
        <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor:'#636e72'}}>
        <label><b>Edit Employee</b></label>
        </div>
    
  <div className="col-md-6">
    <label for="validationServer01" class="form-label" >Heading</label>
    <input type="text" class="form-control is-valid" name="heading" value={heading} onChange={e => onInputChange(e)}  />
    {errors.heading && <p style={{color:"red"}}>{errors.heading}</p>}
  </div>
  <div className="col-md-6">
    <label for="validationServer02" class="form-label" >Description</label>
    <input type="text" class="form-control is-valid" name="description" id="validationServer02"  onChange={e => onInputChange(e)} value={description} required />
    {errors.description && <p style={{color:"red"}}>{errors.description}</p>}
  </div>

  <div className="col-md-6">
    <label for="validationServer02" class="form-label" >complete or not</label>
    <input type="text" class="form-control is-valid" name="completeornot"  id="validationServer02" onChange={e => onInputChange(e)} value={completeornot}  required />
    {errors.completeornot && <p style={{color:"red"}}>{errors.completeornot}</p>}
  </div>

  
  <div className="col-md-6">
    <label for="validationServer02" class="form-label" >comments/update</label>
    <input type="text" class="form-control is-valid" name="commentsupdate"  id="validationServer02" onChange={e => onInputChange(e)} value={commentsupdate} required />
    {errors.commentsupdate && <p style={{color:"red"}}>{errors.commentsupdate}</p>}
  </div>

  
  
  <div className="col-12" style={{display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10,
    borderRadius:10
}}>
    <button type="submit" onClick={onSubmit} className="btn btn-primary" >Update Form</button>
    <Link style={{margin:30}} className="btn btn-primary" to="/">Back</Link>

  
  </div>


</form>
        </div>
    )
}