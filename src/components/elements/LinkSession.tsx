import { Link } from "react-router-dom"
import { useLinkSessionStyles } from "./elements.styles";

interface LinkProps {
    link: string
    children: any
}

const LinkSession = ({ link, children }: LinkProps) => {
    const classes = useLinkSessionStyles()
    return (
        <Link className={classes.link} to={link}>
            {children}
        </Link>
    )
}
export default LinkSession