import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
const Navbar = (props) => {
  const [menu, setMenu] = useState("");
  const handleClose = (e) => {
    setMenu("");
    if (e.target.value !== "/profile") {
      localStorage.removeItem("base64");
    }
    switch (e.target.value) {
      case 2:
        props.history.push("/signUp");
        return;
      case 3:
        props.history.push("/profile");
        return;
      default:
        props.history.push("/logIn");
        return;
    }
  };
  return (
    <div className='d-flex justify-content-between m-5'>
      <h1>User platform</h1>

      <Button aria-controls='simple-menu' aria-haspopup='true' onClick={(e) => setMenu(e.currentTarget)}>
        <MenuIcon />
      </Button>
      <Menu id='simple-menu' anchorEl={menu} className='mt-5' keepMounted open={menu} onClose={handleClose}>
        <MenuItem onClick={handleClose} value='1'>
          Log in
        </MenuItem>
        <MenuItem onClick={handleClose} value='2'>
          Sign Up
        </MenuItem>
        <MenuItem onClick={handleClose} value='3'>
          My account
        </MenuItem>
        <MenuItem onClick={handleClose} value='4'>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
