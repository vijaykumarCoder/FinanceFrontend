import React from 'react'
import './App.css';
import Login from './components/Login';
import Topbar from './components/Topbar';
import Upload from './components/Upload';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router
} from 'react-router-dom'

function App() {
  return (
   <>
    <Router>
      <div>
      <Topbar />
      </div>
      <Routes>
      {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
      <Route  path="/login" element={ <Login />} />
      </Routes>
    <Routes>
        <Route  path="/" element={<Upload />} />
</Routes>
    </Router>
   
   
   </>
  );
}

export default App;
