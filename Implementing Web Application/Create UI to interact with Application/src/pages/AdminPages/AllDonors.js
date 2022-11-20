import { useEffect, useState } from 'react';
import styles from './css/AllDonors.module.css';
import axios from 'axios';
const AllDonors=()=>{
  
    const [donors,setDonors]=useState([])

const details=async()=>{
try
{    let res=await axios.get('http://127.0.0.1:5000/admin/alldonors');
    let data=res.data;
    console.log('all donor',data.users)
    setDonors(data.users)

}
catch(err){

}
}

useEffect(()=>{
details();
},[])

    return(
        <div className={styles.alldonors} >
<div className={styles.heading}>
    All Verfied  Donors
</div>
<div className={styles.table}>

<div className={styles.tableheadingsec}>
<div className={[styles.tableheading,styles.heading1].join(" ")}>
    Donor Name
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



</div>
<div className={styles.tablevaluesec}>

{
    donors.map((donor)=>{
        return(
            <div className={styles.tablesinglevalue}>
 <div className={styles.name}>
{donor.NAME}
<span className={styles.email}>{donor.EMAIL}</span>
 </div>
<div className={styles.bloodgrp}><span>{donor.BLOODGROUP}</span></div>
<div className={styles.state}>{donor.STATE}</div>
<div className={styles.city}>{donor.CITY}</div>

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


