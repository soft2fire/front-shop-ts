import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      // maxHeight:330
      minHeight: 380
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

    description: {
      // maxHeight: 10,
      color: theme.palette.text.primary
    },
    price: {
      fontWeight: 'bold',
    },
    title: {
      marginTop: 4,
      color: theme.palette.text.primary,
      fontWeight: 'bold',
      fontSize: '1.2rem',
      '@media (min-width:600px)': {
        fontSize: '0.5rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
      },
    },
  }),
);