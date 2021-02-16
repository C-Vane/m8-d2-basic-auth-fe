import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UserItem from "../UserItem";

const Home = (props) => {
  const [user, setUser] = useState({});
  const [otherUsers, setOther] = useState([]);

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
  return (
    <Container maxWidth='md' style={{ minHeight: "100vh" }} className='pt-5'>
      <div>
        <h2>{user.firstName}´s Profile details</h2>
        <UserItem user={user} />
      </div>
      {otherUsers.length > 0 && (
        <div>
          <h4> All users</h4>
          {otherUsers.map((user, key) => (
            <UserItem user={user} key={key} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
