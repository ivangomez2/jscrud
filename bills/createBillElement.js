import { recountCost } from "./../helpers/recountCost.js";
import { BillService } from "./mutations.js";

export const createBillElement = ({ data }) => {
  const tr = document.createElement("tr");
  const button = document.createElement("button");
  const createdAtFormatted = new Date(data.createdAt).toLocaleDateString();

  button.className = "deleteButton";
  button.innerHTML = "🗑";
  button.onclick = () => {
    BillService.deleteBillById({
      where: {
        id: data.id,
      },
    });
    tr.remove();
    document.querySelector(`div#logs > p#bill-${data.id}`).remove();
    recountCost({ category: data.category });
  };

  tr.id = `bill-${data.id}`;
  tr.innerHTML = `
      <td>${createdAtFormatted}</td>
      <td>${data.name}</td>
      <td>$${data.cost}</td>
    `;

  const tdButton = document.createElement("td");
  tdButton.appendChild(button);

  tr.appendChild(tdButton);

  return tr;
};
