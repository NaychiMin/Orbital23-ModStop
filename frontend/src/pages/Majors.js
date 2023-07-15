import RecSch from "../components/RecSch";
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Minors = () => {

    const { user } = useAuthContext();
    const userCourse = user.course;
    // const [minors, setMinors] = useState()

    // useEffect( () => {
    //     fetch('/api/user/minors', {
    //         method: "GET"
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data, "userData")
    //         setMinors(data)
    //     })
    // }, [])


    return ( 
        <div>
            <div>
                <RecSch />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                <h2 className="tabs">Majors</h2>
            </div>   
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                <p>welcome to majors</p>
            </div>        
        </div>
     );
}
 
export default Minors;