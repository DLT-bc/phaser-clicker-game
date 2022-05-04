const bdURL = "https://dlt-database.herokuapp.com/api/"

let formMode = 0 // 0 -login 1 - reg

let formInputs = document.querySelectorAll(".input100")

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const form = document.querySelector(".login100-form"),
      btnSign = document.querySelector("#sign-btn"),
      headSign = document.querySelector("#sign-header"),
      btnReg = document.querySelector("#btn-change")

const inputLog = document.querySelector("#inp-login"),
      inputPass = document.querySelector("#inp-pass")

//change form------------------------------------------------------------------

btnReg.addEventListener("click", async () => {
    const confPass = document.querySelector("#confirm-pass")
    const userName = document.querySelector("#username")
    let formPicture = document.getElementById("form-pic")

    if (formMode == 0) {
        confPass.innerHTML = '<input id="inp-confirm-pass" class="input100" type="password" name="pass" placeholder="Confirm password">'
        userName.innerHTML = '<input id="inp-name" class="input100" type="text" name="name" placeholder="Username">'
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
        formPicture.style.paddingTop = '0px'
    }
})

//sign click------------------------------------------------------------------

btnSign.addEventListener("click", async () => {
    // Sign In
    if (formMode == 0) {

        console.log(bdURL);


        await fetch(bdURL + "auth/login", {
            method: "POST",
            body: JSON.stringify({
                "email": inputLog.value,
                "password": inputPass.value
            }),
            headers: {
              "Content-Type": "application/json"
            },
          }).then((response) => {
            console.log(response.status)     //=> number 100–599
            console.log(response.statusText) //=> String

            if (response.ok) {
                window.location.replace('game')
                //console.log("OKЭЙ");
            }
            else {
                response.text().then((text) => { 
                    text = JSON.parse(text)
                    alert(text.message)
                })
            }
          }, (error) => {
            console.log(error.message) //=> String
          })
          

        //let result = await resp.json();
        //console.log(result.message);

    }
    // Sign Up
    else if (formMode == 1) {

        const inputConfirmPass = document.querySelector("#inp-confirm-pass"),
              inputName = document.querySelector("#inp-name")

        if (inputPass.value != inputConfirmPass.value) { return }

        await fetch(bdURL + "auth/register", {
            method: "POST",
            body: JSON.stringify({
                "email": inputLog.value,
                "login": inputName.value,
                "password": inputPass.value
            }),
            headers: {
              "Content-Type": "application/json"
            },
            
          }).then((response) => {
            console.log(response.status)     //=> number 100–599
            console.log(response.statusText) //=> String
          
            console.log(response.ok);

            if (response.ok) {
                window.location.replace('game')
                console.log("OKЭЙ")
            }
            else {
                response.text().then((text) => { 
                    text = JSON.parse(text)
                    alert(text.message)
                })
            }
          }, (error) => {
            console.log(error.message) //=> String
          }) 
    }
})

//validate-------------------------------------------------------------------

/*form.onsubmit = function() {
    if (formMode == 0) {
        if (inputLog.value === "" || inputPass.value.length < 6) {
            if (inputLog.value === "") inputLog.style.borderColor = 'red'
            if (inputPass.value.length < 6) inputPass.style.borderColor = 'red'
            return false;
        }
        else {
        console.log(456)
    return true;
    }
    }
    else if (formMode == 1) {

    }
} */
