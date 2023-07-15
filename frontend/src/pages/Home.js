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

                <Link to="/majors">
                    <div className="tabs">
                        <h3>Majors</h3>
                        <p>implementing...</p>
                    </div>
                </Link>

                <div className="tabs">
                    <h3>Semesters</h3>
                    <p>(not implemented yet)</p>
                </div>       
            </div>
        </div>
    )
}

export default Home