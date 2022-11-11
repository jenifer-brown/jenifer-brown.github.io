import App from './App'
import './index.css'


function Maker() {
  return <p> this is a paragraph</p>;
}

const root = ReactDOM.createRoot(document.querySelector("#maincontent"));
root.render(<App />);

