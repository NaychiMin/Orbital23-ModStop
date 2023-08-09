import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link } from "react-router-dom"
import { URL } from '../App.js'

const GPASim = () => {
    const {user} = useAuthContext()
    const email = user.email

    const selectTags = document.querySelectorAll('select');
    const [grades, setGrades]=useState(["", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D+", "D", "F"])
    
    const [sem1, setSem1] = useState(null)
    const [sem2, setSem2] = useState(null)
    const [sem3, setSem3] = useState(null)
    const [sem4, setSem4] = useState(null)
    const [sem5, setSem5] = useState(null)
    const [sem6, setSem6] = useState(null)
    const [sem7, setSem7] = useState(null)
    const [sem8, setSem8] = useState(null)
    const [semArray, setSemArray] = useState([])
    const [activeTab, setActiveTab] = useState(0);

    const [expectedGrades, setExpectedGrades] = useState(Array(semArray.length).fill(''));
    const [actualGrades, setActualGrades] = useState(Array(semArray.length).fill(''));
    const [expectedGPA, setExpectedGPA] = useState(0.0)
    const [actualGPA, setActualGPA] = useState(0.0)
 
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
    }, [semArray, expectedGPA, actualGPA])

    const clickSem = sem => e => {
        setExpectedGPA(0.0)
        setActualGPA(0.0)
        setActiveTab(sem)
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
        selectTags.forEach(selectTag => {
            selectTag.value = grades[0]
        })   
    }

    const handleExpectedGradeChange = (index, value) => {
        const updatedExpectedGrades = [...expectedGrades];
        updatedExpectedGrades[index] = value;
        setExpectedGrades(updatedExpectedGrades);
      };
    
      const handleActualGradeChange = (index, value) => {
        const updatedActualGrades = [...actualGrades];
        updatedActualGrades[index] = value;
        setActualGrades(updatedActualGrades);
      };

    const calculateGPA = grades => {
        let gpa = 0.0
        grades.forEach (grade => {
            console.log("grade:" , grade)
            if (grade === "A+" || grade === "A") gpa += 5.0
            else if (grade === "A-") gpa += 4.5
            else if (grade === "B+") gpa += 4.0
            else if (grade === "B") gpa += 3.5
            else if (grade === "B-") gpa += 3.0
            else if (grade === "C+") gpa += 2.5
            else if (grade === "C") gpa += 2.0
            else if (grade === "D+") gpa += 1.5
            else if (grade === "D") gpa += 1.0
            else gpa += 0.0
        })
        console.log("GPA:", gpa)
        console.log("No. of mods:", grades.length)
        gpa /= grades.length
        return gpa
    }

    const getGPA = () => {
        console.log('Expected Grades:', expectedGrades);
        console.log('Actual Grades:', actualGrades);
        setExpectedGPA(calculateGPA(expectedGrades));
        setActualGPA(calculateGPA(actualGrades));
        console.log('Expected GPA:', expectedGPA);
        console.log('Actual GPA:', actualGPA);
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>GPA Simulator</h2>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 className={`sem-tabs ${activeTab === 1 ? 'active-tab' : ''}`} onClick={clickSem(1)}>Sem 1</h3>
                    <h3 className={`sem-tabs ${activeTab === 2 ? 'active-tab' : ''}`} onClick={clickSem(2)}>Sem 2</h3>
                    <h3 className={`sem-tabs ${activeTab === 3 ? 'active-tab' : ''}`} onClick={clickSem(3)}>Sem 3</h3>
                    <h3 className={`sem-tabs ${activeTab === 4 ? 'active-tab' : ''}`} onClick={clickSem(4)}>Sem 4</h3>
                    <h3 className={`sem-tabs ${activeTab === 5 ? 'active-tab' : ''}`} onClick={clickSem(5)}>Sem 5</h3>
                    <h3 className={`sem-tabs ${activeTab === 6 ? 'active-tab' : ''}`} onClick={clickSem(6)}>Sem 6</h3>
                    {sem7 && sem7.length > 0 && <h3 className={`sem-tabs ${activeTab === 7 ? 'active-tab' : ''}`} onClick={clickSem(7)}>Sem 7</h3>}
                    {sem8 && sem8.length > 0 && <h3 className={`sem-tabs ${activeTab === 8 ? 'active-tab' : ''}`} onClick={clickSem(8)}>Sem 8</h3>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <table className="mod-table">
                        <tr>
                            <td>Module</td>
                            <td>Expected Grade</td>
                            <td>Actual Grade</td>
                        </tr>
                        {semArray && semArray.map( (module, index) =>
                            <tr key={index}>
                                <td>{module}</td>
                                <td>
                                    <select onChange={(e) => handleExpectedGradeChange(index, e.target.value)}>
                                        {grades.map((grade, index) => (
                                            <option key={index}>{grade}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select onChange={(e) => handleActualGradeChange(index, e.target.value)}>
                                        {grades.map((grade, index) => (
                                            <option key={index}>{grade}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>)}
                    </table>
                    <div>
                        <table className="gpa-table">
                            <tr>
                                <td>Expected GPA:</td>
                                <td>{expectedGPA}</td>
                            </tr>
                            <tr>
                                <td>Actual GPA:</td>
                                <td>{actualGPA}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ textAlign: 'center' }}>
                                    <button onClick={getGPA}>Calculate GPA</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default GPASim