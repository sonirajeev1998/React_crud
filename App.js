
import Navbar from "./component/layout/Navbar";
import Home from "./component/page/Home"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import AddForm from "./component/forms/AddForm";
import EditForm from "./component/forms/EditForm";
import Form from "./component/forms/Form";



function App() {
  return (
    <>
    <Router>
   <Navbar />
   
   <div className="container">
    
  <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addform" element={<AddForm/>}/>
      <Route path="/editform/:id" element={<EditForm/>}/>
      <Route path="/form/:id" element={<Form/>}/>
    
  </Routes>
     
    </div>
    </Router>
      </>
  );
}

export default App;
