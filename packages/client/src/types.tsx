export type Player = {
  id: string;
  host: boolean;
  playerName: string;
};

export type Choices = {
  // card number: player id
  [key: string]: string[];
};

export type State = {
  hasChosen: boolean;
  isWaiting: boolean;
  roomId: string;
  player?: Player;
  players: Player[];
  choices: Choices;
  fields: {
    playerName: string | undefined;
  };
};
