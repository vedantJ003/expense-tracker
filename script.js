const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const themeBtn = document.getElementById("theme-btn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Load Expenses
displayExpenses();

// Add Expense
addBtn.addEventListener("click", () => {

    const title = document
        .getElementById("title")
        .value
        .trim()
        .replace(/\s+/g, " ");

    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (
        title === "" ||
        amount === "" ||
        date === "" ||
        time === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    // Convert time to AM/PM format
    const formattedTime = new Date(
        "1970-01-01T" + time
    ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    const expense = {
        id: Date.now(),
        title: title,
        amount: Math.abs(Number(amount)),
        category: category,
        date: date,
        time: formattedTime
    };

    expenses.unshift(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    clearInputs();

    displayExpenses();

});

// Display Expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    let total = 0;

    const filteredExpenses = expenses.filter(expense => {

        const matchesSearch =
            expense.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());

        const matchesCategory =
            filterSelect.value === "All" ||
            expense.category === filterSelect.value;

        return matchesSearch && matchesCategory;

    });

    filteredExpenses.forEach(expense => {

        total += expense.amount;

        const li = document.createElement("li");

        li.classList.add("expense-item");

        li.innerHTML = `
            <div class="expense-details">

                <h3>${expense.title}</h3>

                <p>
                    ₹${expense.amount}
                    <br>
                    Category: ${expense.category}
                    <br>
                    Date: ${expense.date}
                    <br>
                    Time: ${expense.time}
                </p>

            </div>

            <button
                class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);

    });

    totalElement.textContent = total;

}

// Delete Expense
function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();

}

// Search
searchInput.addEventListener(
    "input",
    displayExpenses
);

// Filter
filterSelect.addEventListener(
    "change",
    displayExpenses
);

// Clear Inputs
function clearInputs() {

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";

}

// Dark Mode
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});