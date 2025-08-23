import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212', 
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff', 
        },
        primary: {
            main: '#680e34',
        },

    }
});