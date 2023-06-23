import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link } from "react-router-dom"



const Home = () => {
    const {user} = useAuthContext()

    return (
        <div >
            <RecSch/>

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', textDecoration:'none'}}>
                <Link to="/minors">
                    <div className="tabs">
                        <h3>Minors</h3>
                    </div>
                </Link>
                
                {/* <div className="tabs">
                    <h3>Majors</h3>
                </div>
                <div className="tabs">
                    <h2>Semesters</h2>
                </div>        */}
            </div>
        </div>
    )
}

export default Home