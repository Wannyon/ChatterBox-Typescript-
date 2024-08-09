import React, { useState } from "react";
import axios from 'axios';

interface LoginProps {
    onLogin: (username: string) => void;
};

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:3000/login', { username, password });
            alert(response.data.message);
            onLogin(username);
        } catch (err) {
            alert(err.response.data.error);
        }
    };

    return (
        <form onSubmit={ handleLogin }>
            <input
                type='text'
                value={ username }
                onChange={ (e) => setUsername(e.target.value) }
                placeholder='Username'
                required
            />
            <input
                type='password'
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                placeholder='Password'
                required
            />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;