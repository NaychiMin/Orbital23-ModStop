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
        fetch(`${URL}/api/user/majors`, {
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
            <div>
                <RecSch />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                <h2 className="tabs">Majors</h2>
            </div>   
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none', flexWrap:'wrap'}}>
                {majors && majors.map(major => {
                        if (major.courses.includes(userCourse)){
                            return (
                                <div className="tabs" key={major._id}>
                                    <Link to={`/majors/${major._id}`}>
                                        <h3>{major.major}</h3>
                                    </Link>
                                </div>
                            )
                        }
                })}
            </div>       
        </div>
     );
}
 
export default Majors;