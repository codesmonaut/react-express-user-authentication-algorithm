import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        fetch(`http://localhost:3030/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            credentials: "include"
        })

        setEmail(``);
        setPassword(``);
        
        history.push(`/`);
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />                    
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button>Login</button>
            </form>
            <a href="/register">Register</a>
        </div>
    )
}

export default Login;