/*JS code for Dave McNally's KF website - gets input from form, validates, and exports
data to a ".json" file so that I can use the data for follow up*/

//Create variables for input
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Function to retrieve saved contact info from localStorage
function getContacts() {
  return JSON.parse(localStorage.getItem("contacts") || "[]"); //uses JSON.parse to create object array
}

// Save contacts data back to localStorage as JSON 
function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Handler function to get user's radio button values.  
function getRadioValue(name) {
  const radios = document.getElementsByName(name);
  for (const radio of radios) {
    if (radio.checked) return radio.value; //checks for radio button being checked
  }
  return ""; // or null if none selected
}

// Handler function to get all checked checkbox values with query selectAll method
function getCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cbox => cbox.value);
}
// Event handler for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

//Get all values from the user input
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const experience = getRadioValue("experience");
const years = document.getElementById("years").value;
const expdetails = document.getElementById("pastexp").value.trim();
const goals = getCheckboxValues("goal");
    if (!name || !email) {
    alert("Please fill in your name and email."); //validation check for contact info
    return;
    }

// Initialize the variable to get contact data
const contacts = getContacts();

// Add contact object data to string array
contacts.push({
    name,
    email,
    experience,
    years,
    expdetails,
    goals,
    date: new Date().toISOString(),
  });

//  Save to localStorage
saveContacts(contacts);

// Clear the form fields after submission
form.reset();

alert("THANKS FOR FILLING OUT THIS FORM!"); //alert when saved
});

// Create and download a JSON file to local computer from saved contacts for networking or building a client list.  
function downloadJSON() {  //downloads JSON text format
  const contacts = getContacts();
  const blob = new Blob ([JSON.stringify(contacts, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a"); //creates variable a for downloaded data
  a.href = url;
  a.download = "contacts.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

//Clear form but not localStorage
function clearForm() {
    form.reset();
    alert("Your form is reset")
}


// Provide password prompt before download to 'protect' user data.  
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const password = prompt("Enter the password to download data:");
  if (password === "kungfu2025") {
    downloadJSON();
  } else {
    alert("Incorrect password. Access denied!");
  }
});