import { useAuthContext } from "../hooks/useAuthContext"

const RecSch = () => {

    const {user} = useAuthContext()

    return (
        <form className="login">
            <h2 className="hello">Hello {user.username}!</h2>
            <h3 className="hello">Recommended schedule for {user.course} coming soon :) </h3>
        </form>
    )
}

export default RecSch