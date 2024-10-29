// Get references to elements
var dropdownBtn = document.getElementById("list1").querySelector('.dropdown-button');
var dropdownContent = document.getElementById("list1").querySelector('.dropdown-content');
var selectedConditionsBody = document.getElementById("selected-conditions");

// Function to create a table row for a selected option
function createTableRow(optionValue) {
  var tableRow = document.createElement("tr");
  var tableCell1 = document.createElement("td");
  var tableCell2 = document.createElement("td");
  var tableCell3 = document.createElement("td");

  // Replace underscores with spaces and capitalize each word (optional)
  var displayedText = optionValue.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

  // Set displayed text for the first cell (Selected Conditions)
  tableCell1.textContent = displayedText;

  // Create provider dropdown structure
  var providerDropdown = document.createElement("div");
  providerDropdown.classList.add("dropdown"); // Add dropdown class
  var providerButton = document.createElement("button");
  providerButton.classList.add("dropdown-button"); // Add button class
  providerButton.textContent = "Select Provider"; // Button text
  providerDropdown.appendChild(providerButton);

  var providerList = document.createElement("ul");
  providerList.classList.add("dropdown-content"); // Add dropdown content class
  var providerOption1 = document.createElement("li");
  var providerOption2 = document.createElement("li");
  providerOption1.textContent = "OAR";
  providerOption2.textContent = "Lab";
  providerList.appendChild(providerOption1);
  providerList.appendChild(providerOption2);
  providerDropdown.appendChild(providerList);



  // Handle provider selection
  providerList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      providerButton.textContent = event.target.textContent; // Update button text
    }
  });

  // Create textarea for details
  var detailsTextarea = document.createElement("textarea");
  const container = detailsTextarea.parentElement;
  detailsTextarea.placeholder = "Enter Details"; // Optional placeholder text

  detailsTextarea.addEventListener('input', () => {
    container.style.height = detailsTextarea.scrollHeight + 'px';
  });


  tableCell2.appendChild(providerDropdown);
  tableCell3.appendChild(detailsTextarea); // Append textarea to "Details" cell

  tableRow.appendChild(tableCell1);
  tableRow.appendChild(tableCell2);
  tableRow.appendChild(tableCell3);
  return tableRow;
}

// Keep track of existing table rows (optional)
var existingRows = [];

dropdownContent.addEventListener('change', function(event) {
  var selectedOptions = [];

  // Loop through all checkboxes
  for (var checkbox of dropdownContent.querySelectorAll('input[type="checkbox"]')) {
    if (checkbox.checked) {
      selectedOptions.push(checkbox.value);
    }
  }

  // Update existing rows and add/remove new ones based on selectedOptions
  updateSelectedConditions(selectedOptions);
});

function updateSelectedConditions(selectedOptions) {
  const existingRows = [...selectedConditionsBody.querySelectorAll('tr')]; // Get a copy of existing rows

  // Loop through selected options
  for (var option of selectedOptions) {
    var foundRow = false;

    // Check if a row already exists for this option
    for (var i = 0; i < existingRows.length; i++) {
      const existingRow = existingRows[i];
      if (existingRow.querySelector('td:first-child').textContent === option.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})) {
        foundRow = true;
        existingRows.splice(i, 1); // Remove found row from existingRows copy
        break; // Exit the inner loop if row found
      }
    }

    // If row doesn't exist, create and append a new row
    if (!foundRow) {
      var newRow = createTableRow(option);
      selectedConditionsBody.appendChild(newRow);
    }
  }

  // Remove any remaining rows that are not in selectedOptions
  for (var i = existingRows.length - 1; i >= 0; i--) {
    selectedConditionsBody.removeChild(existingRows[i]);
  }
}