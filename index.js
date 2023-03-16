const pharmacy = document.getElementById("pharmacy");
const market = document.getElementById("market");
const greengrocery = document.getElementById("greengrocery");
const others = document.getElementById("others");
const valeria = document.getElementById("valeria");
const marcela = document.getElementById("marcela");
const emilce = document.getElementById("emilce");
const tablesLog = document.querySelector("#tablesLog");
const addButton = document.getElementById("addButton");
const lastLog = document.getElementById("lastLog");
const inputValueName = document.getElementById("pharmacyInputName");
const inputValueCost = document.getElementById("pharmacyInputCost");
const form = document.querySelector("#form");
const selectionInput = document.querySelector("#myList");
const pharmacy__cost = document.getElementById("cost__pharmacy");
const market__cost = document.getElementById("cost__market");
const cost__marcela = document.getElementById("cost__marcela");
const cost__varios = document.getElementById("cost__varios");
const cost__emilce = document.getElementById("cost__emilce");
const cost__valeria = document.getElementById("cost__valeria");
const cost__greengrocery = document.getElementById("cost__greengrocery");

let logList = [];
const gastos = { id: "", fecha: "", nombre: "", costo: "", category: "" };


const setStorage = localStorage.getItem("logist")

// mostrar esos valores
const submitForm = (e) => {
  e.preventDefault();
  // getDate  d/m/y
  let f = new Date();
  let day = f.getDate();
  let month = f.getMonth() + 1;
  let year = f.getFullYear();
  let dayMonth = `${day}/${month}/${year}`;
  //reemplazamos la información a agregar en ntro form
  gastos.id = Math.random();
  gastos.fecha = dayMonth;
  gastos.nombre = inputValueName.value;
  gastos.costo = inputValueCost.value;
  gastos.category = selectionInput.value;
   
  //llenamos el objeto listaGastos con la info de gastos solo si hay datos en los input

  if (gastos.costo == "" || gastos.nombre == "" || gastos.category == "-----") {
    alert("you must be add a data in the empty input");
  } else {
    logList.push({ ...gastos });
    dataLog();
    cleanInputs();
    tableLogs();
    localStorage.setItem("logist",JSON.stringify(logList))
    console.log(setStorage)
  }
};

// pintar datos del log de arriba
const dataLog = () => {
  const createLog = document.createElement("p");
  createLog.className = "lastLogText";
  logList.forEach((i) => {
    const { id, fecha, nombre, costo, category } = i;
    createLog.innerText = `${fecha} ${nombre} $${costo} ${category}`;
    createLog.className = "logUp"
 
  });
  lastLog.appendChild(createLog);
  
};

//func para borrar
const deleted = (id) => {
  logList = logList.filter((el) => {
    return  el.id !== id;
  });
  
  console.log(logList);
  count("Supermercado", market__cost);
  count("Farmacia", pharmacy__cost);
  count("Verduleria", cost__greengrocery);
  count("Valeria", cost__valeria);
  count("Emilce", cost__valeria);
  count("Varios", cost__varios);
  count("Marcela", cost__marcela);
};

//pintar - borrrar datos del log de abajo
const tableLogs = () => {
  const categoryLog = (cat) => {
    const { fecha, nombre, costo, id } = gastos;
    const newTableList = document.createElement("tr");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "🗑"
    deleteButton.className ="deleteButton"
    //boton para borrar
    deleteButton.onclick = () => {
      deleted(id);
      newTableList.remove();
    };
    //relleno la data traida desde inputs
    newTableList.innerHTML = ` 
    <tr> 
     <td>${fecha}</td> 
     <td>${nombre}</td> 
     <td>$${costo}</td> 
 </tr>`;

    cat.appendChild(newTableList);
    newTableList.appendChild(deleteButton);
  };

  if (gastos.category == "Farmacia") {
    categoryLog(pharmacy);
    const d = document.getElementById("cost__span");
    count("Farmacia", pharmacy__cost);
  } else if (gastos.category == "Supermercado") {
    categoryLog(market);
    count("Supermercado", market__cost);
  } else if (gastos.category == "Verduleria") {
    categoryLog(greengrocery);
    count("Verduleria", cost__greengrocery);
  } else if (gastos.category == "Varios") {
    categoryLog(others);
    count("others", cost__varios);
  } else if (gastos.category == "Emilce") {
    count("Emilce", cost__valeria);
    categoryLog(emilce);
  } else if (gastos.category == "Valeria") {
    categoryLog(valeria);

    count("Valeria", cost__valeria);
  } else {
    categoryLog(marcela);

    count("Marcela", cost__marcela);
  }
};

// limpiar inputs
const cleanInputs = () => {
  inputValueName.value = "";
  inputValueCost.value = "";
};

//func para sumar costos
const count = (cat, name) => {
  const targetFilter = logList.filter((id) => {
    return id.category == cat;
  });
  const num = targetFilter.map((i) => {
    return parseInt(i.costo);
  });
  const total = num.reduce((ant, post) => {
    return ant + post;
  }, 0);

  name.innerText = total;
};

form.addEventListener("submit", submitForm);

