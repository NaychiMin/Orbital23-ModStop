import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [course, setCourse] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [values,setValues]=useState(["","Computer Engineering","Electrical Engineering"]) //,"Mechanical Engineering", "Engineering Science"])
  const [track, setTrack] = useState("Non Polytechnic")

  console.log(values)


  const handleSubmit = async (e) => {
    e.preventDefault()
    //setCourse('ceg')

    await signup(email, password, username, course, track)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />

      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />

      <label>Course:</label>
      <select onChange={(e)=>setCourse(e.target.value)}>
        {
          values.map((major,i)=><option>{major}</option>)
        }
      </select>

      <label>Track:</label>
      <select
          value={track}
          onChange={(e) => setTrack(e.target.value)}
        >
          <option value="Non Polytechnic">Non Polytechnic</option>
          <option value="Polytechnic">Polytechnic</option>
        </select>


      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup