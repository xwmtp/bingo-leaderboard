import React from "react";
import Modal from "react-modal";
import {BingoPlayer} from "./playerData.ts";
import {PlayerBlock} from "./PlayerBlock.tsx";
import {Colors} from "../../../../style/GlobalStyle.tsx";
import styled from "styled-components";

interface Props {
  player: BingoPlayer | undefined;
  onClose: () => void;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxWidth: "90vw",
    width: "50rem",
    maxHeight: "95vh",
    minHeight: "min(30rem, 95vh)",
    borderRadius: "0.7rem",
    borderWidth: 0,
    transform: "translate(-50%, -50%)",
    padding: "1.2rem",
    backgroundColor: Colors.bgColor,
  },
};

export const PlayerModal: React.FC<Props> = ({player, onClose}) => {
  return (
    <Modal
      isOpen={!!player}
      onRequestClose={onClose}
      contentLabel="Player statistics"
      style={customStyles}
    >
      <PlayerBlock player={player} />
      <CloseButton onClick={onClose}>╳</CloseButton>
    </Modal>
  );
};

const CloseButton = styled.button`
  position: absolute;
  color: ${Colors.yellow};
  top: 0;
  right: 0;
  padding: 0.5rem 1.2rem;
  font-size: 160%;
  font-weight: bolder;
  background-color: transparent;
  cursor: pointer;
  border: none;

  &:hover {
    color: white;
    transition: color 0.2s ease;
  }
`;
