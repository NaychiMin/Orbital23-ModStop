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
            <RecSch>
            <h3 style={{ fontWeight: 'bold', backgroundColor: 'white', textAlign:'center', margin: 0 }}>Eligible Minors</h3> 
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none', flexWrap:'wrap', flexDirection:'row'}}>
                {minors && minors.map(minor => {
                        if (minor.courses.includes(userCourse)){
                            return (
                                <div className="tabs" key={minor._id}>
                                    <Link to={`/minors/${minor._id}`}>
                                        {minor.minor}
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
 
export default Minors;