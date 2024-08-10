import React, { useState } from "react";
import axios from 'axios';

interface LoginProps {
    onLogin: (accessToken: string) => void;
};

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });

            const accessToken = response.data;
            onLogin(accessToken);
            setError(null);
        } catch (err) {
            alert(err.response.data)
            if (err.response && err.response.status === 400) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred while logging in');
            }
        }
    };

    return (
        <form onSubmit={ handleLogin }>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={ username }
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;