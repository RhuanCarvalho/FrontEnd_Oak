import { Generations } from "./components/Generations"
import "./App.css"
import { ShowTestGenoma } from './components/ShowTestGenoma';


function App() {

  return (
    <div className="div-app">
      <div className="div-title">
        <h1>Bem Vindo ao Oak!</h1>
        <ShowTestGenoma/>
      </div>
      <Generations />
    </div>
  )
}

export default App
