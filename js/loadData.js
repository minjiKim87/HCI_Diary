let passwordFromConfig = localStorage.getItem("configCSVData");
let currentPage = 1;
const entriesPerPage = 15;
let totalPages = 0;
let filteredData = [];

let isSortedAscending = true;

document.addEventListener("DOMContentLoaded", function () {
  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);
    filteredData = filterAndSortData(csvData);
    totalPages = Math.ceil(filteredData.length / entriesPerPage);
    changePage(1);
  } else {
    fetch("data/diary.csv")
      .then((response) => response.text())
      .then((data) => {
        let csvData = parseCSV(data);
        filteredData = filterAndSortData(csvData);
        totalPages = Math.ceil(filteredData.length / entriesPerPage);
        changePage(1);
      })
      .catch((error) => {
        console.error("Error fetching CSV:", error);
      });
  }
  document.getElementById("sortButton").addEventListener("click", function () {
    isSortedAscending = !isSortedAscending;
    filteredData.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return isSortedAscending ? dateA - dateB : dateB - dateA;
    });
    changePage(currentPage);
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  });
});

function filterAndSortData(data) {
  let filteredData = data.filter((row) => {
    if (row.Delete && row.Delete.trim() === "1") {
      return false;
    }
    return true;
  });

  filteredData.sort((a, b) => {
    return new Date(b.Date) - new Date(a.Date);
  });

  return filteredData;
}

function parseCSV(data) {
  let parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  return parsedData.data;
}

function displayData(dataSubset) {
  let tableBody = document.querySelector("table tbody");

  dataSubset.forEach((row) => {
    if (row.ID && row.ID !== "null" && row.ID.trim() !== "") {
      let tr = document.createElement("tr");

      let dateTd = document.createElement("td");
      dateTd.textContent = row.Date;
      tr.appendChild(dateTd);

      let titleTd = document.createElement("td");
      let titleLink = document.createElement("a");
      titleLink.href = `javascript:void(0);`;
      titleLink.textContent = row.Title;
      titleLink.onclick = function () {
        if (row.Is_Secret === "1") {
          let password = prompt("비밀번호를 입력하세요:");

          if (password === passwordFromConfig) {
            window.location.href = `view-detail.html?id=${row.ID}`;
          } else {
            alert("비밀번호가 틀렸습니다.");
          }
        } else {
          window.location.href = `view-detail.html?id=${row.ID}`;
        }
      };
      titleTd.appendChild(titleLink);
      tr.appendChild(titleTd);

      let summaryTd = document.createElement("td");
      summaryTd.textContent = row.Summary;
      tr.appendChild(summaryTd);

      let secretTd = document.createElement("td");
      secretTd.classList.add("lock-column");

      if (row.Is_Secret === "1") {
        let lockIcon = document.createElement("i");
        lockIcon.className = "fas fa-lock";
        secretTd.appendChild(lockIcon);
      } else {
        secretTd.textContent = "";
      }
      tr.appendChild(secretTd);

      tableBody.appendChild(tr);
    }
  });
}

function changePage(page) {
  currentPage = page;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  displayData(paginatedData);
  updatePageIndicator();
}

function updatePageIndicator() {
  document.getElementById(
    "pageIndicator"
  ).textContent = `${currentPage} / ${totalPages}`;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  });
});
