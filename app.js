var selectedRow = null;

// Mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = 'alert alert-${className}';

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);   
}

// borrar todos los campos
function clearFields(){
    document.querySelector("#firsName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// añadir datos

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // obtener formulario valeus
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    addUserbtn.addEventListener("click", function(){
        const addUserInputvalue = addUserInput.value;

        if(addUserInputvalue){
            let WebUSer = localStorage.getItem("localUser");

            if(WebUSer == null) {
                userObject =[];
            }

            else{userObject - JSON.àrse(WebUSer);
            }
            userObject.push({
                'user':addUserInputvalue
            });
            localStorage.setItem("localUser" , JSON.stringify(userObject));
            addUserInput.value - '';
        }
        mostrarUser();
    })

    // validar
    if(firstName == "" || lastName == "" || rollNo == ""){
        showAlert("Por favor, complete todos los campos", "danger");
    }
    else{
        if(selectedRow == null){ 
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td> ${firsName} </td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">borrar</a> </td>

            `;
                
            list.appendChild(row);
            selectedRow = null;
            showAlert("Datos agregados", "success");
                
        }
        else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Editar información", "info");
            
        }

    }

});

// Editar datos

document.querySelector("#student-list").addEventListener("click", (e) =>{
    let target = e.target;
    if(target.classList.contains("edit")){
       let selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;

    }


});


// Delete Data (Borrar datos)

document.querySelector("#student-list").addEventListener("click",(e) =>{
    let target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Datos Borrados", "danger");
    }
});