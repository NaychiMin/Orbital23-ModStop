import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import RecSch from '../components/RecSch'
import { Link } from "react-router-dom"

const GPASim = () => {
    const {user} = useAuthContext()

    return (
        <div >
            <p>gpa simulator</p>
        </div>
    )
}

export default GPASim