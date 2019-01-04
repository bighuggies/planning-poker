export interface Player {
  id: string;
  host: boolean;
  playerName: string;
}

export interface Choices {
  [key: string]: string[];
}