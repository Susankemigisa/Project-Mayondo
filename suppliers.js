  // Hardcoded login credentials
  const managerUsername = "manager";
  const managerPassword = "manager1234";

  // Show login section
  function showLogin() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("stockSection").style.display = "none";
  }

  // Login check
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === managerUsername && pass === managerPassword) {
      alert("Login successful! Welcome Manager.");
      document.getElementById("loginSection").style.display = "none";
      document.getElementById("stockSection").style.display = "block";
    } else {
      alert("Invalid credentials!");
    }
  });

  // Add new row
  function addRow() {
    const tableBody = document.getElementById("stockTableBody");
    const firstRow = tableBody.querySelector("tr");
    const newRow = firstRow.cloneNode(true);
    newRow.querySelectorAll("input").forEach(input => input.value = "");
    tableBody.appendChild(newRow);
  }

  // Delete row
  function deleteRow(button) {
    const tableBody = document.getElementById("stockTableBody");
    if (tableBody.rows.length > 1) {
      button.closest("tr").remove();
    } else {
      alert("At least one row must remain.");
    }
  }

  // Submit stock form
  document.getElementById("stockForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const rows = document.querySelectorAll("#stockTableBody tr");
    const stockData = [];

    rows.forEach(row => {
      const rowData = {
        productName: row.querySelector('[name="productName"]').value,
        productType: row.querySelector('[name="productType"]').value,
        costPrice: row.querySelector('[name="costPrice"]').value,
        sellingPrice: row.querySelector('[name="sellingPrice"]').value,
        quantity: row.querySelector('[name="quantity"]').value,
        supplier: row.querySelector('[name="supplier"]').value,
        date: row.querySelector('[name="date"]').value,
        quality: row.querySelector('[name="quality"]').value,
        color: row.querySelector('[name="color"]').value,
        measurements: row.querySelector('[name="measurements"]').value
      };
      stockData.push(rowData);
    });

    localStorage.setItem("stockRecords", JSON.stringify(stockData));
    alert("Stock recorded successfully!");
  });

  // Generate stock report
  function generateReport() {
    const stockData = JSON.parse(localStorage.getItem("stockRecords")) || [];
    if (stockData.length === 0) {
      alert("No stock records found.");
      return;
    }
    console.table(stockData);
    alert("Stock Report Generated! (Check console)");
  }