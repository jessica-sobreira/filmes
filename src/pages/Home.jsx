import Box from "@mui/material/Box";
import banner from "../assets/img/banner.jpg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import styled from "@mui/system/styled";


const StyledButton = styled(Button)`
  background-color: red;
  color: white;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1rem;
  width: 200px;
  height: auto;

  &:hover {
    background-color: darkred;
    color: white;
    transition: 0.9s;
    transform: ease-in-out 0.9s;
    cursor: pointer;

  }
`;

export function Home() {
  const navigate = useNavigate();

  return (
    <Box style={{ position: "relative", width: "100%", height: "100vh" }}>
      <img
        src={banner}
        alt="terror movies"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
         
          <StyledButton

            variant="contained"
            aria-label="Ir para página de filmes"
            onClick={() => navigate("/movies")}
          >
            Welcome to the Movie world
          </StyledButton>
        </Box>
      </div>
    </Box>
  );
}