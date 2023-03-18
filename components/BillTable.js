import { countCost } from "../helpers/countCost.js";
import { elementsBillsByCategory } from "../bills/index.js";

export const BillTable = ({ name }) => {
  const bills = elementsBillsByCategory(name);
  const table = document.createElement("table");

  const cost = countCost(name);

  table.id = name;
  table.className = "table table-success table-striped";

  table.innerHTML = `
    <caption>
      ${name.toUpperCase()} $<span>${cost}</span>
    </caption>
    <thead class="tableRow">
      <th>Fecha</th>
      <th>Descripción</th>
      <th>Costo</th>
      <th>Eliminar</th>
    </thead>
  `;

  const tbody = document.createElement("tbody");

  bills.forEach((billElement) => {
    tbody.appendChild(billElement);
  });

  table.appendChild(tbody);

  return table;
};
