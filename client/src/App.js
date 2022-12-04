import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home';
import TopBar from './components/topbar';
import Single from './pages/single';
import Write from './pages/write';
import Settings from './pages/settings';
import Login from './pages/login';
import Register from './pages/register';
import Category from './pages/category';
import About from './pages/about';
import Contact from './pages/contact';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/write"
          element={user ? <Write /> : <Navigate to="/register" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/register" />}
        />
        <Route path="/post/:posdId" element={<Single />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
