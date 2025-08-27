let users = [
      { name: "Manager", role: "Admin" },
      { name: "Attendant 1", role: "Staff" },
    ];

    function renderUsers() {
      const rolesDiv = document.getElementById("roles");
      rolesDiv.innerHTML = users.map((u, i) => `
        <div class="role-row">
          <input type="text" value="${u.name}" onchange="updateUser(${i}, 'name', this.value)">
          <select onchange="updateUser(${i}, 'role', this.value)">
            <option value="Admin" ${u.role==='Admin'?'selected':''}>Admin</option>
            <option value="Staff" ${u.role==='Staff'?'selected':''}>Staff</option>
          </select>
          <button class="danger" onclick="deleteUser(${i})">Delete</button>
        </div>
      `).join("");
    }

    function updateUser(index, field, value) {
      users[index][field] = value;
    }

    function addUser() {
      users.push({ name: "New User", role: "Staff" });
      renderUsers();
    }

    function deleteUser(index) {
      users.splice(index, 1);
      renderUsers();
    }

    function saveSettings() {
      const settings = {
        companyName: document.getElementById("companyName").value,
        currency: document.getElementById("currency").value,
        reportFreq: document.getElementById("reportFreq").value,
        transportFee: parseFloat(document.getElementById("transportFee").value),
        paymentMethods: Array.from(document.getElementById("paymentMethods").selectedOptions).map(o => o.value),
        qualityLevels: document.getElementById("qualityLevels").value.split(',').map(s => s.trim()),
        optionalFields: Array.from(document.getElementById("optionalFields").selectedOptions).map(o => o.value),
        users: users,
      };
      localStorage.setItem("mwfSettings", JSON.stringify(settings));
      alert("Settings saved!");
    }

    function loadSettings() {
      const data = localStorage.getItem("mwfSettings");
      if(data) {
        const s = JSON.parse(data);
        document.getElementById("companyName").value = s.companyName;
        document.getElementById("currency").value = s.currency;
        document.getElementById("reportFreq").value = s.reportFreq;
        document.getElementById("transportFee").value = s.transportFee;
        // payment methods
        const pm = document.getElementById("paymentMethods");
        Array.from(pm.options).forEach(opt => opt.selected = s.paymentMethods.includes(opt.value));
        document.getElementById("qualityLevels").value = s.qualityLevels.join(", ");
        const of = document.getElementById("optionalFields");
        Array.from(of.options).forEach(opt => opt.selected = s.optionalFields.includes(opt.value));
        users = s.users;
        renderUsers();
      } else {
        renderUsers();
      }
    }

    function exportData() {
      const data = localStorage.getItem("mwfSettings") || '{}';
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'mwf-settings.json'; a.click();
      URL.revokeObjectURL(url);
    }

    document.getElementById("importFile").addEventListener("change", function(e){
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          localStorage.setItem("mwfSettings", evt.target.result);
          loadSettings();
          alert("Settings imported!");
        } catch(err){ alert("Invalid settings file"); }
      }
      reader.readAsText(file);
    });

    function resetSettings() {
      if(confirm("Reset all settings to defaults?")) {
        localStorage.removeItem("mwfSettings");
        location.reload();
      }
    }

    loadSettings();