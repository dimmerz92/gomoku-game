import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, Login, Game, Games, GameLog } from "./pages";
import { Header } from './components';
import { GameboardProvider, SizeProvider, TurnProvider, UserProvider } from './providers';

export default function App() {
  return (
    <SizeProvider>
      <TurnProvider>
        <GameboardProvider>
          <UserProvider>
            <Header />
            <main id="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/game" element={<Game />} />
                <Route path="/games" element={<Games />} />
                <Route path="/game-log/:id" element={<GameLog />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </UserProvider>
        </GameboardProvider>
      </TurnProvider>
    </SizeProvider>
  );
}
