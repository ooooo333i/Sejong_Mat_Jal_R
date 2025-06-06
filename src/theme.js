// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 버튼, Fab 등의 기본 색상
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;