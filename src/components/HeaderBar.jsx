import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import Menu from "material-ui/svg-icons/navigation/menu";
import ViewModule from "material-ui/svg-icons/action/view-module";
import { white } from "material-ui/styles/colors";
import auth from "../auth/authenticator";
import SearchBox from "./SearchBox";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

class HeaderBar extends React.Component {
  handleClose = () => {
    auth.logOut();
    window.location.pathname = "/";
  };

  render() {
    const { styles, handleChangeRequestNavDrawer } = this.props;

    const style = {
      appBar: {
        position: "fixed",
        top: 0,
        overflow: "hidden",
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          // title={<SearchBox />}
          iconElementLeft={
            <Link to="/">
              <IconButton color={white}>
                <HomeIcon color={white} />
              </IconButton>
            </Link>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu
                color={white}
                iconButtonElement={
                  <IconButton>
                    <ViewModule color={white} />
                  </IconButton>
                }
                targetOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <Link to="/changePassword/">
                  <MenuItem key={1} primaryText="Change Password" />
                </Link>
                <MenuItem onClick={this.handleClose} primaryText="Sign Out" />
              </IconMenu>
            </div>
          }
        />
      </div>
    );
  }
}

export default HeaderBar;
