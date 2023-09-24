import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, Register, Login, Game, Games, GameLog } from "./pages";
import { Header } from "./components";
import { UserProvider } from "./providers";

export default function App() {
  return (
    <UserProvider>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game-log/:game_id" element={<GameLog />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </UserProvider>
  );
}