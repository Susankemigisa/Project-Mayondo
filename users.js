// Preload 8 attendants + 1 manager if no data exists
let users = JSON.parse(localStorage.getItem("mwfUsers")) || null;
if (!users) {
  users = [
    {
      fullName: "General Manager",
      email: "manager@mwf.com",
      countryCode: "+256",
      contact: "700000001",
      role: "Manager",
      responsibilities: ["Approval", "Reporting"],
      address: "Kampala",
    },
    {
      fullName: "Attendant 1",
      email: "att1@mwf.com",
      countryCode: "+256",
      contact: "700000002",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 2",
      email: "att2@mwf.com",
      countryCode: "+256",
      contact: "700000003",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 3",
      email: "att3@mwf.com",
      countryCode: "+256",
      contact: "700000004",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 4",
      email: "att4@mwf.com",
      countryCode: "+256",
      contact: "700000005",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 5",
      email: "att5@mwf.com",
      countryCode: "+256",
      contact: "700000006",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 6",
      email: "att6@mwf.com",
      countryCode: "+256",
      contact: "700000007",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 7",
      email: "att7@mwf.com",
      countryCode: "+256",
      contact: "700000008",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
    {
      fullName: "Attendant 8",
      email: "att8@mwf.com",
      countryCode: "+256",
      contact: "700000009",
      role: "Attendant",
      responsibilities: [
        "Recording Stock",
        "Recording Sales",
        "Loading",
        "Offloading",
      ],
      address: "Warehouse",
    },
  ];
  localStorage.setItem("mwfUsers", JSON.stringify(users));
}

let editIndex = null;

function renderUsers() {
  users = JSON.parse(localStorage.getItem("mwfUsers")) || [];
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = users
    .map(
      (u, i) => `
        <tr>
          <td>${u.fullName}</td>
          <td>${u.email}</td>
          <td>${u.countryCode} ${u.contact}</td>
          <td>${u.role}</td>
          <td>${(u.responsibilities || []).join(", ")}</td>
          <td>${u.address}</td>
          <td>
            <button class='edit' onclick="editUser(${i})">Edit</button>
            <button class='danger' onclick="deleteUser(${i})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function addUser() {
  const user = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    countryCode: document.getElementById("countryCode").value,
    contact: document.getElementById("contact").value,
    role: document.getElementById("role").value,
    responsibilities: Array.from(
      document.getElementById("responsibilities").selectedOptions
    ).map((o) => o.text),
    address: document.getElementById("address").value,
  };

  if (editIndex !== null) {
    users[editIndex] = user;
    editIndex = null;
  } else {
    users.push(user);
  }
  localStorage.setItem("mwfUsers", JSON.stringify(users));
  clearForm();
  renderUsers();
}

function editUser(i) {
  const u = users[i];
  document.getElementById("fullName").value = u.fullName;
  document.getElementById("email").value = u.email;
  document.getElementById("countryCode").value = u.countryCode;
  document.getElementById("contact").value = u.contact;
  document.getElementById("role").value = u.role;
  document.getElementById("address").value = u.address;
  const respSel = document.getElementById("responsibilities");
  Array.from(respSel.options).forEach(
    (opt) => (opt.selected = (u.responsibilities || []).includes(opt.text))
  );
  editIndex = i;
}

function deleteUser(i) {
  const u = users[i];
  if (confirm(`Are you sure you want to delete ${u.fullName}?`)) {
    users.splice(i, 1);
    localStorage.setItem("mwfUsers", JSON.stringify(users));
    renderUsers();
  }
}

function clearForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("countryCode").value = "+256";
  document.getElementById("contact").value = "";
  document.getElementById("role").value = "Attendant";
  document.getElementById("responsibilities").selectedIndex = -1;
  document.getElementById("address").value = "";
}

renderUsers();
