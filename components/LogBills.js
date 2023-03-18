import { BillService } from "../bills/mutations.js";

export const LogBills = () => {
  const logsElement = document.getElementById("logs");
  const bills = BillService.getBills();

  const logs = bills.map((bill) => {
    const createdAtFormatted = new Date(bill.createdAt).toLocaleDateString();

    return `
      <p id="bill-${bill.id}" class="logUp">
        ${createdAtFormatted} ${bill.name} $${bill.cost} ${bill.category}
      </p>
    `;
  });

  logsElement.innerHTML = logs.join("");
};
