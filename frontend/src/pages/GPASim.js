import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link } from "react-router-dom"
import { URL } from '../App.js'

const GPASim = () => {
    const {user} = useAuthContext()
    const email = user.email

    const [grades, setGrades]=useState(["", "A+", "A", "A-", "B+", "B", "B-", "C+"])
    
    const [sem1, setSem1] = useState(null)
    const [sem2, setSem2] = useState(null)
    const [sem3, setSem3] = useState(null)
    const [sem4, setSem4] = useState(null)
    const [sem5, setSem5] = useState(null)
    const [sem6, setSem6] = useState(null)
    const [sem7, setSem7] = useState(null)
    const [sem8, setSem8] = useState(null)
    const [semArray, setSemArray] = useState(null)
 
    useEffect( () => {
        fetch(`${URL}/api/user/recommendedSchedule?email=${email}`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
          const record = data[0];
          console.log(record)

            setSem1(record.sem1);
            setSem2(record.sem2);
            setSem3(record.sem3);
            setSem4(record.sem4);
            setSem5(record.sem5);
            setSem6(record.sem6);
            setSem7(record.sem7);
            setSem8(record.sem8);
        })
    }, [semArray])

    const clickSem = sem => e => {
        console.log(sem)
        switch(sem) {
            case 1: setSemArray(sem1); break;
            case 2: setSemArray(sem2); break;
            case 3: setSemArray(sem3); break;
            case 4: setSemArray(sem4); break;
            case 5: setSemArray(sem5); break;
            case 6: setSemArray(sem6); break;
            case 7: setSemArray(sem7); break;
            case 8: setSemArray(sem8); break;
            default: setSemArray(sem1); break;
        }
        console.log(semArray)
    }

    return (
        <div >
            <p>GPA Simulator</p>
            <div>
                <div>
                    <h2 className="tabs" onClick={clickSem(1)}>Sem 1</h2>
                    <h2 className="tabs" onClick={clickSem(2)}>Sem 2</h2>
                    <h2 className="tabs" onClick={clickSem(3)}>Sem 3</h2>
                    <h2 className="tabs" onClick={clickSem(4)}>Sem 4</h2>
                    <h2 className="tabs" onClick={clickSem(5)}>Sem 5</h2>
                    <h2 className="tabs" onClick={clickSem(6)}>Sem 6</h2>
                    {sem7 && sem7.length > 0 && <h2 className="tabs" onClick={clickSem(7)}>Sem 7</h2>}
                    {sem8 && sem8.length > 0 && <h2 className="tabs" onClick={clickSem(8)}>Sem 8</h2>}
                </div>
                <div>
                    <table>
                        <tr>
                            <td>Module</td>
                            <td>Expected Grade</td>
                            <td>Actual Grade</td>
                        </tr>
                        {semArray && semArray.map(module =>
                            <tr>
                                <td>{module}</td>
                                <td>
                                    <select>
                                        {grades.map(grade=><option>{grade}</option>)}
                                    </select>
                                </td>
                                <td>
                                <select>
                                    {grades.map(grade=><option>{grade}</option>)}
                                </select>
                                </td>
                            </tr>)}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GPASim