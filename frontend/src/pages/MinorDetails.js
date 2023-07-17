import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link, useParams } from "react-router-dom"

const MinorDetails = () => {

    const {id} = useParams()
    const [modules, setModules] = useState(null)
    const [coreMods, setCoreMods] = useState(null)

    const fetchModInfo = () => {
        fetch('/api/user/module', {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "moduleData")
            setCoreMods(data)
        })
    }

    useEffect( () => {
        fetch('/api/user/minors/' + id, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "userData")
            setModules(data) 
            fetchModInfo()   
        })
    }, [])

    const getPreReq = modCode => {
        let preReqs
        coreMods.forEach(mod => {
            if (mod.code === modCode) {
                preReqs = mod.prerequisites
                console.log(preReqs)
            }
        })
        return preReqs
    }

    const handleDragEnd = event => {
        
    }
    
    if(modules && coreMods) {
        return (
            <div>
                <RecSch/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                    <h3 className="tabs">{modules.minor}</h3>
                </div>
                <p style={{textAlign: 'center'}}>{modules.details}</p>
                <h3 style={{textAlign: 'center'}}>Core Modules</h3>
                <div style={{display: 'flex',  justifyContent:'center', textDecoration:'none', verticalAlign: 'top', flexWrap:'wrap'}}>
                    {modules.cores.map(module => {
                        let preReqs = getPreReq(module)
                        let empty
                        if (modules.cores.length <= 1) {
                            empty = "Cores not added yet"
                        }
                        return (
                            <div
                            draggable
                            onDragEnd={this.handleDragEnd}>
                                <div className="tabs">
                                    <h3>{module}</h3>
                                    <p>{empty}</p>
                                </div>
                                <div>
                                    {preReqs && preReqs.map(preReq => (
                                        <p style={{textAlign: 'center'}}>{preReq}</p>
                                    ))}
                                    {!preReqs && !empty && <p style={{textAlign: 'center'}}>Not added yet</p>}
                                </div>
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
                <h3>Modules loading...</h3>
            </div>
        )
    }
            
}

export default MinorDetails