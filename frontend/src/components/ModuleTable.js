import React, {useState, useContext} from 'react';
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
        //console.log(email)
        // const response = await fetch(`${URL}/api/user/updateschedule`, {
        const response = await fetch(`/api/user/updateschedule`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email, draggableText, draggedBox, droppedBox })
                })
        setChanged(!changed);
    };
    
    
    const columns = [
        {
            name: 'Module',
            selector: row => row.name,
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
                    {row.name}
                  </button>
                </li>
                </ul>
              )
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

    const data = [
        {
           id: 1,
           name: 'CS2040C',
           mcs: '4',
           semester: '1/2' 
        },
        {
            id: 2,
            name: 'CS1010',
            mcs: '4',
            semester: '1/2' 
         },
         {
            id: 3,
            name: 'CG1111A',
            mcs: '4',
            semester: '1' 
         },
         {
            id: 4,
            name: 'EE2026',
            mcs: '4',
            semester: '1/2' 
         }
    ]

    const [records, setRecords] = useState(data);

    function handleFilter(event) {
        const newData = data.filter(row=>{
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }


  return (
    <div>
        <div>
            Filter Modules:
            <input type="text" onChange={handleFilter} style={{margin:0}}/>
        </div>
        <DataTable
            columns={columns}
            data={records}
            fixedHeader
            pagination
        ></DataTable>
    </div>
  );
};

export default DataTableExample;
