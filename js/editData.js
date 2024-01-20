document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  let detailDataFromLocalStorage = localStorage.getItem("diaryDetailCSVData");

  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);
    handleDiaryData(csvData);
  }

  function handleDiaryData(csvData) {
    let post = csvData.find((row) => row.ID === postId);
    if (post) {
      displayPostInfo(post);
      if (detailDataFromLocalStorage) {
        let detailCsvData = parseCSV(detailDataFromLocalStorage);
        handleDetailData(detailCsvData);
      }
    } else {
      console.error("Post not found for ID:", postId);
    }
  }

  function handleDetailData(detailCsvData) {
    let postDetail = detailCsvData.find((row) => row.ID === postId);
    displayPostContent(postDetail);
  }

  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      updateCSVData(postId);
    });
});

function displayPostInfo(post) {
  document.getElementById("title").value = post.Title;
  document.getElementById("date").value = post.Date;
  document.getElementById("summary").value = post.Summary;
  document.getElementById("isSecret").checked = post.Is_Secret === "1";

  setActiveEmotion(post.Emotion);
}

function setActiveEmotion(emotion) {
  const emotionButtons = document.querySelectorAll(".emotion-box");
  emotionButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("data-emotion") === emotion) {
      button.classList.add("active");
    }
  });
}

function displayPostContent(postDetail) {
  document.getElementById("content").value = postDetail.Content;
}

function updateCSVData(postId) {
  let title = sanitizeInput(document.getElementById("title").value);
  let date = sanitizeInput(document.getElementById("date").value);
  let summary = sanitizeInput(document.getElementById("summary").value);
  let content = sanitizeInput(document.getElementById("content").value);
  let isSecret = document.getElementById("isSecret").checked ? "1" : "0";
  let emotion = getSelectedEmotion();

  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  let detailDataFromLocalStorage = localStorage.getItem("diaryDetailCSVData");

  let csvDataArray = parseCSV(diaryDataFromLocalStorage);
  let postIndex = csvDataArray.findIndex((row) => row.ID === postId);
  if (postIndex !== -1) {
    csvDataArray[postIndex] = {
      ...csvDataArray[postIndex],
      Date: date,
      Title: title,
      Summary: summary,
      Is_Secret: isSecret,
      Emotion: emotion,
    };
    localStorage.setItem("diaryCSVData", convertArrayToCSV(csvDataArray));
  }

  let detailCsvDataArray = parseCSV(detailDataFromLocalStorage);
  let postDetailIndex = detailCsvDataArray.findIndex(
    (row) => row.ID === postId
  );
  if (postDetailIndex !== -1) {
    detailCsvDataArray[postDetailIndex].Content = content;
    localStorage.setItem(
      "diaryDetailCSVData",
      convertArrayToCSV(detailCsvDataArray)
    );
  }

  window.location.href = `view-detail.html?id=${postId}`;
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

function sanitizeInput(input) {
  return input.replace(/"/g, '""');
}

function getSelectedEmotion() {
  const activeButton = document.querySelector(".emotion-box.active");
  return activeButton ? activeButton.getAttribute("data-emotion") : "";
}
