import React from "react";
import Drawer from "material-ui/Drawer";
import { spacing, typography } from "material-ui/styles";
import { white, blue600 } from "material-ui/styles/colors";
import MenuItem from "material-ui/MenuItem";

const LeftDrawer = props => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: "pointer",
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56
    },
    menuItem: {
      color: white,
      fontSize: 14
    }
  };

  return (
    <Drawer docked={true} open={navDrawerOpen}>
      <div style={styles.logo}>Vota</div>
      <div>
        {props.menus.map((menu, index) => (
          <MenuItem
            key={index}
            style={styles.menuItem}
            primaryText={menu.text}
            leftIcon={menu.icon}
            containerElement={<NavLink to={menu.link} />}
          />
        ))}
      </div>
    </Drawer>
  );
};

export default LeftDrawer;