import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link, useParams } from "react-router-dom"

const MinorDetails = () => {

    const {id} = useParams()
    const [modules, setModules] = useState(null)

    useEffect( () => {
        fetch('/api/user/minors/' + id, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "userData")
            setModules(data)        
        })
    }, [])
    
    if(modules) {
        return (
            <div>
                <RecSch/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                    <h3 className="tabs">{modules.minor}</h3>
                </div>
                <p style={{textAlign: 'center'}}>{modules.details}</p>
                <h3 style={{textAlign: 'center'}}>Core Modules</h3>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                    {modules.cores.map(module => {
                        return (
                            <div className="tabs">
                                <h3>{module}</h3>
                            </div>
                        )
                    })}
                </div> 
                {modules.electives.length > 1 && (<h3 style={{textAlign: 'center'}}>Electives</h3>)}
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                    {modules.electives.length > 1 && modules.electives.map(module => {
                        return (
                            <div className="tabs">
                                <h3>{module}</h3>
                            </div>
                        )
                    })}
                </div> 
            </div>
        )
    }
    else {
        return(
            <div>
                <RecSch/>
                <h3>modules not a thing</h3>
            </div>
        )
    }
            
}

export default MinorDetails