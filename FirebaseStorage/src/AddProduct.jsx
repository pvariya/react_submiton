
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import "./Css.css"
import { db } from "./FireBase";

const AddProduct = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const createUser = async (data) => {
      let userCollection = collection(db, "users")
      let userData = await addDoc(userCollection, data)
      console.log(userData);
      getData()
  }

  const getData = async () => {
      let userCollection = collection(db, "users")
      let data = await getDocs(userCollection)
      let userdata = []
      data.docs.map(doc => {
          let id = doc.id
          let data = doc.data()
          userdata.push({ id, ...data })

      })
      console.log(userdata);
      setUsers(userdata)

  }

  useEffect(() => {
      getData()
  }, [])

  const handleSubmit = async (e) => {
      e.preventDefault()
   
      let user = {
          email: email,
          password: password,
          createdAt: Date.now()
      }
      createUser(user)
  }
  const deleteuser = async (id) => {
    try {
      let docref = doc(db, "users", id);
      await deleteDoc(docref);
      getData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  const updateuser = async (id) => {
    try {
      let docref = doc(db, "users", id);
      await updateDoc(docref, { email: email }); 
      getData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  
    return (
      <div>
      <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">create</button>
      </form>
      <hr />
      {
          users.map(user => (
              <div key={user.id}>
                  <p>ID: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <p>Password: {user.password}</p>
                  <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
                  <button onClick={() => deleteuser(user.id)}>delete</button>
                  <button onClick={() => updateuser(user.id)}>update</button>
                  <hr />
              </div>

          ))
      }
  </div>
  );
};

export default AddProduct;
