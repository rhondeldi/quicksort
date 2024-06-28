document.addEventListener("DOMContentLoaded", () => {
  let numbers = [];
  let stack = [];
  let low, high, pivot, i, j;
  let state = "partition";

  const renderNumbers = (currentNumbers) => {
    const stepContainer = document.createElement("div");
    stepContainer.className = "number-container";
    currentNumbers.forEach((number, index) => {
      const numberDiv = document.createElement("div");
      numberDiv.className = "number-box rounded";
      numberDiv.id = `number-${index}`;
      numberDiv.textContent = number;

      if (state === "completed") {
        numberDiv.classList.add("bg-completed");
      } else if (index === pivot) {
        numberDiv.classList.add("bg-pivot");
      } else if (index === i) {
        numberDiv.classList.add("bg-i");
      } else if (index === j) {
        numberDiv.classList.add("bg-j");
      } else {
        numberDiv.classList.add("bg-primary");
      }

      stepContainer.appendChild(numberDiv);
    });
    const sortingStepsContainer = document.getElementById(
      "sorting-steps-container"
    );
    sortingStepsContainer.appendChild(stepContainer);
    sortingStepsContainer.scrollTop = sortingStepsContainer.scrollHeight;
  };

  const displayCompletionMessage = () => {
    const messageDiv = document.getElementById("completion-message");
    messageDiv.textContent = "SORTING IS COMPLETE!";
    messageDiv.className = "alert alert-success";
  };

  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    document.getElementById(`number-${i}`).classList.add("swap");
    document.getElementById(`number-${j}`).classList.add("swap");
    setTimeout(() => {
      document.getElementById(`number-${i}`).classList.remove("swap");
      document.getElementById(`number-${j}`).classList.remove("swap");
    }, 300);
  };

  const partition = () => {
    if (stack.length > 0) {
      [low, high] = stack.pop();
      pivot = high;
      i = low - 1;
      j = low;
      state = "partitioning";
    } else {
      state = "completed";
      renderNumbers([...numbers]);
      displayCompletionMessage();
      document.getElementById("start-button").disabled = true;
    }
  };

  const nextStep = () => {
    if (state === "partitioning") {
      if (j < high) {
        if (numbers[j] < numbers[pivot]) {
          i++;
          swap(numbers, i, j);
        }
        j++;
      } else {
        swap(numbers, i + 1, high);
        const pi = i + 1;
        if (pi - 1 > low) {
          stack.push([low, pi - 1]);
        }
        if (pi + 1 < high) {
          stack.push([pi + 1, high]);
        }
        state = "partition";
        renderNumbers([...numbers]);
        partition();
      }
    } else if (state === "completed") {
      console.log("Sorting completed!");
    }
    if (state !== "completed") {
      renderNumbers([...numbers]);
    }
  };

  const startSorting = () => {
    const userNumbersInput = document.getElementById("user-numbers").value;
    const userNumbers = userNumbersInput
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));

    if (userNumbers.length < 5 || userNumbers.length > 10) {
      alert("Please enter between 5 and 10 valid numbers.");
      return;
    }

    numbers = userNumbers;
    stack.push([0, numbers.length - 1]);
    renderNumbers([...numbers]);
    document.getElementById("start-button").style.display = "none"; // Hide Start Sorting button
    document.getElementById("next-step-button").style.display = "inline-block"; // Show Next Step button
    document.getElementById("next-step-button").disabled = false;
    document.getElementById("footer").style.display = "none";
  };

  document
    .getElementById("start-button")
    .addEventListener("click", startSorting);

  document.getElementById("next-step-button").addEventListener("click", () => {
    if (state === "partition") {
      partition();
    } else {
      nextStep();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".dark-toggle-button");

  // Function to toggle theme and icon
  const toggleTheme = () => {
    const body = document.body;
    const isDarkMode = body.classList.contains("dark-mode");

    // Update class and icon based on current mode
    body.classList.toggle("dark-mode");
    toggleButton.classList.toggle("fa-sun", !isDarkMode); // Add sun icon in light mode
    toggleButton.classList.toggle("fa-moon", isDarkMode); // Add moon icon in dark mode
  };

  // Add click event listener for responsiveness
  toggleButton.addEventListener("click", toggleTheme);

  // Set initial state based on existing class
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.classList.add("fa-sun"); // Add moon icon if dark mode on page load
  } else {
    toggleButton.classList.add("fa-moon"); // Add sun icon if light mode on page load
  }
});

// New code for animation delays
document.addEventListener("DOMContentLoaded", () => {
  const titleLetters = document.querySelectorAll(".navbar-brand span");

  // Assign animation delays
  titleLetters.forEach((letter, index) => {
    letter.style.setProperty("--delay", index); // Set a CSS variable for delay
  });
});

function validateInput() {
  const inputField = document.getElementById("user-numbers");
  const inputValue = inputField.value.trim();

  // Regular expression to allow digits (0-9) and commas (,)
  const validCharactersRegex = /^[0-9,\s]*$/;

  // Check if the input value contains invalid characters
  if (!validCharactersRegex.test(inputValue)) {
    // Show an alert message for invalid characters
    alert("Please enter only numbers separated by commas.");

    // Remove invalid characters from the input field
    inputField.value = inputValue.replace(/[^0-9,]/g, "");
  }
}
