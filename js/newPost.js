document.addEventListener("DOMContentLoaded", function () {
  initializeForm();

  document
    .getElementById("newPostForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      writeDataToLocalStorage();
    });
});

function initializeForm() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;
}

function writeDataToLocalStorage() {
  try {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let summary = document.getElementById("summary").value;
    let content = document.getElementById("content").value;
    let emotion = document.getElementById("emotionValue").value;
    let isSecret = document.getElementById("isSecret").checked ? "1" : "0";

    let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
    let detailDataFromLocalStorage = localStorage.getItem("diaryDetailCSVData");

    let diaryDataArray = diaryDataFromLocalStorage
      ? parseCSV(diaryDataFromLocalStorage)
      : [];
    let detailDataArray = detailDataFromLocalStorage
      ? parseCSV(detailDataFromLocalStorage)
      : [];

    let lastID =
      diaryDataArray.length > 0 && diaryDataArray[diaryDataArray.length - 1].ID
        ? parseInt(diaryDataArray[diaryDataArray.length - 1].ID)
        : 0;
    let newID = lastID + 1;

    diaryDataArray.push({
      ID: newID.toString(),
      Date: date,
      Title: title,
      Summary: summary,
      Is_Secret: isSecret,
      Delete: "0",
      Emotion: emotion,
    });

    detailDataArray.push({
      ID: newID.toString(),
      Content: content,
    });

    localStorage.setItem("diaryCSVData", convertArrayToCSV(diaryDataArray));
    localStorage.setItem(
      "diaryDetailCSVData",
      convertArrayToCSV(detailDataArray)
    );

    window.location.href = `view-detail.html?id=${newID}`;
  } catch (error) {
    console.error("Error in writeDataToLocalStorage:", error);
  }
}

function parseCSV(data) {
  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
}

function convertArrayToCSV(arrayData) {
  return Papa.unparse(arrayData);
}
