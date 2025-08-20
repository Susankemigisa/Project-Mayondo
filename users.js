 // SIMPLE LOGIN SYSTEM
    const validUsers = {
      "admin": { password: "admin1234", role: "Admin" },
      "manager": { password: "manager1234", role: "Manager" },
      "ceo": { password: "ceo1234", role: "CEO" },
    };

    document.getElementById("loginForm").addEventListener("submit", function(e){
      e.preventDefault();
      const username = document.getElementById("username").value.toLowerCase();
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;

      if(validUsers[username] && validUsers[username].password === password && validUsers[username].role === role){
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("loggedInRole").innerText = role;
        loadAttendants();
      } else {
        document.getElementById("loginError").innerText = "Invalid login credentials!";
      }
    });

    // ATTENDANTS
    function loadAttendants(){
      const tbody = document.getElementById("attendantsTableBody");
      tbody.innerHTML = "";
      for (let i = 1; i <= 8; i++) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="text" name="attendantName" class="form-control" placeholder="Attendant ${i} Name" required /></td>
          <td>
            <select name="attendantTask" class="form-select" required>
              <option value="">Select Task</option>
              <option>Recording Stock</option>
              <option>Sales</option>
              <option>Loading</option>
              <option>Offloading</option>
            </select>
          </td>
        `;
        tbody.appendChild(row);
      }
    }

    // ADD / DELETE ROWS
    function addRow(){
      const table = document.getElementById("usersTableBody");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input type="text" name="fullName" class="form-control" required /></td>
        <td><input type="email" name="email" class="form-control" required /></td>
        <td>
          <div class="contact-group">
            <select name="countryCode" class="form-select" required>
              <option value="">Code</option>
              <option value="+256">+256 (UG)</option>
              <option value="+254">+254 (KE)</option>
              <option value="+255">+255 (TZ)</option>
              <option value="+250">+250 (RW)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input type="tel" name="contact" class="form-control" required placeholder="7XXXXXXXX" />
          </div>
        </td>
        <td>
          <select name="role" class="form-select" required>
            <option value="">Select</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>CEO</option>
          </select>
        </td>
        <td><input type="text" name="address" class="form-control" required /></td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button></td>
      `;
      table.appendChild(row);
    }

    function deleteRow(btn){
      btn.closest("tr").remove();
    }