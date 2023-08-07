import { createTheme } from "react-data-table-component";

createTheme("bingo", {
  text: {
    primary: `#11111`,
    secondary: "#2aa198",
  },
  background: {
    default: "#111111",
  },

  divider: {
    default: "#46484b",
  },
  highlightOnHover: {
    default: "#181818",
    text: "#f7e279",
  },
  sortFocus: {
    default: "#f7e279",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

export const customStyles = {
  header: {
    style: {
      justifyContent: "center",
    },
  },
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "bold",
      color: "#f7e279",
      justifyContent: "center",
      paddingLeft: "35px",
    },
  },
  rows: {
    style: {
      fontSize: "15px",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40px",
    },
  },
};
