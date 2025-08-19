   // Hardcoded users
    const users = {
      attendant: "1234",
      manager: "admin123",
    };

    document.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("loggedInUser")) {
        document.getElementById("mainApp").style.display = "block";
      } else {
        document.getElementById("loginPage").style.display = "block";
      }

      document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const user = document.getElementById("username").value.toLowerCase();
        const pass = document.getElementById("password").value;

        if (users[user] && users[user] === pass) {
          localStorage.setItem("loggedInUser", user);
          document.getElementById("loginPage").style.display = "none";
          document.getElementById("mainApp").style.display = "block";
        } else {
          document.getElementById("loginError").style.display = "block";
        }
      });

      // live total calculation
      document.addEventListener("input", function(e) {
        if (e.target.classList.contains("quantity") || e.target.classList.contains("price") || e.target.classList.contains("transport")) {
          updateRowTotal(e.target.closest("tr"));
        }
      });
    });

    function logout() {
      localStorage.removeItem("loggedInUser");
      document.getElementById("mainApp").style.display = "none";
      document.getElementById("loginPage").style.display = "block";
    }

    function addRow() {
      const tbody = document.getElementById("tableBody");
      const newRow = tbody.rows[0].cloneNode(true);
      newRow.querySelectorAll("input, select").forEach(el => {
        if (el.type === "checkbox") el.checked = false;
        else el.value = "";
      });
      tbody.appendChild(newRow);
    }

    function deleteRow(btn) {
      const row = btn.closest("tr");
      const tbody = document.getElementById("tableBody");
      if (tbody.rows.length > 1) row.remove();
    }

    function updateRowTotal(row) {
      const qty = parseInt(row.querySelector(".quantity").value) || 0;
      const price = parseFloat(row.querySelector(".price").value) || 0;
      const transport = row.querySelector(".transport").checked ? 5000 : 0;
      const total = (qty * price) + transport;
      row.querySelector(".total").value = total.toFixed(2);
    }

    document.getElementById("salesTableForm").addEventListener("submit", function(e) {
      e.preventDefault();
      generateReceipt();
    });

    function generateReceipt() {
      const rows = document.querySelectorAll("#tableBody tr");
      let receiptText = "=== SALES RECEIPT ===\n\n";
      let grandTotal = 0;

      rows.forEach((row, i) => {
        const salesperson = row.querySelector("[name='salesperson']").value;
        const role = row.querySelector("[name='role']").value;
        const date = row.querySelector("[name='date']").value;
        const time = row.querySelector("[name='time']").value;
        const item = row.querySelector("[name='item']").value;
        const qty = parseInt(row.querySelector("[name='quantity']").value) || 0;
        const price = parseFloat(row.querySelector("[name='price']").value) || 0;
        const transport = row.querySelector("[name='transport']").checked ? 5000 : 0;
        const total = parseFloat(row.querySelector("[name='total']").value) || 0;
        const customer = row.querySelector("[name='customer']").value;
        const payment = row.querySelector("[name='payment']").value;
        const notes = row.querySelector("[name='notes']").value;

        grandTotal += total;

        receiptText += `Sale #${i+1}\nSalesperson: ${salesperson} (${role})\nDate/Time: ${date} ${time}\nItem: ${item}\nQuantity: ${qty}\nUnit Price: ${price}\nTransport: ${transport}\nTotal: ${total}\nCustomer: ${customer}\nPayment: ${payment}\nNotes: ${notes}\n-------------------------\n`;
      });

      receiptText += `Grand Total: ${grandTotal}\n\nThank you for your business!`;
      document.getElementById("receiptBox").textContent = receiptText;
    }

    function printReceipt() { window.print(); }

    function generateReport() {
      const rows = document.querySelectorAll("#tableBody tr");
      let reportText = "=== MANAGER REPORT ===\n\n";
      let salesByPerson = {};
      let salesByPayment = {};
      let totalRevenue = 0;

      rows.forEach(row => {
        const salesperson = row.querySelector("[name='salesperson']").value || "Unknown";
        const total = parseFloat(row.querySelector("[name='total']").value) || 0;
        const payment = row.querySelector("[name='payment']").value || "Unspecified";

        totalRevenue += total;
        salesByPerson[salesperson] = (salesByPerson[salesperson] || 0) + total;
        salesByPayment[payment] = (salesByPayment[payment] || 0) + total;
      });

      reportText += "Sales by Salesperson:\n";
      for (let sp in salesByPerson) {
        reportText += `${sp}: ${salesByPerson[sp].toFixed(2)}\n`;
      }

      reportText += "\nSales by Payment Method:\n";
      for (let pm in salesByPayment) {
        reportText += `${pm}: ${salesByPayment[pm].toFixed(2)}\n`;
      }

      reportText += `\nTotal Revenue: ${totalRevenue.toFixed(2)}\n`;
      document.getElementById("reportBox").textContent = reportText;
    }

    function printReport() { window.print(); }