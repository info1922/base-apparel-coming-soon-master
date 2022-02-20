const btnSubmit = document.getElementById('btnSubmit');
const input = document.getElementById('inputSubmit')
const textAlert = document.getElementById('texto');
const divAlert = document.getElementById('alert')

const cerrarAlert = document.getElementById('icon')

let emailsRegistrados = []

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    mandarForm()
    console.log('Click ', input.value);


})

function controlClasses(className, divAlert) {


    let listaClases = ['error', 'neutral', 'success']
   
    const filtroNoExist = listaClases.filter(el => {
        return className != el
    })

    divAlert.classList.add(className)

    filtroNoExist.map(claseRemove => {
        divAlert.classList.remove(claseRemove)
    })
    
}


function alertasObj(divAlert, texto, textAlertNeutral, textAlertError, textAlertSuccess) {
    let conteo = 0;


    this.success = () => { 
        controlClasses('success', divAlert);
        texto.innerText = textAlertSuccess;
        conteo = 0
    }


    this.error = () => {
        console.log('Error');
        controlClasses('error', divAlert);

        conteo >=2 ? 
        texto.innerText = 'Formato de correo correcto correo@email.com' : texto.innerText = textAlertError;
        conteo += 1
        
    }

    this.neutral = () => {
        controlClasses('neutral', divAlert)
        texto.innerText = textAlertNeutral
    }

    this.clearClass = () => {
        divAlert.classList.remove('success', 'neutral', 'error')
    }
}

let newAlert = new alertasObj(divAlert, textAlert, 'Este email ya esta registrado!', 'Este email no es correcto!', 'Gracias por registrarse!')



function validaEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function mandarForm() {
    let emailValido = validaEmail(input.value)
    console.log('Mardar form ', emailValido);
    if (emailsRegistrados.includes(input.value)) {
        newAlert.neutral()
        removeAlert()
    } else if (emailValido) {
        newAlert.success()
        removeAlert()
        emailsRegistrados.push(input.value)
    } else if (!emailValido) {
        newAlert.error()
        removeAlert()
    }
    
}

function removeAlert() {

    setTimeout(() => {
        
        newAlert.clearClass()
    }, 4000);
}


cerrarAlert.addEventListener('click', (e) => {
    newAlert.clearClass()
})


