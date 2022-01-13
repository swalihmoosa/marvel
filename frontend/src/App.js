import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Characters from './components/screens/Characters';
import Character from './components/screens/Character';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Characters />} />
                    <Route path="/character/:id" element={<Character />} />
                    <Route path="/auth/login/" element={<Login />}/>
                    <Route path="/auth/register/" element={<SignUp />}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;
