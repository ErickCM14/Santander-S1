const $forms = document.querySelectorAll('.signup-form');
console.log($forms);

const getTemplete = () => {
    return fetch('./templete.html')
    .then((response) => response.text())
}

const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
        console.log(results);
        document.getElementById("email").value = ""
        alert("E-mail send!!!")
      })
      .catch((error) => {
        console.error(error);
        document.getElementById("email").value = ""
        alert("Send failed")
      });
  };

function sendEmail(miVariable){
    miVariable.preventDefault();
    console.log(miVariable);
    const email = miVariable.target.querySelector('input').value
    getTemplete()
        .then((template) => {
            sendEmailToApi(email, template);
        })
        .catch((error) => {
            console.log(error, "Error al obtener el templete");
        })
    console.log(email);
}

// const sendEmail = (miVariable) => {
//     miVariable.preventDefault();
//     console.log(miVariable);
// }

for(let i = 0; i < $forms.length; i++){
    // console.log($forms[i]);
    $forms[i].addEventListener('submit', sendEmail);
}