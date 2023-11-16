

// Elementos del DOM
const BTN_XML = document.querySelector("#btnXML");
const BTN_FETCH = document.querySelector("#btnfetch");
const BTN_POST = document.querySelector("#btnpost");
const DIV_RESULT = document.querySelector("#result");


// Variables
const urlBase = "https://jsonplaceholder.typicode.com/"

// Métodos
//fetch
const fetchRequest = async () => {

    try {
        const resp = await fetch(`${urlBase}users`);
        if (!resp.ok) {
            throw Error`No se ha podido realizar la petición fetch ${resp.status}`;
        }

        const data = await resp.json();
        return data;

    } catch (error) {
        throw error;
    }

}


//XMLHttpRequest
// o con window.onload y pasando los datos en vez de una funcion.

const xmlRequest = new XMLHttpRequest();

xmlRequest.addEventListener("readystatechange", () => {
    const isDone = xmlRequest.readyState === 4;
    const isOk = xmlRequest.status === 200;

    if (isDone && isOk) {
        // aqui están los datos
        console.log(xmlRequest.responseText);
        return responseText;
    }
});

const XMLHttp = () => {
    xmlRequest.open("GET", `${urlBase}users`);
    xmlRequest.send();
}





//fetch POST
const fetchPost = async () => {
    try {
        const resp = await fetch(`${urlBase}posts`, {
            method: "POST",
            body: JSON.stringify({
                title: "Iván",
                body: "Mi post a la url",
                userId: crypto.randomUUID()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        if (!resp.ok) {
            throw Error`No se ha podido realizar la petición POST ${resp.status}`;
        }

        const data = await resp.json();
        return data;

    } catch (error) {
        throw error;
    }
}


// Métodos de render
const createTable = async (title, requestAPI) => {

    DIV_RESULT.innerHTML = '';
    const H3 = document.createElement("h3");


    try {
        const users = await requestAPI();
        H3.innerHTML = title;
        H3.style = "margin-top: 20px; font-weight: 200; margin-bottom:20px;"
        DIV_RESULT.appendChild(H3);

        // TABLE
        const TABLE = document.createElement("table");
        const titles = document.createElement("tr")
        titles.innerHTML = `
            <th style="font-weight: 200;">NOMBRE</th>
            <th style="font-weight: 200;">APELLIDOS</th>
            <th style="font-weight: 200;">EMAIL</th>
            <th style="font-weight: 200;">DIRECCIÓN</th>
        `
        TABLE.appendChild(titles)


        users.map(user => {

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.street}</td>
            `
            TABLE.appendChild(row);

        })

        DIV_RESULT.appendChild(TABLE);

    } catch (error) {
        console.log(`Ocurrío un error con los usuarios: ${error.menssage}`);
    }


}

const createPost = async (postApi) => {

    DIV_RESULT.innerHTML = '';
    const SPAN = document.createElement("span")
    const response = await postApi();
    const result = JSON.stringify(response, null, 3);
    SPAN.innerHTML = result;
    DIV_RESULT.appendChild(SPAN);

}


// Listeners
BTN_FETCH.addEventListener('click', () => {
    createTable("Petición Fetch", fetchRequest)
});

BTN_XML.addEventListener('click', () => {
    createTable("Petición XMLHttpRequest", XMLHttp)
})

BTN_POST.addEventListener('click', () => {
    createPost(fetchPost)
})


