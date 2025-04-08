import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar' ;
import Homescreen from './screens/Homescreen';
import {BrowserRouter,Routes,Route,Links} from 'react-router-dom';
import Registerscreen from './screens/Registerscreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
//import Datetimescreen from './screens/Datetimescreen'

function App() {
  return (
    <div className="App">
  
  <Navbar/>
  <BrowserRouter>
  <Routes>
  
  <Route path = "/home" element= {<Homescreen/>}/>
  <Route path='/book/:roomid/:fromdate/:todate' element= {<Bookingscreen/>}/>
  <Route path='/register' element= {<Registerscreen/>}/>
  <Route path= '/Login' element= {<Loginscreen/>}/>
 <Route path='/profile' element= {<Profilescreen/>}/>
 <Route path='/admin' element= {<Adminscreen/>}/>
 <Route path='/' element= {<Landingscreen/>}/>
 <Route path='/datetime' element= {<datetimescreen/>}/>

  </Routes>
  </BrowserRouter>
    
    </div>
  );
}

export default App;