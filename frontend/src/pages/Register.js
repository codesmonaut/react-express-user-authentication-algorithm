import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        fetch(`http://localhost:3030/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
            credentials: "include"
        })

        setUsername(``);
        setEmail(``);
        setPassword(``);
        history.push(`/`);
    }

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <a href="/login">Login</a>
        </div>
    )
}

export default Register;