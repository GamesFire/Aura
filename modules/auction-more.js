// Function to handle the "Все аукционы" button click
function handleAuctionButtonClick() {
  let itemList = document.querySelectorAll(".auction__list .auction__item");
  let button = document.querySelector(".auction__more");
  let buttonText = document.querySelector(".auction-btn__text");

  if (button.innerText === "Все аукционы") {
    // Show all hidden items with fade-in effect
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].classList.contains("hide-item")) {
        itemList[i].classList.remove("hide-item");
        itemList[i].classList.add("show-item");
        itemList[i].style.animation = "fade-in 0.5s ease forwards";
      }
    }

    // Change button text to "Скрыть все аукционы"
    buttonText.innerText = "Скрыть все аукционы";
  } else {
    // Hide all visible items
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].classList.contains("show-item")) {
        itemList[i].classList.remove("show-item");
        itemList[i].classList.add("hide-item");
      }
    }

    // Change button text to "Все аукционы"
    buttonText.innerText = "Все аукционы";

    // Scroll to the first item with the class "main-item"
    let firstMainItem = document.querySelector(".main-item");
    if (firstMainItem) {
      let itemOffsetTop = firstMainItem.offsetTop;
      window.scrollTo({
        top: itemOffsetTop,
        behavior: "smooth",
      });
    }
  }
}

// Check if the screen size is less than 1439px
const mediaQuery = window.matchMedia("(max-width: 1439px)");

// Add the event listener only if the screen size is less than 1439px
if (mediaQuery.matches) {
  document
    .querySelector(".auction__more")
    .addEventListener("click", handleAuctionButtonClick);
}
