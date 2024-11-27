import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';

//Blogs
import CompShowBlogs from './blog/ShowBlogs';
import CompCreateBlog from './blog/CreateBlog';
import CompEditBlog from './blog/EditBlog';


//Usuarios
import CompShowUsers from './user/ShowUsers';


import MainLayout from './components/MainLayout';
import CompCreateUser from './user/CreateUser';
import CompEditUser from './user/EditUser';
import CompIndexBlog from './blog/Index';
import CompLogin from './auth/login';


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route path='/' element={<CompIndexBlog />} />

          <Route path='/login' element={<CompLogin />} />

          <Route path="/blogs" element={<CompShowBlogs />} /> 
          <Route path="/create-blog" element={<CompCreateBlog />} /> 
          <Route path="/edit-blog/:id" element={<CompEditBlog />} /> 



          <Route path='/users' element={<CompShowUsers/>}></Route>
          <Route path='/create-user' element={<CompCreateUser/>}></Route>
          <Route path='/edit-user/:id' element={<CompEditUser/>}></Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
