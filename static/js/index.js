const bdURL = "https://dlt-database.herokuapp.com/api/"

document.querySelector("#btn-start").addEventListener('click', async () => {

    await fetch(bdURL + "auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        
    }).then((response) => {
        console.log(response.status)     //=> number 100–599
        console.log(response.statusText) //=> String
      
        if (response.ok) {
            window.location.replace('game')
        }
        else {
            location.href="auth.html"
        }
      }, (error) => {
        console.log(error.message) //=> String
      })
      
})
