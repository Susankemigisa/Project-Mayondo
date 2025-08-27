 // Fetch data from localStorage
      const sales = JSON.parse(localStorage.getItem("mwfSales")) || [];
      const inventory = JSON.parse(localStorage.getItem("mwfInventory")) || [];
      const approvals = JSON.parse(localStorage.getItem("mwfApprovals")) || [];

      // ---------- Top KPIs ----------
      const today = new Date().toISOString().split("T")[0];
      const todaysSales = sales.filter((s) => s.date === today);
      const todaysRevenue = todaysSales.reduce((a, s) => a + s.total, 0);
      const totalInventoryValue = inventory.reduce(
        (a, i) => a + (i.unitPrice || 0) * (i.qty || 0),
        0
      );

      const kpiContainer = document.getElementById("topKPIs");
      const kpis = [
        { title: "Today's Sales", value: `${todaysSales.length} items` },
        { title: "Today's Revenue", value: `UGX ${todaysRevenue.toLocaleString()}` },
        { title: "Total Revenue", value: `UGX ${sales.reduce((a, s) => a + s.total, 0).toLocaleString()}` },
        { title: "Total Transactions", value: sales.length },
        { title: "Total Inventory Items", value: inventory.length },
        { title: "Inventory Value", value: `UGX ${totalInventoryValue.toLocaleString()}` },
        { title: "Total Approvals", value: approvals.length },
      ];
      kpis.forEach((k) => {
        const div = document.createElement("div");
        div.classList.add("kpi-card");
        div.innerHTML = `<p>${k.title}</p><h2>${k.value}</h2>`;
        kpiContainer.appendChild(div);
      });

      // ---------- Revenue over Time ----------
      const revenueByMonth = {};
      sales.forEach((s) => {
        const m = s.date.slice(0, 7);
        revenueByMonth[m] = (revenueByMonth[m] || 0) + s.total;
      });
      new Chart(document.getElementById("revenueChart"), {
        type: "bar",
        data: {
          labels: Object.keys(revenueByMonth),
          datasets: [{ label: "Revenue UGX", data: Object.values(revenueByMonth), backgroundColor: "#00ff9f" }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      });

      // ---------- Most Sold Items ----------
      const productSales = {};
      sales.forEach((s) => (productSales[s.product] = (productSales[s.product] || 0) + s.quantity));
      const topItems = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
      new Chart(document.getElementById("topItemsChart"), {
        type: "bar",
        data: {
          labels: topItems.map((i) => i[0]),
          datasets: [{ label: "Qty Sold", data: topItems.map((i) => i[1]), backgroundColor: "#2a9d8f" }],
        },
        options: { indexAxis: "y", responsive: true, plugins: { legend: { display: false } } },
      });

      // ---------- Sales by Attendant ----------
      const attendantSales = {};
      sales.forEach((s) => (attendantSales[s.attendant] = (attendantSales[s.attendant] || 0) + s.total));
      new Chart(document.getElementById("attendantChart"), {
        type: "bar",
        data: {
          labels: Object.keys(attendantSales),
          datasets: [{ label: "Total Sales UGX", data: Object.values(attendantSales), backgroundColor: "#f4a261" }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      });

      // ---------- Payment Methods ----------
      const payments = { Cash: 0, Cheque: 0, Overdraft: 0 };
      sales.forEach((s) => (payments[s.payment] += s.total));
      new Chart(document.getElementById("paymentChart"), {
        type: "pie",
        data: {
          labels: Object.keys(payments),
          datasets: [{ data: Object.values(payments), backgroundColor: ["#00ff9f", "#f4a261", "#ff4d4d"] }],
        },
      });

      // ---------- Transport Usage ----------
      const transportData = [sales.filter((s) => s.transportUsed).length, sales.filter((s) => !s.transportUsed).length];
      new Chart(document.getElementById("transportChart"), {
        type: "doughnut",
        data: { labels: ["Used", "Not Used"], datasets: [{ data: transportData, backgroundColor: ["#2a9d8f", "#f4a261"] }] },
      });

const approvedList = JSON.parse(localStorage.getItem("mwfApprovedProducts")) || [];
const rejectedList = JSON.parse(localStorage.getItem("mwfRejectedProducts")) || [];
const pendingList = JSON.parse(localStorage.getItem("mwfPendingProducts")) || [];

const approved = approvedList.length;
const pending = pendingList.length;
const rejected = rejectedList.length;


new Chart(document.getElementById("approvalChart"), {
  type: "doughnut",
  data: {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [{
      data: [approved, pending, rejected],
      backgroundColor: ["#00ff9f", "#f4a261", "#ff4d4d"]
    }]
  }
});



      // ---------- Inventory Stock Levels ----------
      const invLabels = inventory.map((i) => i.name);
      const invQuantities = inventory.map((i) => i.qty);
      new Chart(document.getElementById("inventoryChart"), {
        type: "bar",
        data: {
          labels: invLabels,
          datasets: [{ label: "Stock Qty", data: invQuantities, backgroundColor: "#0077ff" }],
        },
        options: { indexAxis: "y", responsive: true, plugins: { legend: { display: false } } },
      });

      // ---------- Low Stock Items ----------
      const lowStock = inventory.filter((i) => i.qty <= 5);
      new Chart(document.getElementById("lowStockChart"), {
        type: "bar",
        data: {
          labels: lowStock.map((i) => i.name),
          datasets: [{ label: "Low Stock Qty", data: lowStock.map((i) => i.qty), backgroundColor: "#ff4d4d" }],
        },
        options: { indexAxis: "y", responsive: true, plugins: { legend: { display: false } } },
      });

      // ---------- Latest Orders Table ----------
      const tableBody = document.querySelector("#latestOrders tbody");
      sales.slice(-10).reverse().forEach((s) => {
        const tr = document.createElement("tr");
        const statusClass = s.status || "Delivered"; // fallback
        tr.innerHTML = `<td>${s.product}</td><td>${s.date}</td><td>${s.customer}</td>
                        <td><span class="status ${statusClass}">${statusClass}</span></td>
                        <td>UGX ${s.total.toLocaleString()}</td>`;
        tableBody.appendChild(tr);
      });