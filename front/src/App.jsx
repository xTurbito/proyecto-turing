import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';

//Blogs
import CompShowBlogs from './blog/ShowBlogs';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';


//Usuarios
import CompShowUsers from './user/ShowUsers';
import CompCreateUser from './user/CreateUser';
import CompEditUser from './user/EditUser';

//Slide-Principal
import CompShowSlidePrincipal from './slidePrincipal/ShowSlidePrincipal';
import CompCreateSlidePrincipal from './slidePrincipal/CreateSlidePrinicipal';
import CompEditSlidePrincipal from './slidePrincipal/EditSlidePrincipal';


//Slide-Desarrollos
import CompShowSlideDesarrollos from './slideDesarrollos/ShowSlideDesarrollos';
import CompCreateSlideDesarrollos from './slideDesarrollos/CreateSlideDesarrollos';
import CompEditSlideDesarrollos from './slideDesarrollos/EditSlideDesarrollos';

//Socios
import CompShowSocios from './socios/ShowSocios';
import CompCreateSocio from './socios/CreateSocios';
import CompEditSocio from './socios/EditSocio';


import MainLayout from './components/MainLayout';

import CompIndexBlog from './blog/Index';
import CompLogin from './auth/login';
import WelcomeMessage from './user';






function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route path='/' element={<CompIndexBlog />} />

          <Route path='/login' element={<CompLogin />} />
          <Route path='/welcome' element={<WelcomeMessage />} />

          {/* BLOGS */}
          <Route path="/blogs" element={<CompShowBlogs />} /> 
          <Route path="/create-blog" element={<CompCreateBlog />} /> 
          <Route path="/edit-blog/:id" element={<CompEditBlog />} /> 


        {/* SLIDE PRINCIPAL */}
          <Route path='/slide-principal' element={<CompShowSlidePrincipal/>} />
          <Route path='/create-slide-principal' element={<CompCreateSlidePrincipal />} />
          <Route path='/edit-slide-principal/:id' element={<CompEditSlidePrincipal />} />

          {/* SLIDE DESARROLLOS */}
          <Route path='/slide-desarrollos' element={<CompShowSlideDesarrollos />} />
          <Route path='/create-slide-desarrollos' element={<CompCreateSlideDesarrollos />} />
          <Route path='/edit-slide-desarrollos/:id' element={<CompEditSlideDesarrollos />} />

          
          {/* SOCIOS */}
          <Route path='/socios' element={<CompShowSocios />} />
          <Route path='/create-socio' element={<CompCreateSocio/>} />
          <Route path='/edit-socio/:id' element={<CompEditSocio/>} />

          <Route path='/users' element={<CompShowUsers/>}></Route>
          <Route path='/create-user' element={<CompCreateUser/>}></Route>
          <Route path='/edit-user/:id' element={<CompEditUser/>}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
