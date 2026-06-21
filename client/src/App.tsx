import {Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './auth/useAuth'

function App() {

  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Auth />}/>
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
        <Route path="/home" element={<Home />}/>
      </Route>
      
    </Routes>
  )
}

export default App
