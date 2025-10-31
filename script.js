const userContainer = document.getElementById("user-container");
const reloadBtn = document.getElementById("reload-btn");

// Function 1️⃣: Fetch and display users
async function fetchUsers() {
  userContainer.innerHTML = "<p>Loading user data...</p>";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    showError("⚠️ Failed to fetch data. Please check your internet connection.");
    console.error("Error fetching users:", error);
  }
}

// Function 2️⃣: Display users on the page
function displayUsers(users) {
  userContainer.innerHTML = ""; // clear container
  users.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-card");
    userDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(userDiv);
  });
}

// Function 3️⃣: Show error message
function showError(message) {
  userContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Function 4️⃣: Handle offline/online status
function checkNetworkStatus() {
  if (!navigator.onLine) {
    userContainer.innerHTML = `
      <div class="offline">
        🚫 You are offline. Please check your internet connection.
      </div>
    `;
  } else {
    fetchUsers();
  }
}

// Function 5️⃣: Reload button functionality
reloadBtn.addEventListener("click", () => {
  checkNetworkStatus();
});

// Event listeners for internet status changes
window.addEventListener("online", () => {
  showOnlineMessage();
  fetchUsers();
});

window.addEventListener("offline", () => {
  showError("🚫 You are offline. Please check your internet connection.");
});

function showOnlineMessage() {
  userContainer.innerHTML = `<p style="color: green; font-weight: bold;">✅ Internet reconnected. Fetching data...</p>`;
}

// Fetch on page load
checkNetworkStatus();
