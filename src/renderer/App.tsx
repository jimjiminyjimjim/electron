import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import { SerialPort } from 'serialport';
import tableify from 'tableify';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { countAtom } from './state/atom';
import { count } from 'console';

async function listSerialPorts(): Promise<void> {
  try {
    const ports = await SerialPort.list();
    console.log('ports', ports);
  } catch (err) {
    console.error('Error element not found:', err);
  }
}

function Hello() {
  const [count, setCount] = useAtom(countAtom);

  useEffect(() => {
    listSerialPorts();
  }, []);

  return (
    <div>
      <h1 className="text-black">electron-react-boilerplate</h1>
      <div className="bg-red-400">

          <button
            type="button"
            onClick={() => setCount(count + 1)}
          >
            <span role="img" aria-label="books">
              {count}
            </span>
          </button>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
