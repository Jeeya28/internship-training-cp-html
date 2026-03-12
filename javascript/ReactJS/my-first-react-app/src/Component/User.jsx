function User(){
    const user={
        name:'Jacob Dennis',
        age:25
    }

    const isLoggedIn = false;

    return(
        <div>
            <h1>Welcome {user.name}</h1>
            <p>Age: {user.age}</p>

            {/* Conditional Rendering */}
            { isLoggedIn ? <p>You are Loggedin</p> : <p>Please Login in</p>}

            {/* Inline CSS */}
            <p style={{color:'red',fontSize:'20px'}}>Styled Text</p>
        </div>
    )

}

export default User;