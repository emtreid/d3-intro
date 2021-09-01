import "./App.css";
import { DepthChart } from "./components/DepthChart";
import { getData } from "./util/formatData";

function App() {
  const { buyData, sellData } = getData();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Intro to D3</h1>
      </header>
      <div className="content">
        <DepthChart
          sellData={sellData}
          buyData={buyData}
          width={500}
          height={250}
        />
      </div>
    </div>
  );
}

export default App;
