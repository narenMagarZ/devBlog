import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './component/home/home';
import CreatePost from './component/home/post/createpost';
import OpenBlog from './component/openblog/openblog';
function App() {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="app">
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/new' element={<CreatePost/>} ></Route>
        {
          location.pathname.match(/^\/[A-z0-9]{3,}\/[A-z0-9]{1,}[/]*$/) ? 
          <Route path= {`${location.pathname}`} 
          element={<OpenBlog/>} ></Route> : ''
        }
        </Routes>
    </div>
  );
}

export default App;
