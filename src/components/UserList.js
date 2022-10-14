import { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                document.body.style.cursor = 'wait';
                const respone = await fetch('http://localhost:8080/users/all', { method: "GET" });
                console.log(respone);
                const data = await respone.json();
                setUsers(data);
                document.body.style.cursor = 'default';
            } catch (error) {
                document.body.style.cursor = 'default';
                console.log(error.message);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        await fetch(`http://localhost:8080/users/${id}`, { method: 'DELETE', })
            .then((response) => {
                if (response.status === 200) {
                    setUsers(
                        users.filter((user) => {
                            return user.id !== id;
                        })
                    );
                } else {
                    return;
                }
            });
    };

    const addUser = async () => {
        await fetch(`http://localhost:8080/users/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: 'lalalala',
                password: 'body',
                email: 'a@a',
                role: 'ouzer'
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers((users) => [...users, data]);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div>
            <button onClick={() => addUser()}>Add</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => {
                        return (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.password}</td>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>E</td>
                                <td onClick={() => deleteUser(u.id)} style={{ cursor: 'pointer' }}>D</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )

}

export default UserList;