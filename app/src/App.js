import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './component/home/home';
import CreatePost from './component/home/post/createpost';
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/new' element={<CreatePost/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
