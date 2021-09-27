import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 8,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    productSession: {
      marginTop: 4,
    },
    control: {
      padding: theme.spacing(2),
    },
    fixedButton: {
      position: 'fixed',
      right: 8,
      zIndex:0,
      top: 20
    }
  }),
);