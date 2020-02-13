const userURL = "http://127.0.0.1:3000/users/"


function newUser(user, cb) {
    fetch(userURL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Headers": "application/json"
    },
    body: JSON.stringify({user: user})
    })
    .then(resp => resp.json())
    .then(cb)
    
}

function loginUser(user, cb) {
    fetch(userURL + 'login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Headers": "application/json"
        },
        body: JSON.stringify({user: user})
    })
    .then(resp => resp.json())
    .then(cb)
    
}
