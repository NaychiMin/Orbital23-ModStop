import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"



const Home = () => {
    const {user} = useAuthContext()

    return (
        <div >
        <form className="login">
        <h2 className="hello">Hello {user.username}!</h2>
        <h3 className="hello">Recommended schedule for {user.course} coming soon :) </h3>
        </form>
        </div>
    )
}

export default Home