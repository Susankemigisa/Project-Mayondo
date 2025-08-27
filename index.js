 const loginForm = document.getElementById("form");
    const errorMsg = document.getElementById("error");

    // Demo users (replace with your own)
    const users = {
      attendant: { username: "attendant", password: "1234" },
      manager:   { username: "manager",   password: "1234" },
      admin:     { username: "admin",     password: "1234" },
      ceo:       { username: "ceo",       password: "1234" }
    };

    function showLogin() {
      document.getElementById("landingPage").style.display = "none";
      document.getElementById("loginForm").style.display = "flex";
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const uname = document.getElementById("username").value.trim();
      const pwd = document.getElementById("password").value.trim();

      let role = null;
      for (const [r, creds] of Object.entries(users)) {
        if (creds.username === uname && creds.password === pwd) {
          role = r;
          break;
        }
      }

      if (!role) {
        errorMsg.style.display = "block";
        return;
      }

      // Hide login
      document.getElementById("loginForm").style.display = "none";

      // Show only the logged-in user's dashboard
      document.getElementById(role + "Dashboard").style.display = "block";
    });

    function logout() {
      // Hide all dashboards
      document.querySelectorAll(".dashboard").forEach(d => d.style.display = "none");
      // Show landing again
      document.getElementById("landingPage").style.display = "flex";
      document.getElementById("form").reset();
    }