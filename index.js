import { recountCost } from "./helpers/recountCost.js";
import { BillService } from "./bills/mutations.js";
import { BillTable } from "./components/BillTable.js";
import { LogBills } from "./components/LogBills.js";
import { createBillElement, createBillLogElement } from "./bills/index.js";

const root = document.getElementById("root");
const form = document.querySelector("form#addBill");
const categorySelect = document.querySelector("#myList");
const inputBillName = document.querySelector("input#pharmacyInputName");
const inputBillCost = document.querySelector("input#pharmacyInputCost");
const logsElement = document.getElementById("logs");

const tables = [
  BillTable({ name: "Farmacia" }),
  BillTable({ name: "Supermercado" }),
  BillTable({ name: "Verduleria" }),
  BillTable({ name: "Varios" }),
  BillTable({ name: "Emilce" }),
  BillTable({ name: "Valeria" }),
];

const submitForm = (e) => {
  e.preventDefault();

  const name = inputBillName.value;
  const cost = inputBillCost.value;
  const category = categorySelect.value;

  const formIncompleted = cost === "" || name === "" || category === "";

  if (formIncompleted)
    return alert("you must be add a data in the empty input");

  const newBill = BillService.createBill({
    data: {
      cost,
      category,
      name,
    },
  });

  const toody = tables
    .find((table) => table.id === category)
    .querySelector("tbody");
    
  const newBillElement = createBillElement({ data: newBill });
  const newBillLogElement = createBillLogElement({ data: newBill });

  recountCost({ category });

  toody.appendChild(newBillElement);
  logsElement.appendChild(newBillLogElement);

  cleanInputs();
};

const cleanInputs = () => {
  inputBillName.value = "";
  inputBillCost.value = "";
  categorySelect.value = "";
};

const init = () => {
  tables.forEach((table) => {
    root.appendChild(table);
  });

  LogBills();
};

form.addEventListener("submit", submitForm);

init();
