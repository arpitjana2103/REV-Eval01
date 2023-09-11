const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
        email: loginForm.querySelector('#email').value,
        password: loginForm.querySelector('#password').value,
    };
    // const data = {
    //     email: 'eve.holt@reqres.in',
    //     password: 'cityslicka',
    // };

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            localStorage.setItem('token', data.token);
            alert('Login Successfull');
            location.assign('/employee.html');
        })
        .catch(function (err) {
            alert('Wrong Email or Password, Please try agein !');
            console.log(err);
        });
});
