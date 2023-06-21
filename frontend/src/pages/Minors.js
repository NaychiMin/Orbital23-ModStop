import RecSch from "../components/RecSch";
import { useAuthContext } from "../hooks/useAuthContext"
import { useEffect, useState } from "react"


const Minors = () => {

    const { user } = useAuthContext();
    const userCourse = user.course;
    const [minors, setMinors] = useState()

    useEffect( () => {
        fetch('/api/user/minors', {
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
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                {minors && minors.map(minor => {
                        if (minor.courses.includes(userCourse)){
                            return (
                                <div className="tabs">
                                    <h3>{minor.minor}</h3>
                                </div>
                            )
                        }
                })}
            </div>        
        </div>
     );
}
 
export default Minors;