import "./App.css";
import BessInfo from "./components/BessInfo";
import logo from "./Assets/logo.png"
function App() {
  return (
    <div>
    <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
      <BessInfo />
    </div>
  );
}

export default App;
