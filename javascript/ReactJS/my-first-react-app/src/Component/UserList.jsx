function UserList({users}) {
    return (
        <div>
            <h1>User List</h1>
            {users.map(user => (
                <div key={user.id}>
                    <h2>Name: {user.name}</h2>
                    <h3>Age: {user.age}</h3>
                </div>
            ))}
        </div>
    )
}

export default UserList;