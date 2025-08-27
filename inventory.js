  let inventory = JSON.parse(localStorage.getItem("mwfInventory")) || [];
    let invChart, lowChart;

    function renderInventory() {
      const tbody = document.querySelector("#inventoryTable tbody");
      tbody.innerHTML = "";
      inventory.forEach((p, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="checkbox" class="select-product" data-index="${i}"></td>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.qty}</td>
          <td>${Number(p.unitPrice).toLocaleString()}</td>
          <td>${p.supplier}</td>
          <td>${p.date}</td>
          <td><button class="secondary" onclick="editProduct(${i})">✏️ Edit</button></td>
        `;
        tbody.appendChild(row);
      });
      localStorage.setItem("mwfInventory", JSON.stringify(inventory));
      updateCharts();
    }

    function updateCharts() {
      const ctx1 = document.getElementById("inventoryChart").getContext("2d");
      const ctx2 = document.getElementById("lowStockChart").getContext("2d");

      const labels = inventory.map(i => i.name);
      const quantities = inventory.map(i => i.qty);
      const lowStock = inventory.filter(i => i.qty <= 5);

      if (invChart) invChart.destroy();
      if (lowChart) lowChart.destroy();

      invChart = new Chart(ctx1, {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Stock Qty", data: quantities, backgroundColor: "#0077ff" }]
        },
        options: { indexAxis: "y", plugins: { legend: { display: false } } }
      });

      lowChart = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: lowStock.map(i => i.name),
          datasets: [{ label: "Low Stock", data: lowStock.map(i => i.qty), backgroundColor: "#ff4d4d" }]
        },
        options: { indexAxis: "y", plugins: { legend: { display: false } } }
      });
    }

    function addRow() {
      const tbody = document.querySelector("#addProductTable tbody");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="text" class="name"></td>
        <td>
          <select class="category">
            <option value="Wood">Wood</option>
            <option value="Furniture">Furniture</option>
          </select>
        </td>
        <td><input type="number" class="qty" min="1" value="1"></td>
        <td><input type="number" class="price" min="0" value="0"></td>
        <td><input type="text" class="supplier"></td>
        <td><input type="date" class="date"></td>
        <td><button class="delete" onclick="removeRow(this)">❌</button></td>
      `;
      tbody.appendChild(row);
    }

    function removeRow(btn) {
      btn.closest("tr").remove();
    }

    function saveAllProducts() {
      const rows = document.querySelectorAll("#addProductTable tbody tr");
      rows.forEach(row => {
        const name = row.querySelector(".name").value.trim();
        const category = row.querySelector(".category").value;
        const qty = parseInt(row.querySelector(".qty").value);
        const unitPrice = parseFloat(row.querySelector(".price").value);
        const supplier = row.querySelector(".supplier").value.trim();
        const date = row.querySelector(".date").value;
        if (name && supplier && date && qty > 0 && unitPrice >= 0) {
          inventory.push({ name, category, qty, unitPrice, supplier, date });
        }
      });
      localStorage.setItem("mwfInventory", JSON.stringify(inventory));
      renderInventory();
      document.querySelector("#addProductTable tbody").innerHTML = "";
    }

    function deleteSelected() {
      const checkboxes = document.querySelectorAll(".select-product:checked");
      const indexes = Array.from(checkboxes).map(cb => Number(cb.dataset.index)).sort((a,b) => b-a);
      indexes.forEach(i => inventory.splice(i, 1));
      renderInventory();
    }
function editProduct(i) {
  const p = inventory[i];
  const newName = prompt("Edit Product Name:", p.name) || p.name;
  const newCategory = prompt("Edit Category:", p.category) || p.category;
  const newQty = parseInt(prompt("Edit Quantity:", p.qty)) || p.qty;
  const newPrice = parseFloat(prompt("Edit Unit Price:", p.unitPrice)) || p.unitPrice;
  const newSupplier = prompt("Edit Supplier:", p.supplier) || p.supplier;
  const newDate = prompt("Edit Date:", p.date) || p.date;

  inventory[i] = { 
    name: newName, 
    category: newCategory, 
    qty: newQty, 
    unitPrice: newPrice, 
    supplier: newSupplier, 
    date: newDate 
  };

  localStorage.setItem("mwfInventory", JSON.stringify(inventory));
  renderInventory();
}


    function sendSelectedToApprovals() {
  const checkboxes = document.querySelectorAll(".select-product:checked");
  let pending = JSON.parse(localStorage.getItem("mwfPendingProducts")) || [];
  const indexes = Array.from(checkboxes).map(cb => Number(cb.dataset.index)).sort((a,b) => b-a);

  indexes.forEach(i => {
    pending.push(inventory[i]);
    inventory.splice(i, 1); // remove from inventory after sending
  });

  localStorage.setItem("mwfPendingProducts", JSON.stringify(pending));
  localStorage.setItem("mwfInventory", JSON.stringify(inventory));
  renderInventory();
  alert(`✅ ${indexes.length} product(s) sent to approvals and removed from inventory.`);
}


   function generateInventoryReport() {
  let report = "📊 MWF Inventory Report\n\n";
  let totalValue = 0, totalQty = 0;
  inventory.forEach((p,i) => {
    const qty = Number(p.qty);
    const price = Number(p.unitPrice);
    const value = qty * price;
    totalValue += value;
    totalQty += qty;
    report += `${i+1}. ${p.name} - ${qty} units @ UGX ${price.toLocaleString()} = UGX ${value.toLocaleString()}\n`;
  });
  report += `\n📦 Total Quantity: ${totalQty}\n💰 Total Value: UGX ${totalValue.toLocaleString()}`;
  document.getElementById("reportBox").textContent = report;
}


    function printInventoryReport() {
      const report = document.getElementById("reportBox").textContent;
      const win = window.open("", "_blank");
      win.document.write("<pre>" + report + "</pre>");
      win.print();
      win.close();
    }

    addRow();
    renderInventory();