import { Button, Container, Paper } from "@material-ui/core";
import React from "react";

const DeleteModal = ({ deleteFunction, handleClose }) => {
  return (
    <div className='backdrop px-5'>
      <Container className='px-5'>
        <Paper className='w-50 m-auto'>
          <div className='border-bottom mb-3 p-2'>
            <h5>Confirmation</h5>
          </div>
          <div>
            <p>Are you sure you want to delete your Account?</p>
            <div className='d-flex justify-content-around border-top'>
              <Button color='secondary' onClick={deleteFunction}>
                Yes
              </Button>
              <Button color='primary' onClick={handleClose}>
                No
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default DeleteModal;
