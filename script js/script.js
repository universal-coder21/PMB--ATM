let balance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 1000; // Initial balance
let img = document.querySelector(".hiii")
let pin = localStorage.getItem("pin") || "1234"; // Default PIN, change as needed
let transactionType = ""; // To store transaction type: "withdrawal" or "deposit"
let msg = document.querySelector(".msg")
function authenticate() {
  let enteredPIN = document.getElementById("pin").value;
  if (enteredPIN === pin) {
    img.style.display="none"
   msg.style.display="block"
   msg.innerHTML=` <P><B> KEEP YOUR PASSWORD PRIVATE </B></P>`

    showMessage("PIN accepted. Select an option.");
    document.getElementById("pinEntry").style.display = "none";
    document.getElementById("transaction").style.display = "block";
    updateBalance(); // Update balance when authenticated
  } else {
    showMessage("Invalid PIN. Try again.");
  }
}

function showWithdraw() {
  transactionType = "withdrawal";
  showMessage("Enter amount to withdraw.");
  document.getElementById("transactionOptions").style.display = "none";
  document.getElementById("amountEntry").style.display = "block";
}

function showDeposit() {
  transactionType = "deposit";
  showMessage("Enter amount to deposit.");
  document.getElementById("transactionOptions").style.display = "none";
  document.getElementById("amountEntry").style.display = "block";
}

function processTransaction() {
  let amount = parseInt(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    showMessage("Enter a valid amount.");
  } else {
    if (transactionType === "withdrawal") {
      if (amount > balance) {
        showMessage("Insufficient balance.");
      } else {
        balance -= amount;
        showMessage(`Successfully withdrew $${amount}.`);
      }
    } else if (transactionType === "deposit") {
      balance += amount;
      showMessage(`Successfully deposited ₹${amount}.`);
    }
    updateBalance();
    resetTransaction();
    localStorage.setItem("balance", balance); // Store updated balance in localStorage
  }
}

function checkBalance() {
  document.getElementById("balance").innerText = `Your balance is ₹${balance}.`;
  document.getElementById("balanceDisplay").style.display = "block";
}

function hideBalance() {
  document.getElementById("balanceDisplay").style.display = "none";
}

function changePIN() {
  let newPIN = prompt("Enter new PIN:");
  if (newPIN !== null && newPIN !== "") {
    pin = newPIN;
    localStorage.setItem("pin", pin); // Store new PIN in localStorage
    showMessage("PIN changed successfully.");
  }
}

function exit() {
  showMessage("Thank you for using our ATM. Have a nice day!");
  document.getElementById("pinEntry").style.display = "block";
  document.getElementById("transaction").style.display = "none";
  document.getElementById("pin").value = "";
  hideBalance(); // Hide balance when exiting
  resetTransaction();
}

function resetTransaction() {
  document.getElementById("amount").value = "";
  document.getElementById("amountEntry").style.display = "none";
  document.getElementById("transactionOptions").style.display = "block";
}

function showMessage(message) {
  document.getElementById("message").innerHTML = message;
}

function updateBalance() {
  document.getElementById("balance").innerHTML = `Balance: ₹${balance}`;
}
