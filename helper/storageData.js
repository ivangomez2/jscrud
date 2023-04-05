export { saveStorage };
import { logList, deleted,totalCost } from "./logic.js";

//mostrar/guardar datos localStorage
const saveStorage = () => {
  //pintar datos de arriba al iniciar pagina
  logList.forEach((i) => {
    const createLog = document.createElement("p");
    createLog.className = "lastLogText";
    const { id, fecha, nombre, costo, category } = i;
    createLog.innerText = `${fecha} ${nombre} ${category} $${costo}`;
    createLog.className = "logUp";
    lastLog.append(createLog);
  });

  //pintar todos los datos de abajo al iniciar la pagina
  const categorysLog = (cat, desc) => {
    const filtros = logList.filter((i) => {
      return i.category == desc;
    });

    filtros.forEach((i) => {
      const newTableList = document.createElement("tr");
      const deleteButton = document.createElement("button");

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
          }
        })}
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

}

totalCost()
categorysLog(market, "Supermercado");
categorysLog(pharmacy, "Farmacia");
categorysLog(greengrocery, "Verduleria");
categorysLog(others, "Varios");
categorysLog(emilce, "Emilce");
categorysLog(valeria, "Valeria");
categorysLog(marcela, "Marcela");
};


const deleteStorage = (id) => {};
