const BASE_URL = "https://api.github.com/users";

const request = async (url) => {
  try {
    const results = await fetch(url);
    const response = await results.json();
    return response;
  } catch (error) {
    throw new error(alert("not found"));
  }
};

const getUser = async (user) => {
  const url = `${BASE_URL}/${user}`;
  return request(url);
};

const getRepo = async (user, pagina, cantidad_repos) => {
  const url = `${BASE_URL}/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;
  return request(url);
};

const resultado = async () => {
  try {
    let user = document.getElementById("nombre").value;
    let page = document.getElementById("pagina").value;
    let repos = document.getElementById("repoPagina").value;
    const resp = await Promise.all([getUser(user), getRepo(user, page, repos)]);
    let resultados = document.getElementById("resultados");
    resultados.classList.add("container");
    resultados.innerHTML = "";
    let col1 = document.createElement("div");
    let col2 = document.createElement("div");
    let row = document.createElement("div");
    let title = document.createElement("h1");
    title.innerHTML = "Nombre de repositorios";
    col1.classList.add("col");
    col2.classList.add("col");
    col2.appendChild(title);
    row.classList.add("row");
    row.appendChild(col1);
    row.appendChild(col2);
    resultados.append(row);

    let table = document.createElement("table");
    let table2 = document.createElement("table");
    col1.append(table);
    col2.append(table2);

    table.innerHTML = `
        <h1>Datos de Usuario</h1>
        <tr><td><img src=${resp[0].avatar_url}></td></tr>
        <tr><td>Nombre de usuario: ${user}</td></tr>
        <tr><td>Nombre de login: ${resp[0].login}</td></tr>
        <tr><td>Cantidad de Repositorios: ${resp[0].public_repos}</td></tr>
        <tr><td>Localidad: ${resp[0].location}</td></tr>
        <tr><td>Tipo de usuario: ${resp[0].type}</td></tr>
      `;

    resp[1].forEach(function (item) {
      let tr = document.createElement("tr");
      let address = item.name;
      let link = item.archive_url;
      tr.innerHTML = `<td><a href="${link}">${address}</a></td>`;
      table2.appendChild(tr);
    });
  } catch (error) {
    alert("Usuario no existe");
    document.getElementById("resultados").innerHTML = "Usuario No Existe";
  }
};

const button = document.getElementById("button");
button.addEventListener("click", resultado, false);
