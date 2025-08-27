let pendingProducts = [];
let approved = [];
let rejected = [];

function loadFromLocalStorage() {
  const storedPending =
    JSON.parse(localStorage.getItem("mwfPendingProducts")) || [];
  if (storedPending.length > 0) {
    pendingProducts = storedPending;
    document.getElementById("statusMsg").textContent =
      "✅ Products received from Inventory for approval";
    setTimeout(
      () => (document.getElementById("statusMsg").textContent = ""),
      3000
    );
  }
}

function renderTables() {
  const pBody = document.querySelector("#pendingTable tbody");
  const aBody = document.querySelector("#approvedTable tbody");
  const rBody = document.querySelector("#rejectedTable tbody");

  pBody.innerHTML = pendingProducts
    .map(
      (p, i) => `
        <tr>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>UGX ${Number(p.unitPrice).toLocaleString()}</td>
          <td>${p.qty}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
          <td>
            <button class="approve" onclick="approveProduct(${i})">Approve</button>
            <button class="reject" onclick="rejectProduct(${i})">Reject</button>
          </td>
        </tr>
      `
    )
    .join("");

  aBody.innerHTML = approved
    .map(
      (p) => `
        <tr>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>UGX ${Number(p.unitPrice).toLocaleString()}</td>
          <td>${p.qty}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
        </tr>
      `
    )
    .join("");

  rBody.innerHTML = rejected
    .map(
      (p) => `
        <tr>
          <td>${p.name}</td>
          <td>${p.reason || "—"}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
        </tr>
      `
    )
    .join("");

  localStorage.setItem("mwfPendingProducts", JSON.stringify(pendingProducts));
}

function approveProduct(i) {
  const approvedList = JSON.parse(localStorage.getItem("mwfApprovedProducts")) || [];
  approvedList.push(pendingProducts[i]);
  localStorage.setItem("mwfApprovedProducts", JSON.stringify(approvedList));

  approved.push(pendingProducts[i]);
  pendingProducts.splice(i, 1);
  renderTables();
}

function rejectProduct(i) {
  const reason = prompt("Enter rejection reason:");
  const rejectedItem = { ...pendingProducts[i], reason };

  const rejectedList = JSON.parse(localStorage.getItem("mwfRejectedProducts")) || [];
  rejectedList.push(rejectedItem);
  localStorage.setItem("mwfRejectedProducts", JSON.stringify(rejectedList));

  rejected.push(rejectedItem);
  pendingProducts.splice(i, 1);
  renderTables();
}


// Load on page start
loadFromLocalStorage();
renderTables();