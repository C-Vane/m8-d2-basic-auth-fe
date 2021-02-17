import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal";
import MainUser from "../MainUser";
import UserItem from "../UserItem";

const Home = (props) => {
  const [user, setUser] = useState({});
  const [otherUsers, setOther] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getUser("me");
  }, []);
  const getUser = async (endp) => {
    try {
      const resp = await fetch("http://localhost:3001/users/" + endp, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("base64"),
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        endp ? setUser(data) : setOther(data);
        data && data.role === "admin" && getUser("");
        console.log(data);
      } else {
        props.history.push("/logIn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAccount = async () => {
    setDeleteModal(false);
    try {
      const resp = await fetch("http://localhost:3001/users/me", {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + localStorage.getItem("base64"),
        },
      });
      if (resp.ok) {
        props.history.push("/logIn");
      } else {
        const error = await resp.text();
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth='md' style={{ minHeight: "100vh" }} className='pt-5' id='profile'>
      <div>
        <h2>{user.firstName}´s Profile details</h2>
        <MainUser user={user} deleteModal={() => setDeleteModal(true)} setUser={setUser} history={props.history} />
      </div>
      {otherUsers.length > 0 && (
        <div>
          <h4> All users</h4>
          {otherUsers.map((users, key) => users._id !== user._id && <UserItem user={users} key={key} />)}
        </div>
      )}

      {deleteModal && <DeleteModal deleteFunction={deleteAccount} handleClose={() => setDeleteModal(false)} />}
    </Container>
  );
};

export default Home;
