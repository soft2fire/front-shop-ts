import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useChangeTheme } from '../reducer/ThemeReducer';
import useTheme from '@material-ui/core/styles/useTheme';
// import ChangePassword from './auth/Change';
// import { auth } from '../service/Firebase';
// import { Redirect } from 'react-router';

const Home = () => {
    const theme = useTheme();
    const changeTheme = useChangeTheme();
    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Redirect to='/login' />
    return (
        <div>
            <IconButton
                title="Toggle light/dark mode"
                onClick={() => changeTheme()}
            >
                {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </div>
    )
}

export default Home;