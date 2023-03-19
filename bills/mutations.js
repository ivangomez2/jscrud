const getBills = () => {
  return JSON.parse(localStorage.getItem("bills")) ?? [];
};

const getBillById = (id) => {
  const bills = getBills();

  if (bills.length === 0) throw "Bills not found";

  return bills.find((bill) => bill.id === id);
};

const getBillByCategory = (category) => {
  const bills = getBills();

  return bills.filter((bill) => bill.category === category);
};

const createBill = ({ data }) => {
  const today = new Date();

  const bill = {
    id: getBills().length + 1,
    createdAt: today,
    updatedAt: today,
    name: data.name,
    cost: data.cost,
    category: data.category,
  };

  const bills = getBills();

  bills.push(bill);

  localStorage.setItem("bills", JSON.stringify(bills));

  return bill;
};

const upadteBillById = ({ where, data }) => {
  let bill = getBillById(where.id);

  bill = {
    ...bill,
    updatedAt: new Date(),
    name: data.name,
    cost: data.cost,
    category: data.category,
  };

  const bills = getBills();

  bills.push(bill);

  localStorage.setItem("bills", JSON.stringify(bills));
};

const deleteBillById = ({ where }) => {
  getBillById(where.id); // search bill to throw error if not exist

  let bills = getBills();

  bills = bills.filter((bill) => bill.id !== where.id);

  localStorage.setItem("bills", JSON.stringify(bills));
};

export const BillService = {
  getBills,
  createBill,
  deleteBillById,
  getBillById,
  upadteBillById,
  getBillByCategory,
};
