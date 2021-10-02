import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Wrapper: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      padding: 8
    },
  }),
);