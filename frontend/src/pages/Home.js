import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link } from "react-router-dom"

const Home = () => {
    const { user } = useAuthContext()

    return (
        <div>
            <RecSch>
                <Link to="/minors">
                    <div className="tabs">
                        View Minors
                    </div>
                </Link>

                <Link to="/majors">
                    <div className="tabs">
                        View Majors
                    </div>
                </Link>
            </RecSch>
        </div>
    )
}

export default Home