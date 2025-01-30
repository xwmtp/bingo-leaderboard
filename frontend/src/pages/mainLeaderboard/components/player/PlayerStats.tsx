import React from "react";
import styled from "styled-components";
import {BingoPlayer} from "./playerData.ts";
import {WithTooltip} from "./Tooltip.tsx";

interface Props {
  player: BingoPlayer;
}

export const PlayerStats: React.FC<Props> = ({player}) => {
  return (
    <Stats>
      <StatColumn>
        <WithTooltip
          tooltipText={`Average of the times ${player.name} got in their latest 15 races. Ignores unfinished races, therefore favors those with more forfeits.`}
        >
          <StatRow>
            <StatText>average time</StatText>
            <p>{player.leaderboardEntry.average}</p>
          </StatRow>
        </WithTooltip>

        <WithTooltip
          tooltipText={`Median of the times ${player.name} got in their latest 15 races. Unfinished races are replaced with the worst time of the finished races. Compared to average, this is a fairer metric when it comes to forfeits.`}
        >
          <StatRow>
            <StatText>median time</StatText>
            <p>{player.leaderboardEntry.effectiveMedian}</p>
          </StatRow>
        </WithTooltip>

        <WithTooltip
          tooltipText={`Average of the aged times of ${player.name}'s latest 15 races, but ignores the worst 3 aged times (gray rows in the table). See 'About' for more info.`}
        >
          <StatRow>
            <StatText>leaderboard time</StatText>
            <p>{player.leaderboardEntry.leaderboardTime}</p>
          </StatRow>
        </WithTooltip>
      </StatColumn>

      <StatColumn>
        <WithTooltip tooltipText={`Leaderboard time converted into points.`}>
          <StatRow>
            <StatText>leaderboard score</StatText>
            <p>{player.leaderboardEntry.leaderboardScore}</p>
          </StatRow>
        </WithTooltip>

        <WithTooltip
          tooltipText={`Current amount of points ${player.name} has on the racetime.gg bingo leaderboard.`}
        >
          <StatRow>
            <StatText>racetime points</StatText>
            <p>{player.leaderboardEntry.racetimePoints}</p>
          </StatRow>
        </WithTooltip>
      </StatColumn>
    </Stats>
  );
};

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 0 1.3rem;
`;

const StatColumn = styled.div`
  display: flex;
  width: 40%;
  max-width: 14rem;
  flex-direction: column;
  justify-content: center;
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.1rem 0;
  width: 100%;
  transition: color 0.2s ease;
  &:hover {
    color: white;
  }
`;

const StatText = styled.span`
  font-weight: bold;
`;
