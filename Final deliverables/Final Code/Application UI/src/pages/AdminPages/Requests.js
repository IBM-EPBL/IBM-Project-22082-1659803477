import { useContext, useEffect, useState } from 'react';
import styles from './css/AllDonors.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
const AllDonors=()=>{
    
    const [request,setRequest]=useState([])

const details=async()=>{
try
{    let res=await axios.get('http://127.0.0.1:5000/admin/getallusers');
    let data=res.data;
    console.log('all users',data.users)
    const allrequest=data.users.filter(u=>{
        return u.donorstatus=='pending'
    })
    
    setRequest(allrequest)
}
catch(err){

}
}

useEffect(()=>{
details();
},[])


const process=async (email,status)=>{
   try 
{ const res=await axios.post('http://127.0.0.1:5000/admin/approverequest',{
    email,
    status
 })
console.log("approval sattus",res.data)
alert(` Donor  request was ${status}`)


}
catch(err){
    console.log(err);
    alert(`${err}`)
}
}




    return(
        <div className={styles.alldonors} >
<div className={styles.heading}>
    All Requests
</div>
<div className={styles.table}>

<div className={styles.tableheadingsec}>
<div className={[styles.tableheading,styles.heading1].join(" ")}>
Requested Person
</div>
<div className={styles.tableheading}>
Blood Group
</div>

<div className={styles.tableheading}>
   State
</div>
<div className={styles.tableheading}>
City
</div>
<div className={styles.tableheading}>
Action
</div>



</div>
<div className={styles.tablevaluesec}>
{
request.map(val=>{

    return(
        <div className={styles.tablesinglevalue}>
 <div className={styles.name}>
{
    val.name
}
<span className={styles.email}>{val.email}</span>
 </div>
<div className={styles.bloodgrp}><span>{val.bloodgroup}</span></div>
<div className={styles.state}>{val.state}</div>
<div className={styles.city}>{val.city}</div>
<div className={styles.buttons}>
    <div className={[styles.button,styles.approve].join(" ")} onClick={process.bind(this,val.email,"approved")}>Approve</div>
    <div className={[styles.button,styles.deny].join(" ")} onClick={process.bind(this,val.email,"deny")}>Deny</div>
</div>
</div>
    )
})

}



</div>



</div>
        </div>
    )
}
export default AllDonors