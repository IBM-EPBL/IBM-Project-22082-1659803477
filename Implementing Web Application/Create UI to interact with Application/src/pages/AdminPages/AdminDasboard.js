import { useEffect, useState } from 'react'
import LineChart from '../../components/LineChart'
import styles from './css/AdminDashboard.module.css'
import axios from 'axios'
const AdminDashboard=()=>{
    const[totaldonor,setTotaldonor]=useState(0);
    const[totalrequest,setTotalRequest]=useState(0);
    const[totaluser,setTotalUser]=useState(0);
 const details=async()=>{
    try
    { let res=await axios.get('http://127.0.0.1:5000/admin/alldonors');
    let data=res.data
    setTotaldonor( data.users.length);
    res=await axios.get('http://127.0.0.1:5000/admin/getallusers')
     data=res.data;
    
    const allrequest=data.users.filter(u=>{
        return u.donorstatus=='pending'
    })
    setTotalRequest(allrequest.length)
    const alluser=data.users.filter(u=>{
        return u.role=='user'
    })
    setTotalUser(alluser.length)
 

    


    }
    catch(err){
         console.log("dasherr",err)
    }
}
useEffect(()=>{
    details()
},[])

    return(
     <div className={styles.adminsec}>
<div className={styles.tiles}>
<div className={styles.tile}>
<div className={styles.heading}>
    Total Number Of Donors
</div>
<div className={styles.value}>
{totaldonor}

</div>
</div>
<div className={styles.tile}>
<div className={styles.heading}>
    Total Number Of Requests
</div>
<div className={styles.value}>
{totalrequest}

</div>
</div>
</div>
<div className={styles.chart}>

{  
 <LineChart  donor={totaldonor} request={totalrequest} user={totaluser}/>
 }
</div>
 </div>
    )
}
export default AdminDashboard