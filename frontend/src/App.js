import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

//pages and componenets
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Minors from './pages/Minors';
import MinorDetails from './pages/MinorDetails';
import Majors from './pages/Majors';
import MajorDetails from './pages/MajorDetails';
import { ThemeProvider } from './context/recContext';

export const URL = "https://modstop-backend.onrender.com";

function App() {
  const {user} = useAuthContext()
 
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ThemeProvider>
        <div className="pages">
          <Routes>

            <Route
              path = "/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
            />
            <Route
              path = "/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
            <Route
              path = "/minors/:id"
              element={user ? <MinorDetails /> : <Navigate to="/"/>}
            />
            <Route
              path = "/minors"
              element={user ? <Minors /> : <Navigate to="/"/>}
            />
            <Route
              path = "/majors/:id"
              element={user ? <MajorDetails /> : <Navigate to="/"/>}
            />
            <Route
              path = "/majors"
              element={user ? <Majors /> : <Navigate to="/"/>}
            />
            <Route
              path = "/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
          </Routes>
        </div>
        </ThemeProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;


