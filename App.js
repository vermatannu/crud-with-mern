import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import User from './componenets/getUser/User';
import Add from './componenets/addUser/add';
import Edit from './componenets/updateUser/edit';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    },
    {
      path: "/add",
      element: <Add/>
    },
    {
      path: "/edit/:id",
      element: <Edit/>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router = {route}></RouterProvider>
      
    </div>
  );
}

export default App;
