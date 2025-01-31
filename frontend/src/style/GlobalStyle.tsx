import {createGlobalStyle} from "styled-components";

export const Colors = {
  bgColor: "#111111",
  rowColor: "#222222",
  highlightColor: "#333333",
  textColor: "#bec7d2",
  orange: "#e09456",
  blue: "#3c70df",
  darkBlue: "#0a2353",
  yellow: "#f7e279",
} as const;

export const ScreenWidths = {
  smallPhone: 425,
  phone: 550,
  tablet: 768,
  playerTableCutoff: 1000,
} as const;

export const ScreenHeights = {
  playerTableCutoff: 795,
} as const;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
        overflow-y: scroll;
        font-size: 95%;

        @media (max-width: ${ScreenWidths.tablet}px) {
            font-size: 60%;
        }
    }

    body {
        height: 100%;
        width: 100%;
        background-color: ${Colors.bgColor};
        color: ${Colors.textColor};
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }

    h1, h2, h3 {
        color: ${Colors.orange};
    }

    a:link, a:visited, a:hover, a:active {
        text-decoration: none;
    }

    .modal-overlay {
        background-color: rgb(210, 37, 225); /* Black with 50% opacity */
    }
`;
