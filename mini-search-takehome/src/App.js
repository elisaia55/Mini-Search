import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import UniversalSearch from './Components/UniversalSearch';
import ButtonAppBar from './Components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
    <ButtonAppBar/>
    <Routes>
    <Route path='/' element={<UniversalSearch />} />
    </Routes>
    </BrowserRouter>
  ); 
}

export default App;
