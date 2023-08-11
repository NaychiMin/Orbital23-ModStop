import React, {useState, useContext, useEffect} from 'react';
import { useTable } from 'react-table';
import DataTable from 'react-data-table-component';
import { ThemeContext } from "../context/recContext"

const DataTableExample = ({email}) => {

    const { changed, setChanged } = useContext(ThemeContext);

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

    const handleDragEnd =async event => {
        console.log('Draggable Text:', draggableText);
        console.log('Dragged from:', draggedBox[4]);
        console.log('Dropped into:', droppedBox[4]);
        draggedBox=`tableOfMods`
        droppedBox=`sem${droppedBox[4]}`
         const response = await fetch(`${URL}/api/user/updateschedule`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email, draggableText, draggedBox, droppedBox })
                })
        setChanged(!changed);
    };

    //replace this with new module database
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

   

    const [records, setRecords] = useState([]);
    useEffect(() => {
        setRecords(coreMods);
    }, [coreMods]);

    function handleFilter(event) {
        const newData = coreMods.filter(row => {
            return row.module.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setRecords(newData);
    }
      
    
    const columns = [
        {
            name: 'Module',
            selector: row => row.module,
            sortable: true,
            cell: (row, index) => (
                <ul className='button-list'>
                <li className="dnd">
                  <button
                    draggable={true}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    key={index}
                  >
                    {row.module}
                  </button>
                </li>
                </ul>
              )
        },
        {
            name: 'Name of Module',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'MCs',
            selector: row => row.mcs,
            sortable: true
        },
        {
            name: 'Semester',
            selector: row => row.semester,
            sortable: true
        }
    ];


    return (
        <div>
            <div>
                Filter Modules:
                <input type="text" onChange={handleFilter} style={{ margin: 0 }} />
            </div>
            <DataTable
                columns={columns}
                data={records}
                fixedHeader
                pagination
            />
        </div>
    );
};

export default DataTableExample;
