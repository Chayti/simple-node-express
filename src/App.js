// client side updated
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [users])

  const handleAddUser = e => {
    const name = nameRef.current.value
    const email = emailRef.current.value
    const newUser = { name: name, email: email }
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data
        const newUsers = [...users, addedUser]
        setUsers(newUsers)
      })

    nameRef.current.value = ''
    emailRef.current.value = ''

    e.preventDefault()
  }

  return (
    <div className="App">
      <h2>Congratulations!!! You have got {users.length} users.</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} name="" id="" placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </li>)
        }
      </ul>
    </div>
  );
}

export default App;
