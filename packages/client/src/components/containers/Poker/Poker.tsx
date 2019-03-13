import React from "react";
import { Redirect, RouteComponentProps } from "@reach/router";
import { withState, WithStateProps } from "../../utils/WithState/WithState";
import { Cards } from "../Cards/Cards";
import { Waiting } from "../Waiting/Waiting";
import { Results } from "../Results/Results";

const Poker: React.FunctionComponent<WithStateProps & RouteComponentProps> = ({
  player,
  players,
  choices,
  hasChosen,
  isWaiting
}) => {
  if (!player || !player.id) return <Redirect noThrow to="/" />;

  return (
    <section>
      {(() => {
        if (!hasChosen && !isWaiting) return <Cards />;
        if (hasChosen && isWaiting)
          return <Waiting players={players} choices={choices} />;
        if (hasChosen && !isWaiting)
          return (
            <Results player={player} players={players} choices={choices} />
          );
      })()}
    </section>
  );
};

const ContainedPoker = withState(Poker);

export { ContainedPoker as Poker };
