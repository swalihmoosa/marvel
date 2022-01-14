import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Characters from './components/screens/Characters';
import Character from './components/screens/Character';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/includes/Header';


function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route element={<PrivateRoute isLoggin={true} />}>
                    <Route exact path='/' element={<Characters/>}/>
                </Route>
                <Route path="/character/:id" element={<Character />} />
                <Route path="/login/" element={<Login />}/>
                <Route path="/register/" element={<SignUp />}/>
            </Routes>
        </Router>
    )
}

export default App;