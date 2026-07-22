import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import OperationsPage from "./pages/OperationsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/operations"
          element={<OperationsPage />}
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/operations"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/operations"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;