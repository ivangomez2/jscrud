import { BillService } from "./mutations.js";
import { createBillElement } from "./createBillElement.js";

export const elementsBillsByCategory = (category) => {
  const bills = BillService.getBillByCategory(category);

  if (!bills) return [];

  return bills.map((bill) => createBillElement({ data: bill }));
};
