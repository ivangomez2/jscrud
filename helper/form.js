import { logList, gastos, cleanInputs, tableLogs } from "./logic.js";
import { inputValueCost, inputValueName, selectionInput } from "./helper.js";
import { showStorage } from "../index.js";

//formulario **

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
    Toastify({
      text: "¡Dato agregado corretamente!",
      className: "info",
      gravity:"bottom",
      style: {
        background: "#58a582",
      }
    }).showToast(); 
    logList.push({ ...gastos });
    localStorage.setItem("logist", JSON.stringify(logList));
    showStorage();
    cleanInputs();
    tableLogs();
  }
};

form.addEventListener("submit", submitForm);
