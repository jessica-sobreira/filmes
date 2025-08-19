import { AppBar, Switch, Toolbar, styled, Typography, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { toggleTheme } from "../features/modules/themeSlice";
import { useNavigate } from "react-router-dom";

const ToolbarStyled = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled(Typography)`
    flex-grow: 1;
`;

const ButtonStyled = styled(Button)`
    height: 50px;
    width: 50px;
    color: black;
    font-weight: bolder;
    background-color: white;

`;

export const Header = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

    const otherTheme = () => {
        dispatch(toggleTheme());
    };

    return (
         <AppBar position="static" style={{ padding: "8px" }}>
            <ToolbarStyled>
                <Title variant="h5" sx={{ fontWeight: "bold" }}>My Movies</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch 
                        onChange={otherTheme} 
                        color="default"
                        checked={isDarkMode} 
                    />
                <ButtonStyled onClick={() => navigate('/favoritos')}>  <FavoriteIcon /></ButtonStyled> 
                </div>
            </ToolbarStyled>
        </AppBar>
    
        
    
    );
};