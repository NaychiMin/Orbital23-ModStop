import { useEffect, useState, useContext } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link, useParams, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router'
import { ThemeContext } from "../context/recContext"



const MinorDetails = () => {

    const {id} = useParams()
    const { changed, setChanged } = useContext(ThemeContext);
    const [modules, setModules] = useState(null)
    const [coreMods, setCoreMods] = useState(null)
    let dragMods = []
    const { user } = useAuthContext();
    const email = user.email

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

    const elements = document.querySelectorAll('.product-card');
    let draggableText = null;
    let droppedBox = 0;

    elements.forEach(element => {

        element.addEventListener('dragover', e => {
            e.preventDefault();
            element.classList.add('hovered');
        });

        element.addEventListener('dragleave', () => {
            element.classList.remove('hovered');
        });

        element.addEventListener('drop', e => {
            e.preventDefault();
            element.classList.remove('hovered');
            droppedBox = element.textContent.trim(); 
        });
    });

    const handleDragStart = event => {
        draggableText = event.target.innerText;

    }

    const navigate = useNavigate()
    const location = useLocation()

    const handleDragEnd = async event => {
        dragMods = draggableText.split('\n\n')
        console.log(dragMods)
        console.log('Dropped into:', droppedBox[4]);
        droppedBox=`sem${droppedBox[4]}`
        const response = await fetch('/api/user/updatescheduleextra', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, dragMods, droppedBox })
            })
        // window.location.reload(true)
        //navigate(location.pathname)
        setChanged(!changed);
        // console.log(changed)
    }


    
    if(modules && coreMods) {
        return (
            <div>
                <div>
                    <RecSch/>
                </div>
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
                            onDragEnd={handleDragEnd}
                            onDragStart={handleDragStart}>
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