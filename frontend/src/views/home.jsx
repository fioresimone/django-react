import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../Store/auth';
import Dashboard from './dashboard';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    const isLogged = isLoggedIn();

    useEffect(() => {
        if (isLogged) navigate('/dashboard');
    }, [isLogged]);

    return <div>{isLoggedIn() ? <Dashboard /> : <LoggedOutView />}</div>;
    /* return (
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    ); */
};

const LoggedInView = ({ user }) => {
    return (
        <div>
            <h1>Welcome {user.username}</h1>
            <Link to="/private">
                <button>Private</button>
            </Link>
            <Link to="/logout">
                <button>Logout</button>
            </Link>
        </div>
    );
};

export const LoggedOutView = ({ title = 'Home' }) => {
    return (
        <div>
            <h1>{title}</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
