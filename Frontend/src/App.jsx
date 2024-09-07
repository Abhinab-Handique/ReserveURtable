

import './App.css'
import {BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './Pages/Home'
import Success from './Pages/Success'
import NotFound from './Pages/NotFound'
import Add from './Pages/Add'
import Resturants from './Pages/Resturants'
import SignUp from './Pages/SignUp'
function App() {
  

  return (
    <Router>
   <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/success" element={<Success/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
      <Route path='/add' element={<Add/>}></Route>
      <Route path='/Resturants' element={<Resturants/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
   </Routes>
   </Router>
  )
}

export default App
