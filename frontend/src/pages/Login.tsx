import React, {SyntheticEvent, useState, useCallback} from 'react';
import {useNavigate} from "react-router-dom";

const Login = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = useCallback(async (e: SyntheticEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'omit',
                body: JSON.stringify({
                    email,
                    password
                })
            });
    
            console.log('Response status:', response.status);
    
            if (!response.ok) {
                throw new Error("Login failed");
            }
    
            const content = await response.json();
    
            console.log('Response content:', content);
    
            props.setName(content.name);
            navigate('/', { replace: true });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }, [email, password, navigate, props]);

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email"  name="email" className="form-control" placeholder="Email address" autoComplete="on" required
                   onChange={e => setEmail(e.target.value)}
            />

            <input type="password"  name="password" className="form-control" placeholder="Password"  required
                   onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;