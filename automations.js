console.log("SCRIPT LOADED");

// lisening for click events
window.onclick = function (event) {
  if (event.target.matches("#toggle-dropdown")) {
    // show dropdown options
    var div = document.getElementById("dropdownContent");
    div.style.display = div.style.display !== "flex" ? "flex" : "none";
  }

  // This is the example automation
  if (event.target.matches(".example")) {
    exampleAutomations();
  }

  // This is where you will execute your automation
  if (event.target.matches(".execute-test")) {
    yourAutomation();
  }
};

function exampleAutomations() {
  let users = [];

  // Get all divs in the feed containing the user details of each post
  const userDetailsDivs = document.querySelectorAll(
    ".update-components-actor__meta"
  );

  for (let i = 0; i < userDetailsDivs.length; i++) {
    const userDetailsDiv = userDetailsDivs[i];

    // extracting the name and job title
    const user = {
      name: userDetailsDiv.querySelector(
        '.update-components-actor__name span[aria-hidden="true"]'
      ).innerText,
      jobTitle: userDetailsDiv.querySelector(
        '.update-components-actor__description span[aria-hidden="true"]'
      ).innerText,
    };
    users.push(user);
  }
  const usersString = users
    .map((user) => `Name: ${user.name} \nJob: ${user.jobTitle}`)
    .join("\n\n");

  alert(usersString);
}

// This is where you will write your automation
function yourAutomation() {
  // Get the first post on the feed
  let post = document.querySelector(
    ".social-details-social-counts__count-value"
  );

  if (!post) return;

  // click on the post and once the popup is visible extract users
  // click post return promise because popup takes time to be visible
  clickPost(post)
    .then(extractUserDetails)
    .catch(() => alert("Something went wrong"));
}

// function to simulate click on HTML element and return promise
function clickPost(element) {
  return new Promise((resolve) => {
    // simulate click on given element
    element.click();
    // resolve promise after a delay
    setTimeout(resolve, 1500);
  });
}

// Function to click a button inside a modal and wait for content to load
function clickButtonAndWait() {
  return new Promise((resolve) => {
    // Get post reactions modal
    const modal = document.querySelector("#artdeco-modal-outlet");
    // Get scollable content of the modal
    const scrollDiv = modal.querySelector(
      ".social-details-reactors-modal__content"
    );
    // Get the button within the modal to load more content
    let button = modal.querySelector(".scaffold-finite-scroll__load-button");

    // If no button found then there's no more content to load
    // resolve immediately
    if (!button) return resolve();

    // Simulate button clicking to load more content
    const clickInterval = setInterval(() => {
      if (button) {
        button.click();
        button = document.querySelector(".scaffold-finite-scroll__load-button");
        scrollDiv.scrollTo(0, scrollDiv.scrollHeight);
      } else {
        // resolve once there's no more content to load
        clearInterval(clickInterval);
        resolve();
      }
    }, 700);
  });
}

function extractUserDetails() {
  let users = [];

  clickButtonAndWait()
    .then(() => {
      // Extract user details once all users are visible
      const userDetailsDivs = document.querySelectorAll(
        ".social-details-reactors-tab-body-list-item.artdeco-list__item"
      );

      for (let i = 0; i < userDetailsDivs.length; i++) {
        const userDetailsDiv = userDetailsDivs[i];

        // extracting name and job
        const user = {
          name: userDetailsDiv.querySelector(
            ".artdeco-entity-lockup__title.ember-view span[aria-hidden='true']"
          )?.innerText,
          job: userDetailsDiv.querySelector(
            ".artdeco-entity-lockup__caption.ember-view"
          )?.innerText,
        };

        users.push(user);
      }

      const usersString = users
        .map((user) => `Name: ${user.name} \nJob: ${user.job}`)
        .join("\n\n");
      console.log(usersString);
      alert(usersString);
    })
    .catch(() => {
      alert("Something went wrong");
    });
}
