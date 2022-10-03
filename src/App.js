import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RecoilRoot } from 'recoil';
import './App.css';
import Main from './routes/Main';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RecoilRoot>
          <Main />
        </RecoilRoot>
      </ThemeProvider>
    </div>
  );
}

export default App;
