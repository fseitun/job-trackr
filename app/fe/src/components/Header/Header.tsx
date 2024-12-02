import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/styles/Common.styles';
import { Link } from 'react-router';
import { HeaderContainer } from './Header.styles';

export function Header() {
    const { logout, isAuthenticated } = useContext(AuthContext);

    return (
        <HeaderContainer>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Job Trackr</h1>
            </Link>
            <div>
                {isAuthenticated ?
                    <Button onClick={logout}>Logout</Button>
                :   <>
                        <Link to="/login">
                            <Button>Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                    </>
                }
            </div>
        </HeaderContainer>
    );
}
