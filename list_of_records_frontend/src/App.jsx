import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Navbar";
import Create_list from "./components/Create_list";
import Display_list from "./components/Display_list";
import Edit_form from "./components/Edit_form";

const App=()=>{
  
  return(
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainNavbar/>}>
            <Route path="create" element={<Create_list/>}/>
            <Route path="display" element={<Display_list/>}/>
            <Route path="edit/:id" element={<Edit_form/>}/>
            </Route>
        </Routes>
      </BrowserRouter>

    
    </>
  )
}

export default App;