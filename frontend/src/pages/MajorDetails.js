import { useEffect, useState, useContext } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link, useParams, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router'
import { ThemeContext } from "../context/recContext"
import { URL } from '../App.js'


const MajorDetails = () => {

    const {id} = useParams()
    const { changed, setChanged } = useContext(ThemeContext);
    const [modules, setModules] = useState(null)
    const [coreMods, setCoreMods] = useState(null)
    let dragMods = []
    const { user } = useAuthContext();
    const email = user.email

    const fetchModInfo = () => {
        fetch(`${URL}/api/user/module`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "moduleData")
            setCoreMods(data)
        })
    }

    useEffect( () => {
         fetch(`${URL}/api/user/majors/` + id, {
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
        const response = await fetch(`${URL}/api/user/updatescheduleextra`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, dragMods, droppedBox })
            })
        setChanged(!changed);
    }


    
    if(modules && coreMods) {
        return (
            <div>
                <RecSch>
                <h3 style={{ fontWeight: 'bold', backgroundColor: 'white', textAlign: 'center', margin: 0 }}>
                    {modules.major}
                </h3>
                <h5 style={{ textAlign: 'center', margin: 0 }}>
                    {modules.details}
                </h5>
                <h3 style={{textAlign: 'center', margin: 0}}>Core Modules</h3>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', margin:0 }}>
                    {modules.cores.map(module => {
                        let preReqs = getPreReq(module)
                        let empty
                        if (modules.cores.length <= 1) {
                            empty = "Cores not added yet"
                        }
                        return (
                            <div draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart} style={{margin:0}}>
                                <div className="tabs">
                                    {module}
                                    {empty}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '0', marginLeft: '-5px' }}>
                                    {preReqs && preReqs.map(preReq => (
                                        <p style={{ textAlign: 'center', margin: '0', paddingLeft: '5px' }}>{preReq}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div> 
                {modules.electives.length > 1 && (<h3 style={{textAlign: 'center', margin:0}}>Electives</h3>)}
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', margin:0 }}>
                    {modules.electives.length > 1 && modules.electives.map(module => {
                        let preReqs = getPreReq(module)
                        let empty
                        if (modules.electives.length <= 1) {
                            empty = "No Electives"
                        }
                        return (
                            <div draggable onDragEnd={handleDragEnd} onDragStart={handleDragStart} style={{margin:0}}>
                                <div className="tabs">
                                    {module}
                                    {empty}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '0', marginLeft: '-5px' }}>
                                    {preReqs && preReqs.map(preReq => (
                                        <p style={{ textAlign: 'center', margin: '0', paddingLeft: '5px' }}>{preReq}</p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div> 
                </RecSch>
            </div>
        )
    }
    else {
        return(
            <div>
                <RecSch>
                <h3>Modules loading...</h3>
                </RecSch>
            </div>
        )
    }
            
}

export default MajorDetails