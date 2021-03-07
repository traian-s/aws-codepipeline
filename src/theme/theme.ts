import { red, green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    error: {
      main: red.A400
    },
    success: {
      main: green.A400
    }
  }
});

export default theme;
