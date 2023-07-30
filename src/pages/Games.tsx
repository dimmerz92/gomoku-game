import { useContext } from "react";
import { UserContext } from "../contexts";
import { GameItem } from "../components";

export default function Login() {
  const { games } = useContext(UserContext);

  return (
    <>
      {games?.games.map((game, i) => (
        <GameItem key={i} game={game} />
      ))}
    </>
  )
}
