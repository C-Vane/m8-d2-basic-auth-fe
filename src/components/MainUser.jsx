import { Button, Grid, IconButton, Paper } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import EditModal from "./EditModal";
import ImageUploader from "react-images-upload";

const MainUser = ({ user, deleteModal, setUser, history }) => {
  const [edit, setEdit] = useState(false);
  const [currentValue, setValue] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState([]);
  const [imageModal, setImageModal] = useState(false);

  const changeCurrent = (type, value) => {
    setValue(value);
    setType(type);
    setEdit(true);
  };
  const addProfile = async () => {
    let data = new FormData();
    let blob = new Blob([image[0]], { type: "img/jpeg" });
    data.append("image", blob);
    try {
      const resp = await fetch("http://localhost:3001/users/me/picture", {
        method: "POST",
        body: data,
        headers: {
          Authorization: "Basic " + localStorage.getItem("base64"),
        },
      });

      if (resp.ok) {
        const userdata = await resp.json();
        setUser(userdata);
        setImageModal(false);
        setImage([]);
      } else {
        const error = await resp.text();
        alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editUser = async (value) => {
    const data = {};
    switch (type) {
      case "First Name":
        data.firstName = value;
        break;
      case "Last Name":
        data.lastName = value;
        break;
      case "Username":
        data.username = value;
        break;
      case "Role":
        data.role = value;
        break;
      case "Password":
        data.password = value;
        break;
      case "Image URL":
        data.image = value;
        break;
      default:
        return;
    }
    try {
      const resp = await fetch("http://localhost:3001/users/me", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + localStorage.getItem("base64"),
        },
      });

      if (resp.ok) {
        const userdata = await resp.json();
        (user.username !== userdata.username || user.password !== userdata.password || user.role !== userdata.role) && history.push("/logIn");
        setUser(userdata);
        setEdit(false);
        setType("");
        setValue("");
      } else {
        const error = await resp.text();
        alert(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper className='m-3 p-5 w-100'>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <img className='image fluid w-100' src={user.image} />
          <IconButton aria-label='upload picture' component='span' onClick={() => setImageModal(true)} className='position-absolute'>
            <PhotoCamera />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={6} className='text-left pl-5'>
          <h4>Details</h4>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between p-2'>
              <b>First Name:</b>{" "}
              <i>
                {user.firstName}
                <IconButton aria-label='edit' className='p-0 m-0 px-2' onClick={() => changeCurrent("First Name", user.firstName)}>
                  <EditIcon />
                </IconButton>
              </i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>Last Name:</b>{" "}
              <i>
                {" "}
                {user.lastName}
                <IconButton aria-label='edit' className='p-0 m-0 px-2' onClick={() => changeCurrent("Last Name", user.lastName)}>
                  <EditIcon />
                </IconButton>
              </i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>Username:</b>{" "}
              <i>
                {user.username}
                <IconButton aria-label='edit' className='p-0 m-0 px-2' onClick={() => changeCurrent("Username", user.username)}>
                  <EditIcon />
                </IconButton>
              </i>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <b>Role:</b>{" "}
              <i>
                {user.role}
                <IconButton aria-label='edit' className='p-0 m-0 px-2' onClick={() => changeCurrent("Role", user.role)}>
                  <EditIcon />
                </IconButton>
              </i>
            </div>
            <div className='d-flex justify-content-between p-2' onClick={() => changeCurrent("Image URL")}>
              <Button variant='outlined' color='gray'>
                Update Image with URL
              </Button>
            </div>
            <div className='d-flex justify-content-between p-2' onClick={() => changeCurrent("Password")}>
              <Button variant='outlined' color='primary'>
                Change Password
              </Button>
            </div>
            <div className='d-flex justify-content-between p-2'>
              <Button variant='outlined' color='secondary' startIcon={<DeleteIcon />} onClick={deleteModal}>
                Delete Account
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      {edit && <EditModal editFunction={editUser} value={currentValue} type={type} handleClose={() => setEdit(false)} />}
      {imageModal && (
        <div className='backdrop px-5'>
          <ImageUploader
            withIcon={true}
            buttonText='Upload image'
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            singleImage={true}
            withPreview={true}
            withLabel={false}
            onChange={(img) => setImage(img)}
            className='w-50 m-auto'
          />
          <div className='d-flex justify-content-end w-50 m-auto m-0 ' style={{ height: 40 }}>
            <Button
              variant='contained'
              className='mr-3'
              onClick={() => {
                setImage([]);
                setImageModal(false);
              }}
            >
              Cancel
            </Button>
            <Button color='primary' variant='contained' style={{ width: 160 }} onClick={addProfile}>
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default MainUser;
