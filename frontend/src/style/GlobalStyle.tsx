import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --bg-color: #111111;
        --row-color: #222222;
        --highlight-color: #333333;
        --text-color: #bec7d2;
        --orange: #e09456;
        --blue: #3c70df;
        --dark-blue: #0a2353;
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
        
        @media screen and (max-width: 768px) {
            font-size: 10px;
        }
    }

    p {
        //text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
    }

    h1, h2, h3 {
        color: var(--orange);
    }

    a:link, a:visited, a:hover, a:active {
        text-decoration: none;
    }
`;
