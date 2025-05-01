import {BrowserRouter, Routes , Route} from "react-router-dom"
import Home from "./pages/home.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Dashbaord from "./pages/dashboard.jsx"
import Assesment from "./pages/assesement.jsx"
import Result  from "./pages/result.jsx"






function App() {  
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={  <Login  />} />
      <Route path='/signup' element={   <Signup />} />
      <Route path='/dashboard' element={ <Dashbaord />} />
      <Route path='/assesment' element={ <Assesment />} />
      <Route path='/likerttest' element={ <Assesment />} />
      <Route path='/result' element={<Result />} />
    </Routes>
    </BrowserRouter>
    
    
    
  )
}

export default App
