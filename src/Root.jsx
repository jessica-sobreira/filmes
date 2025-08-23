import { CssBaseline, ThemeProvider } from "@mui/material";
import { movieTheme } from "./features/themes/default.mode";
import { useAppSelector } from "./features/hooks";
import { darkTheme } from "./features/themes/dark.mode";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

export function Root() {

    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);


    const currentTheme = isDarkMode ? darkTheme : movieTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>
    );
}