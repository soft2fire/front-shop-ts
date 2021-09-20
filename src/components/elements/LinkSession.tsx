import { Link } from "react-router-dom"
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface LinkProps {
    link: string
    children: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            textDecoration: 'none',
            color: theme.palette.text.primary
        },
    }),
);

const LinkSession = ({ link, children }: LinkProps) => {
    const classes = useStyles()
    return (
        <Link className={classes.link} to={link}>
            {children}
        </Link>
    )
}
export default LinkSession