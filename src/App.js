import './App.css';
import {Routes, Route} from "react-router-dom";
import IndexPage from "./Page/IndexPage";
import Register from "./Page/Register";
import Login from "./Page/Login";
import Home from "./Page/Home";
import Layout from "./Layout/Layout";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
    return (
        <div className="App">
            <Layout>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/home' element={<Home />} />
                </Routes>
            </Layout>
            <ToastContainer />
        </div>
    );
}

export default App;
