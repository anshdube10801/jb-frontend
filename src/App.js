import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';

function App() {
  return (
   <>
   <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm/>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
