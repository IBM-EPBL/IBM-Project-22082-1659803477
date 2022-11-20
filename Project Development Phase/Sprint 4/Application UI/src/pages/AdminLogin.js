
import Button from "../components/Button"
import styles from "./css/DonarLogin.module.css"
import { AuthContext } from "../context/authContext"
import { useContext, useReducer } from "react"
import fetchoption from '../helpers/fetchoption'
import { useNavigate } from "react-router-dom"
import axios from "axios"
const AdminLogin=()=>{
   const userdata=useContext(AuthContext);
    const initialState={
        email:'',
        password:''
      }
      const reducer=(state,action)=>{
      if(action.type=="UPDATE"){
        return( {...state,
          [action.field]:action.value
        })
      }
      }

      const navigate=useNavigate()
      
      const [formdata,dispatch]=useReducer(reducer,initialState)
      
      
      
      const changeHandler=(label,e)=>{
        console.log(formdata)
        dispatch({type:"UPDATE",field:label,value:e.target.value})
      }


      const clickHandler=async()=>{
        console.log("form",formdata)
      try{const res=await axios.post('http://127.0.0.1:5000/login',{
        
          email:formdata.email,
          password:formdata.password
        
      });
      
      console.log("res",res)
           

      if(res.data.user.role!='admin')
       {
        alert("You are not admin");
        return
       }
      userdata.authenticate(res.data.user)

      navigate("/admin/")
      }
      catch(err){
        alert(`${err.response?.data}`)
      }
      
      }


return(
    <div className={styles.donatesec}>
        AdminLogin
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
<form className={styles.form}>
   <div className={styles.question}>
   <label className={styles.label} >Email</label>
    <div className={styles.inputdiv}><input onChange={changeHandler.bind(this,'email')}  type="text" className={styles.input}></input></div>
    
   </div>
   <div className={styles.question}>
   <label  className={styles.label}>Password</label>



    <div className={styles.inputdiv}> <input onChange={changeHandler.bind(this,'password')}  type="password" className={styles.input} ></input></div>
    </div>
    
    
    <div className={styles.button}>
    <Button full={true} title="submit" onClick={clickHandler} className={styles.input}></Button>
  
    </div>
    
    </form>
   
        </div>
    </div>
)

}
export default AdminLogin