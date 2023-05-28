import { useGetAll } from "hooks";
import RoutesWrapper from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useGetAll({ url: "/myself", name: "me" });
  return (
    <div className="App">
      <ToastContainer />
      <RoutesWrapper />
    </div>
  );
}

export default App;
