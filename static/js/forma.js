let formMode = 0 // 0 -login 1 - reg
const dbURL = "http://localhost:4000/api/"

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const inputEmail = document.querySelector('#inp-login');

/*
function validateEmail(value) {
    return EMAIL_REGEXP.test(value);
  }

function updateInput() {
    if (!validateEmail(inputEmail.value)) inputEmail.style.background = 'red';
  }

inputEmail.addEventListener('#inp-login', updateInput);*/

const btnSign = document.querySelector("#sign-btn")
const headSign = document.querySelector("#sign-header")
const btnReg = document.querySelector("#btn-change")

btnReg.addEventListener("click", async () => {
    const confPass = document.querySelector("#confirm-pass")
    const userName = document.querySelector("#inp-name")
    let formPicture = document.getElementById("form-pic")

    if (formMode == 0) {
        confPass.innerHTML = '<input id="inp-confirm-pass" class="input100" type="password" name="pass" placeholder="Confirm password">'
        userName.innerHTML = '<input class="input100" type="text" name="name" placeholder="Username">'
        formMode = 1
        btnReg.textContent = 'Already registered? Sign In'
        btnSign.textContent = 'Sign Up'
        headSign.textContent = 'Sign Up'
        formPicture.style.paddingTop = '55px'
    }
    else if (formMode == 1){
        formMode = 0
        btnReg.textContent = 'Create your Account'
        confPass.innerHTML = ''
        userName.innerHTML = ''
        btnSign.textContent = 'Sign In'
        headSign.textContent = 'Sign In'
    }
})

btnSign.addEventListener("click", async () => {

    const inputLog = document.querySelector("#inp-login")
    const inputPass = document.querySelector("#inp-pass")

    console.log(inputLog.value);
    console.log(inputPass.value);

    if (formMode == 0) {


        
        let requestBody = {
            "email": inputEmail.value,
            "login": inputEmail.value,
            "password": inputPass.value
        }

        console.log(requestBody);
        

        let res = fetch(dbURL + "auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            // handle HTTP response
            console.log(response);
        }, (error) => {
            // handle network error
            console.log(error);
        })
        
        console.log(res);
        
    }
    else if (formMode == 1) {
        
        const inputConfirmPass = document.querySelector("#inp-confirm-pass")
        
        console.log(inputConfirmPass.value);
        console.log(inputPass.value);


        if(inputPass.value != inputConfirmPass.value) {
            console.log("Passwords don't match!");
            return
        }

        let requestBody = {
            "email": inputEmail.value,
            "login": inputLog.value,
            "password": inputPass.value
        }

        fetch(dbURL + "auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            // handle HTTP response
            console.log(response);
        }, (error) => {
            // handle network error
            console.log(error);
        })
        
    }
})
