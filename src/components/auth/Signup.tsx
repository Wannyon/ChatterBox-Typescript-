import React, {FormEvent, useState} from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { username, password });
            alert(response.data);
        } catch (err) {
            alert(err.response.data);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;