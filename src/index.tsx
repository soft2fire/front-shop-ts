import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMuiTheme } from '@material-ui/core/styles';
import ThemeProvider from './reducer/ThemeReducer';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});
const Client = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={Client}>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </QueryClientProvider >,
  document.getElementById('root')
);
