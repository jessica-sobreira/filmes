import { AppBar, Switch, Toolbar, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { toggleTheme } from "../features/modules/themeSlice";


const ToolbarStyled = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


export const Header = () => {

    const dispatch = useAppDispatch();
    

    const isDarkMode = useAppSelector((state) => state.theme.darkMode);

    const otherTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <AppBar position="static" style={{ padding: "8px" }}>
            <ToolbarStyled>
                <div>

                    <Switch 
                      onChange={otherTheme} 
                      color="default"
                      checked={isDarkMode} 
                    />
                </div>
            </ToolbarStyled>
        </AppBar>
    );
};