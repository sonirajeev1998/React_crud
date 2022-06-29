import axios from "axios";
import React,{useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom"
import swal from 'sweetalert';

 
export default function AddForm(){
    
    const navigate = useNavigate()
    const [user, setUser]=useState({
      "heading": "",
      "description": "",
      "completeornot": "",
      "commentsupdate": "",
      

    });

    const [errors, setErrors]=useState({});
    const [isSubmit, setIsSubmit]=useState(false);

   /* useEffect(() =>{
          console.log(errors);
        if (Object.keys(errors).length === 0   && isSubmit){
          console.log(user)
        }
    }, [errors])*/

    const validate = (user) =>{

      let errors = {};
      
        if (!user.heading.trim()) {
           errors.heading= "heading is required!"
        }

        if (!user.description) {
          errors.description= "desciption is required!"
       }
       if (!user.completeornot) {
        errors.completeornot= "complete or not is required!"
       }
       if (!user.commentsupdate) {
        errors.commentsupdate= "commentsupdate is required!"
       }
    
       return errors;

    }

    const onInputChange = e =>{
      
      setUser({...user,[e.target.name]: e.target.value});
     
    }

    const onSubmit = async e =>{
      e.preventDefault();
      setErrors(validate(user));
      setIsSubmit(true);
     console.log(errors)
     
    if(Object.keys(errors).length===0 && isSubmit)
    
     {
     let res = await axios.post("http://localhost:3003/users",user)
      navigate("/")
     console.log(res)
      if(res){
        swal({
          title: "Form Added Successfully",
          icon: "success",
          
        });
      }else{
        swal({
          title: "Fail to Add Form",
          icon: "warning",
        });
      }
  
    }
   // return errors; 
     
     
    };
    
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
        
       
    <form class="row g-3" onSubmit={onSubmit} >
        <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        padding:10,
        borderRadius:10,
        backgroundColor:'#636e72'}}>
        <label><b>Add New Form</b></label>
        </div>
    
  <div className="col-md-6">
    <label  class="form-label" >Heading</label>
    <input type="text" class="form-control is-valid" name="heading" value={user.heading} onChange={e => onInputChange(e)}  />
    
  {errors.heading && <p style={{color:"red"}}>{errors.heading}</p>}
  </div>
  <div className="col-md-6">
    <label  class="form-label" >Description</label>
    <input type="text" class="form-control is-valid" name="description"   onChange={e => onInputChange(e)} value={user.description}  />
      
  {errors.description && <p style={{color:"red"}}>{errors.description}</p>}
  </div>
  

  <div className="col-md-6">
    <label  class="form-label" >complete or not</label>
    <input type="text" class="form-control is-valid" name="completeornot"   onChange={e => onInputChange(e)} value={user.completeornot} />
     
  {errors.completeornot && <p style={{color:"red"}}>{errors.completeornot}</p>}
  </div>
 

  
  <div className="col-md-6">
    <label  class="form-label" >Comments/Update </label>
    <input type="text" class="form-control is-valid" name="commentsupdate"  onChange={e => onInputChange(e)} value={user.commentsupdate} />
     
  {errors.commentsupdate && <p style={{color:"red"}}>{errors.commentsupdate}</p>}
  </div>
  

  
  
  
  <div className="col-12" style={{display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    padding:10,
    borderRadius:10
}}>
    <button type="submit" className="btn btn-primary" >Add</button>
    <Link style={{margin:30}} className="btn btn-primary" to="/">Back</Link>

  
  </div>


</form>
        </div>
    )
}