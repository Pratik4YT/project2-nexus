import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default App;
