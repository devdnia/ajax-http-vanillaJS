

// Elementos del DOM
const BTN_XML = document.querySelector("#btnXML");
const BTN_FETCH = document.querySelector("#btnfetch");
const BTN_POST = document.querySelector("#btnpost");
const DIV_RESULT = document.querySelector("#result");


DIV_RESULT.innerHTML = '';
const H3 = document.createElement("h3");

// Variables
const urlBase = "https://jsonplaceholder.typicode.com/"

// Métodos
// Render tabla
const createTable = (title, data) => {
    DIV_RESULT.innerHTML = '';
    H3.innerHTML = title;
    let users = data
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
}

// FETCH
const peticionFetch = () => {
    DIV_RESULT.innerHTML = '';

    fetch(`${urlBase}users`)
        .then(response => {
            if (response.ok)
                return response.json();

            throw new Error("Error en la petición fetch ", response.status);
        })
        .then(data => {
            let users = data;
            createTable("PETICIÓN FETCH", users);
        })
        .catch(err => {
            console.log("ERROR fetch ", err.message);
        })


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
    peticionFetch();
});

BTN_XML.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const users = JSON.parse(xhr.responseText);
                createTable("PETICIÓN XMLHttpRequest", users);
            } else {
                console.error('Hubo un problema al obtener los datos');
            }
        }
    };

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhr.send();
});

BTN_POST.addEventListener('click', () => {
    createPost(fetchPost)
});


