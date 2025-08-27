
        // preload attendants
const attendants = [
  "Attendant 1",
  "Attendant 2",
  "Attendant 3",
  "Attendant 4",
  "Attendant 5",
  "Attendant 6",
  "Attendant 7",
  "Attendant 8",
];
const attendantSelect = document.getElementById("attendant");
attendants.forEach((a) => {
  const opt = document.createElement("option");
  opt.value = a;
  opt.textContent = a;
  attendantSelect.appendChild(opt);
});

// load sales and receipt number
let sales = JSON.parse(localStorage.getItem("mwfSales")) || [];
let receiptNo = parseInt(localStorage.getItem("mwfReceiptNo")) || 1;

function renderSales() {
  sales = JSON.parse(localStorage.getItem("mwfSales")) || [];
  const tbody = document.querySelector("#salesTable tbody");
  tbody.innerHTML = "";
  let totalSales = 0,
    totalTransport = 0;
  let paymentSummary = { Cash: 0, Cheque: 0, Overdraft: 0 };

  sales.forEach((s, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${s.date}</td>
          <td>${s.time}</td>
          <td>${s.product}</td>
          <td>${s.quantity}</td>
          <td>${s.unitPrice}</td>
          <td>${s.transportUsed ? "5%" : "No"}</td>
          <td>${s.total.toLocaleString()}</td>
          <td>${s.payment}</td>
          <td>${s.customer}</td>
          <td>${s.attendant}</td>
          <td>
            <button class='secondary' onclick='printReceipt(${i})'>Print Receipt</button>
            <button class='danger' onclick='deleteSale(${i})'>Delete</button>
          </td>
        `;
    tbody.appendChild(row);

    totalSales += s.total;
    if (s.transportUsed) totalTransport += s.unitPrice * s.quantity * 0.05;
    paymentSummary[s.payment] += s.total;
  });

  document.getElementById("summary").innerHTML = `
        Total Sales: UGX ${totalSales.toLocaleString()} |
        Transport Fees: UGX ${totalTransport.toLocaleString()} |
        Cash: UGX ${paymentSummary.Cash.toLocaleString()} |
        Cheque: UGX ${paymentSummary.Cheque.toLocaleString()} |
        Overdraft: UGX ${paymentSummary.Overdraft.toLocaleString()}
      `;
  localStorage.setItem("mwfSales", JSON.stringify(sales));
}

function addSale() {
  const date = document.getElementById("saleDate").value;
  const time = document.getElementById("saleTime").value;
  const product = document.getElementById("product").value;
  const qty = parseInt(document.getElementById("quantity").value);
  const unitPrice = parseFloat(document.getElementById("unitPrice").value);
  const transportUsed = document.getElementById("transportUsed").checked;
  const payment = document.getElementById("paymentMethod").value;
  const customer = document.getElementById("customer").value;
  const attendant = document.getElementById("attendant").value;

  if (!date || !time || !product || qty <= 0 || unitPrice <= 0 || !customer) {
    alert("Please fill all fields correctly.");
    return;
  }

  const total = unitPrice * qty + (transportUsed ? unitPrice * qty * 0.05 : 0);

  sales.push({
    receiptNo: receiptNo++,
    date,
    time,
    product,
    quantity: qty,
    unitPrice,
    transportUsed,
    total,
    payment,
    customer,
    attendant,
  });
  localStorage.setItem("mwfSales", JSON.stringify(sales));
  localStorage.setItem("mwfReceiptNo", receiptNo);
  renderSales();

  // clear form
  document.getElementById("product").value = "";
  document.getElementById("quantity").value = 1;
  document.getElementById("unitPrice").value = 0;
  document.getElementById("transportUsed").checked = false;
  document.getElementById("customer").value = "";
}

function deleteSale(i) {
  if (confirm("Are you sure you want to delete this sale?")) {
    sales.splice(i, 1);
    localStorage.setItem("mwfSales", JSON.stringify(sales));
    renderSales();
  }
}

function printReceipt(i) {
  const s = sales[i];
  const printArea = document.getElementById("printArea");

  // Inject receipt HTML
  printArea.innerHTML = `
    <div class='receipt'>
      <h3>Mayondo Wood & Furniture</h3>
      <p>Receipt #${s.receiptNo}</p>
      <p>Date: ${s.date} ${s.time}</p>
      <p>Customer: ${s.customer}</p>
      <table>
        <tr><td>Item:</td><td>${s.product}</td></tr>
        <tr><td>Qty:</td><td>${s.quantity}</td></tr>
        <tr><td>Unit Price:</td><td>${s.unitPrice.toLocaleString()} UGX</td></tr>
        ${
          s.transportUsed
            ? `<tr><td>Transport (5%):</td><td>${(
                s.unitPrice * s.quantity * 0.05
              ).toLocaleString()} UGX</td></tr>`
            : ""
        }
        <tr class='total-line'><td>GRAND TOTAL:</td><td>${s.total.toLocaleString()} UGX</td></tr>
      </table>
      <p>Thank you ${s.customer} for your business!</p>
    </div>
  `;

  // Open print dialog
  window.print();
}



function generateReport() {
  let totalSales = 0;
  let totalTransport = 0;
  let paymentSummary = { Cash: 0, Cheque: 0, Overdraft: 0 };
  sales.forEach((s) => {
    totalSales += s.total;
    if (s.transportUsed) totalTransport += s.unitPrice * s.quantity * 0.05;
    paymentSummary[s.payment] += s.total;
  });
  document.getElementById("reportBox").textContent = `
        Manager Report\n====================\n
        Total Sales: UGX ${totalSales.toLocaleString()}\n
        Transport Fees: UGX ${totalTransport.toLocaleString()}\n
        Cash Sales: UGX ${paymentSummary.Cash.toLocaleString()}\n
        Cheque Sales: UGX ${paymentSummary.Cheque.toLocaleString()}\n
        Overdraft Sales: UGX ${paymentSummary.Overdraft.toLocaleString()}\n
        Transactions Recorded: ${sales.length}
      `;
}

function printReport() {
  const reportBox = document.getElementById("reportBox");
  const originalContent = document.body.innerHTML;
  const printContent = reportBox.outerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  location.reload();
}

renderSales();