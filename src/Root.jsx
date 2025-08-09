import { CssBaseline, ThemeProvider } from "@mui/material";
import { movieTheme } from "./features/themes/default.mode";
import { useAppSelector } from "./features/hooks";
import { darkTheme } from "./features/themes/dark.mode";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";


export function Root() {
    const defaultTheme = useAppSelector((state) => state.theme)

    const theme = defaultTheme ? movieTheme : darkTheme

    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />
        </ThemeProvider>

        </>
    )
}