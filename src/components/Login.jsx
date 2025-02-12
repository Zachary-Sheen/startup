import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import "./scripts.js";

const Login = () => {
    //use state example
    // const [data, setData] = useState([]);
    function checkLogin() {
        //check if the user's credentials are correct
        //if they are, redirect to chatroom
        //if not, redirect to signup
        email = document.getElementById("email");
        password = document.getElementById("password");
    }
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <button className="toggler-btn" type="button" onClick="toggleMenu()">
                        <i className="lni lni-menu-cheesburger"></i>
                    </button>
                    <h2 className="mx-auto"><strong>Login</strong></h2>
                </nav>
                <form method="post" action="chatroom.html"> 
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh', marginTop: '10vh' }}>
                        <div className="card text-center cardstyle shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                            <div className="card-header">
                                Input Information
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" onClick={checkLogin()} className="btn btn-dark w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;