import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg-color: #111111;
        --text-color: #bec7d2;
        --orange: #e09456;
        --blue: #3c70df;
        --yellow: #f7e279;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
        //overflow-y: scroll;
    }
  
    body {
        height: 100%;
        width: 100%;
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }
    p {
        //text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
    }

    h1, h2, h3 {
        color: var(--orange);
    }

    #root {
        height: 100%;
    }

    .tooltip {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 200px;
        background-color: var(--text-color);
        color: black;
        font-weight: normal;
        font-size: 13px;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        top: 150%;
        left: 50%;
        margin-left: -100px;
    }

    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent var(--text-color) transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .tooltiptextheader {
        font-weight: bold;
    }

`;

export default GlobalStyle;
