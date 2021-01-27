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
        overflow-y: scroll;
    }
  
    body {
        height: 100%;
        width: 100%;
        background-color: var(--bg-color);
        color: var(--text-color);
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
    }
    p {
        text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
    }


    h1 {
        color: var(--orange);
    }

    #root {
        height: 100%;
    }

`;

export default GlobalStyle;
