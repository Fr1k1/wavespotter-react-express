import { useEffect, useState } from "react";
import "./App.scss";
import { getUsers } from "./api/users";
import { User } from "./common/types";

function App() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {users.map((user: User) => {
        return <h1>{user.first_name}</h1>;
      })}
    </>
  );
}

export default App;
