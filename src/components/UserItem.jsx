import { Grid, Paper } from "@material-ui/core";
import React from "react";
const UserItem = ({ user }) => {
  return (
    <Paper className='m-3 p-5 w-100'>
      <Grid container>
        <Grid item xs={6}>
          <img className='image fluid w-100' src={user.image} />
        </Grid>
        <Grid item xs={6} className='text-left pl-5'>
          <h4>Details</h4>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between p-2'>
              <b>Name:</b> <i>{user.firstName}</i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>Last:</b> <i> {user.lastName}</i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>Username:</b> <i>{user.username}</i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>role:</b> <i>{user.role}</i>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserItem;
