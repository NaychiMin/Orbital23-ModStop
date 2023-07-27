import RecSch from "../components/RecSch";
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { URL } from '../App.js'

const Minors = () => {

    const { user } = useAuthContext();
    const userCourse = user.course;
    const [minors, setMinors] = useState()

    useEffect( () => {
        fetch(`${URL}/api/user/minors`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "userData")
            setMinors(data)
        })
    }, [])


    return ( 
        <div>
            <div>
                <RecSch />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                <h2 className="tabs">Minors</h2>
            </div>   
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none', flexWrap:'wrap'}}>
                {minors && minors.map(minor => {
                        if (minor.courses.includes(userCourse)){
                            return (
                                <div className="tabs" key={minor._id}>
                                    <Link to={`/minors/${minor._id}`}>
                                        <h3>{minor.minor}</h3>
                                    </Link>
                                </div>
                            )
                        }
                })}
            </div>        
        </div>
     );
}
 
export default Minors;