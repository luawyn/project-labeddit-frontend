import { GlobalContext } from "./contexts/GlobalContext";
import { GlobalState } from "./contexts/GlobalState";
import Router from "./routes/Router";

function App() {
  const context = GlobalState();

  return (
    <GlobalContext.Provider value={context}>
      <Router />
    </GlobalContext.Provider>
  );
}

export default App;
