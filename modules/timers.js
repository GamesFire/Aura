// Function to start and update the timer for the given section
function startTimer() {
  let timerElement = document.getElementById("timer");

  // Extract initial time data from the HTML elements
  let hoursElement = timerElement.querySelector(
    ".auction-time__value[data-unit='hours']"
  );
  let minutesElement = timerElement.querySelector(
    ".auction-time__value[data-unit='minutes']"
  );
  let secondsElement = timerElement.querySelector(
    ".auction-time__value[data-unit='seconds']"
  );

  let hours = Number(hoursElement.textContent);
  let minutes = Number(minutesElement.textContent);
  let seconds = Number(secondsElement.textContent);

  let endTime =
    sessionStorage.getItem("endTime") ||
    Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000;

  function updateTimer() {
    let currentTime = Date.now();
    let remainingTime = endTime - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timerInterval); // Stop the timer
      // Display "ВРЕМЯ ВЫШЛО" message instead of the timer
      timerElement.innerHTML = '<span class="time-is-up">ВРЕМЯ ВЫШЛО</span>';
      // Apply styles to the "ВРЕМЯ ВЫШЛО" message
      let timeIsUpElement = timerElement.querySelector(".time-is-up");
      timeIsUpElement.style.fontSize = "28px";
      timeIsUpElement.style.fontWeight = "700";
      timeIsUpElement.style.lineHeight = "28px";
      timeIsUpElement.style.marginBottom = "6px";
      // You can add any additional actions when the timer reaches 0 here.
      return;
    }

    let remainingHours = Math.floor(remainingTime / 3600000);
    let remainingMinutes = Math.floor((remainingTime % 3600000) / 60000);
    let remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

    // Update the timer display for hours
    let hoursText = "Часов";
    if (remainingHours > 0) {
      if (remainingHours % 10 === 1 && remainingHours % 100 !== 11) {
        hoursText = "Час";
      } else if (
        [2, 3, 4].includes(remainingHours % 10) &&
        ![12, 13, 14].includes(remainingHours % 100)
      ) {
        hoursText = "Часа";
      }
      hoursElement.textContent = remainingHours.toString().padStart(2, "0");
    } else {
      hoursElement.textContent = "";
    }
    timerElement.querySelector(
      ".auction-time__text[data-unit='hours']"
    ).textContent = hours > 0 ? hoursText : "";

    // Update the timer display for minutes and seconds
    if (remainingMinutes > 0 || remainingHours > 0) {
      minutesElement.textContent = remainingMinutes.toString().padStart(2, "0");
      timerElement.querySelector(
        ".auction-time__text[data-unit='minutes']"
      ).textContent = "Мин";
    } else {
      minutesElement.textContent = "";
      timerElement.querySelector(
        ".auction-time__text[data-unit='minutes']"
      ).textContent = "";
    }
    secondsElement.textContent = remainingSeconds.toString().padStart(2, "0");

    // Store the endTime in sessionStorage
    sessionStorage.setItem("endTime", endTime);
  }

  // Initial call to update the timer
  updateTimer();

  // Start the timer with a 1-second interval
  let timerInterval = setInterval(updateTimer, 1000);
}

// Start the timer for the given section
startTimer();

//////////////////////////////////////////////////////////////////////////////////////////////////

// Function to start and update the timer for the given section
function startTimers() {
  let timerElements = document.querySelectorAll(".auction-product__timer");

  function updateTimer(timerElement) {
    let timerText = timerElement.innerText;

    // Check if the timer has already expired (text is "ВРЕМЯ ВЫШЛО")
    let timeIsUp = localStorage.getItem(`timeIsUp-${timerText}`);
    if (timeIsUp) {
      // Display "ВРЕМЯ ВЫШЛО" message instead of the timer
      timerElement.innerHTML = '<span class="time-is-up">ВРЕМЯ ВЫШЛО</span>';
      // Apply styles to the "ВРЕМЯ ВЫШЛО" message
      let timeIsUpElement = timerElement.querySelector(".time-is-up");
      timeIsUpElement.style.fontSize = "14px";
      timeIsUpElement.style.fontWeight = "700";
      timeIsUpElement.style.lineHeight = "14px";
      timeIsUpElement.style.marginBottom = "6px";
      // Return early to avoid starting the timer again
      return;
    }

    // Initialize hours, minutes, and seconds variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // Extract hours, minutes, and seconds from the timerText
    let timeParts = timerText.split(" ");

    for (let i = 0; i < timeParts.length; i += 2) {
      let timeValue = Number(timeParts[i]);
      let timeUnit = timeParts[i + 1];

      if (timeUnit.includes("ч")) {
        hours += timeValue;
      } else if (timeUnit.includes("м")) {
        minutes += timeValue;
      } else if (timeUnit.includes("с")) {
        seconds += timeValue;
      }
    }

    let endTime =
      localStorage.getItem(`endTime-${timerText}`) ||
      Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000;

    function displayTime(remainingHours, remainingMinutes, remainingSeconds) {
      // Calculate the font size based on the screen width
      let fontSize = "16px";
      if (window.innerWidth >= 768 && window.innerWidth <= 800) {
        fontSize = "14px";
      }

      // Update the timer display
      let timerHTML = "";
      if (remainingHours > 0) {
        let hoursText = "часов";
        if (remainingHours % 10 === 1 && remainingHours % 100 !== 11) {
          hoursText = "час";
        } else if (
          [2, 3, 4].includes(remainingHours % 10) &&
          ![12, 13, 14].includes(remainingHours % 100)
        ) {
          hoursText = "часа";
        }
        timerHTML += `
          <div class="auction-product-time__part">
            <span class="auction-product-time__value" style="font-size: ${fontSize}">
              ${remainingHours.toString().padStart(2, "0")}
            </span>
            <span class="auction-product-time__text" style="font-size: ${fontSize}">
              ${hoursText}
            </span>
          </div>
        `;
      }

      if (remainingMinutes > 0 || remainingHours > 0) {
        timerHTML += `
          <div class="auction-product-time__part">
            <span class="auction-product-time__value" style="font-size: ${fontSize}">
              ${remainingMinutes.toString().padStart(2, "0")}
            </span>
            <span class="auction-product-time__text" style="font-size: ${fontSize}">
              мин
            </span>
          </div>
        `;
      }

      timerHTML += `
        <div class="auction-product-time__part">
          <span class="auction-product-time__value" style="font-size: ${fontSize}">
            ${remainingSeconds.toString().padStart(2, "0")}
          </span>
          <span class="auction-product-time__text" style="font-size: ${fontSize}">
            сек
          </span>
        </div>
      `;

      timerElement.innerHTML = timerHTML;

      // Apply CSS styles to the timer elements
      timerElement.style.display = "flex";
      timerElement.style.gap = "10px";
      timerElement.style.fontSize = fontSize;
      timerElement.style.lineHeight = "16px"; // Use 16px for row height, regardless of font size
    }

    function update() {
      let currentTime = Date.now();
      let remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(timerInterval); // Stop the timer
        // Display "ВРЕМЯ ВЫШЛО" message instead of the timer
        timerElement.innerHTML = '<span class="time-is-up">ВРЕМЯ ВЫШЛО</span>';
        // Apply styles to the "ВРЕМЯ ВЫШЛО" message
        let timeIsUpElement = timerElement.querySelector(".time-is-up");
        timeIsUpElement.style.fontSize = "14px";
        timeIsUpElement.style.fontWeight = "700";
        timeIsUpElement.style.lineHeight = "14px";
        timeIsUpElement.style.marginBottom = "6px";
        // Store the flag in localStorage to remember the state
        localStorage.setItem(`timeIsUp-${timerText}`, true);
        // You can add any additional actions when the timer reaches 0 here.
        return;
      }

      let remainingHours = Math.floor(remainingTime / 3600000);
      let remainingMinutes = Math.floor((remainingTime % 3600000) / 60000);
      let remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

      displayTime(remainingHours, remainingMinutes, remainingSeconds);

      // Store the endTime in localStorage
      endTime = endTime - 1000; // Subtract one second to keep the current state
      localStorage.setItem(`endTime-${timerText}`, endTime);
    }

    // Initial call to update the timer
    update();

    // Start the timer with a 1-second interval
    let timerInterval = setInterval(update, 1000);
  }

  // Start timers for each card
  timerElements.forEach(updateTimer);
}

// Start the timers for all the cards
startTimers();