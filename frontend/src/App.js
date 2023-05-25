import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';


function App() {


  const { currentUser } = useContext(AuthContext)
  const ProtectedRouter = ({ children }) => { 
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children 
  }

  const ProtectedPage = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={
            <ProtectedRouter>
            <Homepage />
             </ProtectedRouter>
          } />
          <Route path='/login' element={
            < ProtectedPage>
            <LoginPage />
            </ ProtectedPage>
          } />

          <Route path='/register' element={<RegisterPage/>} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
