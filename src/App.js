import "./App.css";
import { store } from "./Actions/Store";
import { Provider } from "react-redux";
import Applications from "./Components/Applications";
import { Container } from "@mui/material";

function App() {
  return (
    <Provider store={ store }>
        <Container maxWidth="xl">
          <Applications />
        </Container>
    </Provider>
  );
}

export default App;
