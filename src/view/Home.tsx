import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useChangeTheme } from '../reducer/ThemeReducer';
import useTheme from '@material-ui/core/styles/useTheme';

const Home = () => {
    const theme = useTheme();
    const changeTheme = useChangeTheme();
    return (
            <IconButton
                title="Toggle light/dark mode"
                onClick={() => changeTheme()}
            >
                {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
    )
}

export default Home;