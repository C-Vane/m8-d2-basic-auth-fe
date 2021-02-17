import { Button, Container, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";

const EditModal = ({ editFunction, value, type, handleClose }) => {
  const [update, setUpdate] = useState(value);
  return (
    <div className='backdrop px-5'>
      <Container className='px-5'>
        <Paper className='w-50 m-auto'>
          <div className='border-bottom mb-3 p-2'>
            <h5>Edit {type}</h5>
          </div>
          <TextField className='m-3 col-md-5' variant='outlined' value={update} onChange={(e) => setUpdate(e.target.value)} label={type} />
          <div>
            <div className='d-flex justify-content-around border-top'>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color='primary' onClick={() => editFunction(update)}>
                Save
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default EditModal;
