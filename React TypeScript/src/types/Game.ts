import { Move } from "./Move";

export type Game = {
  id: number;
  date: string;
  outcome: string;
  log: Move[];
};
