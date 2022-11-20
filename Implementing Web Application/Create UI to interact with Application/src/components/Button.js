import { NavLink } from 'react-router-dom'
import styles from './Button.module.css'
const Button=(props)=>{
return (
    <div className={[styles.button]} >

   <div className={styles.buttonlink} onClick={props.onClick} >{props.title}</div>:
   
 

   </div>
)
}
export default Button