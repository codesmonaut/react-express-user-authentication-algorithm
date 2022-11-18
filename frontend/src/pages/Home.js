import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:3030/user`, {
            credentials: "include"
            })
            .then(res => res.json())
            .then(data => {

                if (data.redirect) {
                    history.push(`/login`);
                }

                setUser(data);
            })
        }, 200)
    }, [])

    const handleLogOut = () => {
        const logOut = { logOut: true };

        fetch(`http://localhost:3030/log-out`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logOut),
            credentials: "include"
        })

        history.push(`/login`);
    }

    return (
        <div className="home">
            <h2>Welcome, {user && user.username}</h2>
            <h4>{user && user.email}</h4>
            <button onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default Home;