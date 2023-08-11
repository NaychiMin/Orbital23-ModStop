import { useAuthContext } from "../hooks/useAuthContext";
import React, { useRef, useState, useEffect, useContext} from 'react';
import { isEqual } from 'lodash';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from "../context/recContext";
import { URL } from '../App.js'
import DataTableExample from './ModuleTable';
import { useTable } from 'react-table';

const RecSch = ({children}) => {
    const { user } = useAuthContext();
    const email = user.email
    const containerRef = useRef(null);
    const {changed, setChanged} = useContext(ThemeContext);
    const [sem1, setSem1] = useState([])
    const [sem2, setSem2] = useState([])
    const [sem3, setSem3] = useState([])
    const [sem4, setSem4] = useState([])
    const [sem5, setSem5] = useState([])
    const [sem6, setSem6] = useState([])
    const [sem7, setSem7] = useState([])
    const [sem8, setSem8] = useState([])
    const [sem1mcs, setSem1mcs] = useState("")
    const [sem2mcs, setSem2mcs] = useState("")
    const [sem3mcs, setSem3mcs] = useState("")
    const [sem4mcs, setSem4mcs] = useState("")
    const [sem5mcs, setSem5mcs] = useState("")
    const [sem6mcs, setSem6mcs] = useState("")
    const [sem7mcs, setSem7mcs] = useState("")
    const [sem8mcs, setSem8mcs] = useState("")


    
    const [coreMods, setCoreMods] = useState([]);
    useEffect(() => {
        fetch(`${URL}/api/user/moduletable`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const transformedData = data.map((item, index) => ({
                    id: index + 1,
                    module: item.module,
                    mcs: item.mcs,
                    semester: item.semester,
                    name: item.name
                }));
                setCoreMods(transformedData);
                console.log(transformedData)
            });
    }, []);

    function sumMcsArray(moduleCodes, moduleRecords) {
        const mcsArray = moduleCodes.map(moduleCode => {
          const moduleRecord = moduleRecords.find(record => record.module === moduleCode);
          return moduleRecord ? parseInt(moduleRecord.mcs) || 0 : 0; 
        });
      
        const totalSum = mcsArray.reduce((sum, mcs) => sum + mcs, 0);
        return totalSum;
      }

    useEffect( () => {
        fetch(`${URL}/api/user/recommendedSchedule?email=${email}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          const record = data[0];

            setSem1(record.sem1);
            setSem2(record.sem2);
            setSem3(record.sem3);
            setSem4(record.sem4);
            setSem5(record.sem5);
            setSem6(record.sem6);
            setSem7(record.sem7);
            setSem8(record.sem8);
    
        })
    }, [changed])

    useEffect(() => {
        setSem1mcs(sumMcsArray(sem1, coreMods));
        setSem2mcs(sumMcsArray(sem2, coreMods));
        setSem3mcs(sumMcsArray(sem3, coreMods));
        setSem4mcs(sumMcsArray(sem4, coreMods));
        setSem5mcs(sumMcsArray(sem5, coreMods));
        setSem6mcs(sumMcsArray(sem6, coreMods));
        setSem7mcs(sumMcsArray(sem7, coreMods));
        setSem8mcs(sumMcsArray(sem8, coreMods));
      }, [sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8])

    console.log(sem8mcs, 'sem8')


    const handleNextClick = (event) => {
        event.preventDefault();
        containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    };


    const handlePreviousClick = (event) => {
        event.preventDefault();
        containerRef.current.scrollLeft -= containerRef.current.offsetWidth;
    };

    const elements = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.dnd button');

    let draggableText = null;
    let draggedBox = 0;
    let droppedBox = 0;

    elements.forEach(element => {
    // Listen for dragstart event on each button inside the div
        element.querySelectorAll('.dnd button').forEach(button => {
            button.addEventListener('dragstart', e => {
            draggableText = e.target.textContent;
            draggedBox = element.textContent.trim(); 

            });
        });

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
        draggableText = event.target.textContent;
    };

    const location = useLocation();

    const handleDragEnd =async event => {
        console.log('Draggable Text:', draggableText);
        console.log('Dragged from:', draggedBox[4]);
        console.log('Dropped into:', droppedBox[4]);
        draggedBox=`sem${draggedBox[4]}`
        droppedBox=`sem${droppedBox[4]}`
         const response = await fetch(`${URL}/api/user/updateschedule`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email, draggableText, draggedBox, droppedBox })
                })
        setChanged(!changed);
    };
    

    return (
        <>
            <div className="recSched">
                <div class="box box1">
                    <div class="product-card">
                        <div class="section-top">Sem 1</div>
                            <ul class="button-list">
                                {
                                    sem1 && sem1.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem1mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 2</div>
                            <ul class="button-list">
                                {
                                    sem2 && sem2.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem2mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 3</div>
                            <ul class="button-list">
                                {
                                    sem3 && sem3.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem3mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 4</div>
                            <ul class="button-list">
                                {
                                    sem4 && sem4.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem4mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 5</div>
                            <ul class="button-list">
                                {
                                    sem5 && sem5.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem5mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 6</div>
                            <ul class="button-list">
                                {
                                    sem6 && sem6.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem6mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 7</div>
                            <ul class="button-list">
                                {
                                    sem7 && sem7.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem7mcs} MCs</div>
                    </div>
                    <div class="product-card">
                        <div class="section-top">Sem 8</div>
                            <ul class="button-list">
                                {
                                    sem8 && sem8.map((course, index) => (
                                        <li className="dnd" >
                                        <button draggable={true} onDragEnd={handleDragEnd} onDragStart={handleDragStart} key={index}>{course}</button>
                                        </li>
                                    ))
                                }
                                </ul>
                        <div class="section-bottom">{sem8mcs} MCs</div>
                    </div>
                    <div class="product-card">Remove Module</div>
                </div>
                <div class="box box2">        
                     {children}
                </div>
            </div>
            <DataTableExample email={email} coreMods={coreMods}/>
           
        </>
        
    );
}

export default RecSch;
