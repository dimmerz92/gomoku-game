import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Game, Games, GameLog } from "./pages";
import { Header } from './components';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game-log/:id" element={<GameLog />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}
