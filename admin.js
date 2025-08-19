 const loginForm = document.getElementById("formLogin");
      const sidebar = document.getElementById("sidebar");
      const mainContent = document.getElementById("mainContent");
      const roleDisplay = document.getElementById("roleDisplay");
      const managerSection = document.getElementById("manager");
      const managerTools = document.getElementById("managerTools");

      // ✅ Predefined accounts (role + username + password)
      const accounts = {
        manager: { username: "manager", password: "manager123" },
        admin: { username: "admin", password: "admin123" },
        ceo: { username: "ceo", password: "ceo123" }
      };

      // On load: check if logged in
      window.onload = () => {
        const role = localStorage.getItem("role");
        if (role && accounts[role]) {
          showDashboard(role);
        } else {
          showLogin();
        }
      };

      function showLogin() {
        loginForm.parentElement.style.display = "block";
        sidebar.style.display = "none";
        mainContent.style.display = "none";
      }

      function showDashboard(role) {
        loginForm.parentElement.style.display = "none";
        sidebar.style.display = "block";
        mainContent.style.display = "block";
        roleDisplay.textContent = role.charAt(0).toUpperCase() + role.slice(1);

        // Manager tools visible for manager, admin, ceo
        if (role === "manager" || role === "admin" || role === "ceo") {
          managerSection.style.display = "block";
          managerTools.style.display = "flex";
        } else {
          managerSection.style.display = "none";
          managerTools.style.display = "none";
        }

        // Admin section (admin + ceo)
        document.getElementById("admin").style.display =
          role === "admin" || role === "ceo" ? "block" : "none";

        // CEO section (ceo only)
        document.getElementById("ceo").style.display =
          role === "ceo" ? "block" : "none";
      }

      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!username || !password || !role) {
          alert("Please fill all fields");
          return;
        }

        // ✅ Check credentials against predefined accounts
        const account = accounts[role];
        if (!account || account.username !== username || account.password !== password) {
          alert("Invalid username, password, or role!");
          return;
        }

        // Save role and show dashboard
        localStorage.setItem("role", role);
        showDashboard(role);
      });

      function logout() {
        localStorage.removeItem("role");
        showLogin();
      }
