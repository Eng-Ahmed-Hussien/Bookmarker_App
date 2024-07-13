const submitBtn = document.getElementById("submitBtn");
const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");
const tableBody = document.getElementById("tableBody");
const validitionAlert = document.getElementById("validitionAlert");
const closeBtn = document.getElementById("closeBtn");

let sitesContainer = [];

if (localStorage.getItem("sites") != null) {
  sitesContainer = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

submitBtn.addEventListener("click", function () {
  addSite();
});

function addSite() {
  if (validtionName() == true && validtionURL() == true) {
    if (isDuplicate(siteName.value, siteURL.value)) {
      alertDisplay();
    } else {
      var siteDetiles = {
        siteObName: siteName.value,
        siteObURL: siteURL.value,
      };
      sitesContainer.push(siteDetiles);
      localStorage.setItem("sites", JSON.stringify(sitesContainer));
      displayData();
      siteName.value = "";
      siteURL.value = "";
      clearValiditonRegex();
    }
  } else {
    alertDisplay();
  }
}

function isDuplicate(name, url) {
 return sitesContainer.some(
    (site) => site.siteObName === name || site.siteObURL === url
  );
}

function displayData() {
  var newSite = "";
  sitesContainer.forEach((site, index) => {
    newSite += `
      <tr>
        <td>${index + 1}</td>
        <td>${site.siteObName}</td>
        <td>
          <a href="${site.siteObURL}" target="_blank" class="btn btn-visit">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a>
        </td>
        <td>
          <button onclick="deleteItem(${index})" class="btn btn-delete pe-2">
            <i class="fa-solid fa-trash-can"></i>Delete
          </button>
        </td>
      </tr>
    `;
  });
  tableBody.innerHTML = newSite;
}

function deleteItem(deleteIndex) {
  sitesContainer.splice(deleteIndex, 1);
  localStorage.setItem("sites", JSON.stringify(sitesContainer));
  displayData();
}

// Start Validation

const regexURL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
const regetNAme = /^\w{4,}$/;

siteName.addEventListener("input", () => validtionName());
siteURL.addEventListener("input", () => validtionURL());
function validtionName() {
  if (regetNAme.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else if (siteName.value == "") {
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  } else if (regetNAme.test(siteName.value) != true) {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validtionURL() {
  if (regexURL.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else if (siteURL.value == "") {
    siteURL.classList.remove("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  } else if (regexURL.test(siteURL.value) != true) {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  }
}

function clearValiditonRegex() {
  siteURL.classList.remove("is-valid");
  siteName.classList.remove("is-valid");
}

function alertDisplay() {
  validitionAlert.classList.add("d-block");
  validitionAlert.classList.remove("d-none");
}

closeBtn.addEventListener("click", function () {
  validitionAlert.classList.remove("d-block");
  validitionAlert.classList.add("d-none");
});
