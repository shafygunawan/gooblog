/*!
 * GooBlog (https://shafygunawan.github.io/gooblog)
 * Copyright 2021 Shafy Gunawan (https://www.linkedin.com/in/shafygunawan/)
 * Licensed under MIT (https://github.com/shafygunawan/gooblog/blob/main/LICENSE)
 */
function navbarToggle() {
  const navbarInner = document.querySelector(".navbar__inner");
  if (navbarInner.classList.contains("navbar__inner_hide")) {
    navbarInner.classList.remove("navbar__inner_hide");
  } else {
    navbarInner.classList.add("navbar__inner_hide");
  }
}

/**
 *
 * @param {Element} dropdown
 */
function getDropdownSiblings(dropdown) {
  let dropdownSiblings = [];
  let dropdownPreviousElement = dropdown.previousElementSibling;
  let dropdownPreviousCount = dropdown.previousElementSibling ? 1 : 0;

  for (let i = 0; i < dropdownPreviousCount; i++) {
    if (dropdownPreviousElement != null) {
      dropdownSiblings.push(dropdownPreviousElement);
      dropdownPreviousElement = dropdownPreviousElement.previousElementSibling;
      dropdownPreviousCount++;
    }
  }

  let dropdownNextElement = dropdown.nextElementSibling;
  let dropdownNextCount = dropdown.nextElementSibling ? 1 : 0;
  for (let i = 0; i < dropdownNextCount; i++) {
    if (dropdownNextElement != null) {
      dropdownSiblings.push(dropdownNextElement);
      dropdownNextElement = dropdownNextElement.nextElementSibling;
      dropdownNextCount++;
    }
  }

  return dropdownSiblings;
}

/**
 *
 * @param {Element} dropdownButton
 */
function dropdownToggle(dropdownButton) {
  const dropdownList = dropdownButton.nextElementSibling;

  if (dropdownList.classList.contains("dropdown__list_display_show")) {
    dropdownList.classList.remove("dropdown__list_display_show");
    dropdownButton.classList.remove("dropdown__button_active");

    const dropdownListChilds = dropdownList.querySelectorAll(
      ".dropdown .dropdown__list"
    );
    for (let dropdownListChild of dropdownListChilds) {
      dropdownListChild.classList.remove("dropdown__list_display_show");
      dropdownListChild.previousElementSibling.classList.remove(
        "dropdown__button_active"
      );
    }
  } else {
    let isOneSection =
      dropdownList.parentElement.parentElement.classList.contains(
        "dropdown__list_display_show"
      );
    if (!isOneSection) {
      const dropdownListShows = document.querySelectorAll(
        ".dropdown__list_display_show"
      );
      for (let dropdownListShow of dropdownListShows) {
        dropdownListShow.classList.remove("dropdown__list_display_show");
        dropdownListShow.previousElementSibling.classList.remove(
          "dropdown__button_active"
        );
      }
    } else {
      const dropdownSiblings = getDropdownSiblings(dropdownList.parentElement);
      for (let dropdownSibling of dropdownSiblings) {
        if (dropdownSibling.querySelector(".dropdown__list")) {
          if (
            dropdownSibling
              .querySelector(".dropdown__list")
              .classList.contains("dropdown__list_display_show")
          ) {
            const dropdownSiblingLists = dropdownSibling.querySelectorAll(
              ".dropdown__list_display_show"
            );

            for (let dropdownSiblingList of dropdownSiblingLists) {
              dropdownSiblingList.classList.remove(
                "dropdown__list_display_show"
              );
              dropdownSiblingList.previousElementSibling.classList.remove(
                "dropdown__button_active"
              );
            }
          }
        }
      }
    }

    dropdownList.classList.add("dropdown__list_display_show");
    dropdownButton.classList.add("dropdown__button_active");
  }
}

window.addEventListener("load", () => {
  const navbarToggler = document.querySelector(".navbar__toggler");
  navbarToggler.addEventListener("click", () => {
    navbarToggle();
  });

  const dropdownButtons = document.querySelectorAll(".dropdown__button");
  for (let dropdownButton of dropdownButtons) {
    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownToggle(dropdownButton);
    });
  }

  window.addEventListener("click", () => {
    for (let dropdownButton of dropdownButtons) {
      if (
        dropdownButton.nextElementSibling.classList.contains(
          "dropdown__list_display_show"
        )
      ) {
        dropdownButton.nextElementSibling.classList.remove(
          "dropdown__list_display_show"
        );
        dropdownButton.classList.remove("dropdown__button_active");
      }
    }
  });
});
