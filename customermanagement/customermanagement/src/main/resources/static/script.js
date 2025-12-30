const apiUrl = "http://localhost:8081/customers";

// Load customers on page load
window.onload = loadCustomers;

// READ
function loadCustomers() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            let table = document.getElementById("customerTable");
            table.innerHTML = "";

            data.forEach(c => {
                table.innerHTML += `
                    <tr>
                        <td>${c.id}</td>
                        <td>${c.name}</td>
                        <td>${c.address}</td>
                        <td>
                            <button class="action-btn edit"
                                onclick="editCustomer(${c.id}, '${c.name}', '${c.address}')">
                                Edit
                            </button>
                            <button class="action-btn delete"
                                onclick="deleteCustomer(${c.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

// CREATE & UPDATE
function saveCustomer() {
    let id = document.getElementById("customerId").value;
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;

    let customer = { name, address };

    if (id === "") {
        // CREATE
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        }).then(() => loadCustomers());
    } else {
        // UPDATE
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        }).then(() => loadCustomers());
    }

    clearForm();
}

// DELETE
function deleteCustomer(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    }).then(() => loadCustomers());
}

// EDIT
function editCustomer(id, name, address) {
    document.getElementById("customerId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("address").value = address;
}

// Clear form
function clearForm() {
    document.getElementById("customerId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
}
