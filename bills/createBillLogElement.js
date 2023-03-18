export const createBillLogElement = ({ data }) => {
  const p = document.createElement("p");
  const createdAtFormatted = new Date(data.createdAt).toLocaleDateString();

  p.id = `bill-${data.id}`;
  p.className = "logUp";
  p.innerHTML = `${createdAtFormatted} ${data.name} $${data.cost} ${data.category}`;

  return p;
};
