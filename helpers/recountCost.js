import { countCost } from "./countCost.js";

export const recountCost = ({ category }) => {
  const table = document.querySelector(`table#${category}`);

  const totalCost = countCost(category);
  const costSpan = table.querySelector("caption > span");

  costSpan.innerHTML = totalCost;
};
