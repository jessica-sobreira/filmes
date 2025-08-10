import { Provider } from "react-redux";
import { store, persistedStore } from "./features/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Root } from "./Root";

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistedStore}>
                    <Root />
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;