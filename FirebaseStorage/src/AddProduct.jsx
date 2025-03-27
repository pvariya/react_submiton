import { useState } from "react";
import "./Css.css"

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
      // make api call to create user
      let user = {
          email: email,
          password: password,
          createdAt: Date.now()
      }
      createUser(user)
  }

  const deleteuser = async (id) => {
      let docref = await doc(db, "users", id)
      let data = await deleteDoc(docref)
      getData()


  }

  const updateuser = async (id) => {
      let docref = await doc(db, "users", id)
      let data = await updateDoc(docref, { email: email })
      getData()


  }
  
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
