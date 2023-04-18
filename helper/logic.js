import {
  market,
  greengrocery,
  others,
  valeria,
  marcela,
  emilce,
  tablesLog,
  pharmacy__cost,
  lastLog,
  inputValueName,
  inputValueCost,
  form,
  selectionInput,
  pharmacy,
  market__cost,
  cost__marcela,
  cost__varios,
  cost__emilce,
  cost__valeria,
  cost__greengrocery,
  costTotal
  ,dropSelectButton
} from "./helper.js";

let logList = JSON.parse(localStorage.getItem("logist")) || [];
const gastos = { id: "", fecha: "", nombre: "", costo: "", category: "" };
const farmacia = [];
const cv = []
//limpiar inputs
const cleanInputs = () => {
  inputValueName.value = "";
  inputValueCost.value = "";
 
};
// agregar cada dato a su tabla correspondiente
const tableLogs = () => {
  callCount();
  totalCost();
  if (gastos.category == "Farmacia") {
    categoryLog(pharmacy, "Farmacia");
  } else if (gastos.category == "Supermercado") {
    categoryLog(market, "Supermercado");
  } else if (gastos.category == "Verduleria") {
    categoryLog(greengrocery, "Verduleria");
  } else if (gastos.category == "Varios") {
    categoryLog(others, "Varios");
  } else if (gastos.category == "Emilce") {
    categoryLog(emilce, "Emilce");
  } else if (gastos.category == "Valeria") {
    categoryLog(valeria, "Valeria");
  } else {
    categoryLog(marcela, "Marcela");
  }
};

//pintar datos log de arriba
const dataLog = () => {
  const createLog = document.createElement("p");

  logList.forEach((i) => {
    createLog.className = "lastLogText";
    const { id, fecha, nombre, costo, category } = i;
    createLog.innerText = `${fecha} ${category} $${costo} ${nombre}  `;

    createLog.className = "logUp";
    lastLog.append(createLog);
  });
};

//pintar - borrrar datos del log de abajo
const categoryLog = (cat, desc) => {
  const filtros = logList.filter((i) => {
    return i.category == desc;
  });

  const fil = (id) => {
    filtros.filter = (i) => {
      return i.id !== id;
    };
  };

  const deleteButton = document.createElement("button");
  const newTableList = document.createElement("tr");
  filtros.forEach((i) => {
    const { fecha, nombre, costo, id } = i;

    deleteButton.innerText = "❌";
    deleteButton.className = "deleteButton";

    //boton para borrar
    deleteButton.onclick = () => {
      Swal.fire({
        title: 'Borrar',
        text: "Borraras el dato seleccionado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#58a582',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'El dato fue borrado exitosamente.',
            'success'
          )
          deleted(id);
          newTableList.remove();
          fil(id);
        }
      })
    
    };
    //relleno la data traida desde inputs
    newTableList.innerHTML = ` 
      <tr> 
      <td>${fecha}</td> 
      <td>${nombre}</td> 
      <td>$${costo}</td> 
      </tr>`;
    localStorage.setItem("filterLog", JSON.stringify(filtros));
    cat.appendChild(newTableList);
    newTableList.appendChild(deleteButton);
  });
};

//func para sumar costos en cada categoria
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
 
//costos totales global
const totalCost = ()=>{
  //agregamos cada costo a un array
  const numbers = logList.map((i)=>{
    return parseInt(i.costo)
   
  }) 
  //sumamos cada numero
  const total = numbers.reduce((ant, post) => {
    return ant + post;
  }, 0);

  costTotal.innerText =`$ ${total}  `;
}
//llamar costos
const callCount = () => {
  count("Supermercado", market__cost);
  count("Farmacia", pharmacy__cost);
  count("Verduleria", cost__greengrocery);
  count("Valeria", cost__valeria);
  count("Emilce", cost__emilce);
  count("Varios", cost__varios);
  count("Marcela", cost__marcela);
};

const deleted = (id) => {
  logList = logList.filter((el) => {
    return el.id !== id;
  });
  localStorage.setItem("logist",JSON.stringify(logList))
  callCount()
  totalCost()
};



export {
  cleanInputs,
  tableLogs,
  logList,
  gastos,
  farmacia,
  categoryLog,
  deleted,
  callCount,
  dataLog,
  totalCost,
  
};
