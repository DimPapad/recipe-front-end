import axios from "axios";
import { useEffect, useState } from "react";

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";

const LoginPageA = ({ setJwtToken, setLoggedInUser }) => {
    const location = useLocation()
    useEffect(()=>{
        if (location.state!==null){
            setUser({username:location.state.email,password:location.state.password})
        }
    },[])
    // console.log(location.state);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleFormChange = (e) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const tempUser = { ...user }
        tempUser[fieldName] = fieldValue;
        setUser(tempUser);
    }

    const handleLoginForm = (e) => {
        e.preventDefault();
        const apilogin = axios.create({
            baseURL: "http://localhost:8080/login"
        })
        var bodyFormData = new FormData();
        bodyFormData.append('username', user.username);
        bodyFormData.append('password', user.password);

        apilogin.post('', bodyFormData).then(res => {
            //efoson iparxei to token prepei na iparxei se kathe neo request
            setJwtToken(res.headers['access_token']);
            setLoggedInUser({
                name: res.headers['username'],
                email: res.headers['useremail'],
                id: res.headers['userid']
            });
            navigate('/', { replace: true })
        }).catch(err => console.log("error", err))
    }
    return (
        <Form id="login-form" onSubmit={handleLoginForm}>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={user.username}
                    name='username'
                    onChange={handleFormChange}
                    required
                    autoFocus
                    autoComplete="email"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={user.password}
                    onChange={handleFormChange}
                    required
                />
            </Form.Group>


            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default LoginPageA