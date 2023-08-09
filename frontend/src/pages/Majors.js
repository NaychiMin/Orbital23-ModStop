import RecSch from "../components/RecSch";
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { URL } from '../App.js'

const Majors = () => {

    const { user } = useAuthContext();
    const userCourse = user.course;
    const [majors, setMajors] = useState()

    useEffect( () => {
        //fetch(`${URL}/api/user/majors`, {
        fetch(`/api/user/majors`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "userData")
            setMajors(data)
        })
    }, [])


    return ( 
        <div>
            <RecSch>
            <h3 style={{ fontWeight: 'bold', backgroundColor: 'white', textAlign:'center', margin: 0 }}>Eligible Majors</h3>   
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none', flexWrap:'wrap', flexDirection:'row'}}>
                {majors && majors.map(major => {
                        if (major.courses.includes(userCourse)){
                            return (
                                <div className="tabs" key={major._id}>
                                    <Link to={`/majors/${major._id}`}>
                                        {major.major}
                                    </Link>
                                </div>
                            )
                        }
                })}
            </div> 
            </RecSch>      
        </div>
     );
}
 
export default Majors;