const entriesPerPage = 15;
document.addEventListener("DOMContentLoaded", function () {
  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);
    filteredData = filterAndSortData(csvData, true);
    totalPages = Math.ceil(filteredData.length / entriesPerPage);
    changePage(1);
  }

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
function filterAndSortData(data, onlyDeleted = false) {
  let filteredData = data.filter((row) => {
    return onlyDeleted ? row.Delete === "1" : row.Delete !== "1";
  });

  filteredData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  return filteredData;
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

function parseCSV(data) {
  const results = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });
  return results.data;
}

function convertArrayToCSV(arrayData) {
  return Papa.unparse(arrayData);
}

function filterAndSortData(data) {
  let filteredData = data.filter((row) => {
    if (row.Delete && row.Delete.trim() === "1") {
      return true;
    }
    return false;
  });

  filteredData.sort((a, b) => {
    return new Date(b.Date) - new Date(a.Date);
  });

  return filteredData;
}

function parseCSV(data) {
  const results = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });
  return results.data;
}

function convertArrayToCSV(arrayData) {
  return Papa.unparse(arrayData);
}

function displayData(data) {
  let tableBody = document.querySelector("table tbody");

  data.forEach((row) => {
    if (row.ID && row.ID !== "null" && row.ID.trim() !== "") {
      let tr = document.createElement("tr");

      let checkBoxTd = document.createElement("td");
      let checkBoxInput = document.createElement("input");
      checkBoxInput.type = "checkbox";
      checkBoxInput.value = row.ID;
      checkBoxTd.appendChild(checkBoxInput);
      tr.appendChild(checkBoxTd);

      let dateTd = document.createElement("td");
      dateTd.textContent = row.Date;
      tr.appendChild(dateTd);

      let titleTd = document.createElement("td");
      let titleLink = document.createElement("a");
      titleLink.href = `view-detail.html?id=${row.ID}`;
      titleLink.textContent = row.Title;
      titleTd.appendChild(titleLink);
      tr.appendChild(titleTd);

      let summaryTd = document.createElement("td");
      summaryTd.textContent = row.Summary;
      tr.appendChild(summaryTd);

      tableBody.appendChild(tr);
    }
  });

  document
    .getElementById("restoreButton")
    .addEventListener("click", restoreSelectedRecords);
}

function restoreSelectedRecords() {
  let selectedCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  let selectedIDs = [];
  selectedCheckboxes.forEach((checkbox) => {
    selectedIDs.push(checkbox.value);
  });

  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);

    for (let row of csvData) {
      if (selectedIDs.includes(row.ID)) {
        row.Delete = "0";
      }
    }

    localStorage.setItem("diaryCSVData", convertArrayToCSV(csvData));

    alert("선택한 항목이 복구되었습니다.");
    window.location.href = `diary-list.html`;
  } else {
    alert("복구할 항목을 선택하세요.");
  }
}

document
  .getElementById("permanentDeleteButton")
  .addEventListener("click", function () {
    const audio = new Audio("data/alert.mp3");
    audio.play().then(() => {
      let confirmation = confirm("정말로 선택한 항목을 영구삭제하시겠습니까?");
      if (confirmation) {
        permanentDeleteSelectedRecords();
      }
    });
  });
function permanentDeleteSelectedRecords() {
  let selectedCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  let selectedIDs = [];
  selectedCheckboxes.forEach((checkbox) => {
    selectedIDs.push(checkbox.value);
  });

  if (selectedIDs.length === 0) {
    alert("영구 삭제할 항목을 선택하세요.");
    return;
  }

  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);
    let updatedData = csvData.filter((row) => !selectedIDs.includes(row.ID));

    localStorage.setItem("diaryCSVData", convertArrayToCSV(updatedData));

    alert("선택한 항목이 영구삭제되었습니다.");
    location.reload();
  }
}
