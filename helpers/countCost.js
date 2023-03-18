import { BillService } from "../bills/mutations.js";

export const countCost = (category) => {
  const bills = BillService.getBillByCategory(category);

  if (!bills) return 0;

  const totalCost = bills
    .map((bill) => parseInt(bill.cost))
    .reduce((acc, num) => acc + num, 0);

  return totalCost;
};
