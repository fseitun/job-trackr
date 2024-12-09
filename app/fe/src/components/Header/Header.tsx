import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import { Button } from '@styles/Common.styles';
import { Link } from 'react-router';
import { HeaderContainer } from './Header.styles';
import route from '@route';

export function Header() {
    const { logout, isAuthenticated } = useContext(AuthContext);

    return (
        <HeaderContainer>
            <Link
                to={route.root}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                <h1>Job Trackr</h1>
            </Link>
            <div>
                {isAuthenticated ?
                    <Button onClick={logout}>Logout</Button>
                :   <>
                        <Link to={route.login}>
                            <Button>Login</Button>
                        </Link>
                        <Link to={route.register}>
                            <Button>Register</Button>
                        </Link>
                    </>
                }
            </div>
        </HeaderContainer>
    );
}
