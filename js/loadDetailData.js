document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  if (diaryDataFromLocalStorage) {
    let csvData = parseCSV(diaryDataFromLocalStorage);
    handleDiaryData(csvData);
  } else {
    fetch("data/diary.csv")
      .then((response) => response.text())
      .then((data) => {
        let csvData = parseCSV(data);
        handleDiaryData(csvData);
      })
      .catch((error) => {
        console.error("Error fetching diary.csv:", error);
      });
  }

  function handleDiaryData(csvData) {
    let post = csvData.find((row) => row.ID === postId);
    displayPostInfo(post);

    let detailDataFromLocalStorage = localStorage.getItem("diaryDetailCSVData");
    if (detailDataFromLocalStorage) {
      let detailCsvData = parseCSV(detailDataFromLocalStorage);
      handleDetailData(detailCsvData);
    } else {
      fetch("data/diary_detail.csv")
        .then((response) => response.text())
        .then((detailData) => {
          let detailCsvData = parseCSV(detailData);
          handleDetailData(detailCsvData);
        })
        .catch((error) => {
          console.error("Error fetching diary_detail.csv:", error);
        });
    }
  }

  function handleDetailData(detailCsvData) {
    let postDetail = detailCsvData.find((row) => row.ID === postId);
    displayPostContent(postDetail);
  }
});

function displayPostInfo(post) {
  const postTitleElement = document.getElementById("postTitle");
  postTitleElement.textContent = post.Title;

  if (post.Is_Secret === "1") {
    const lockIcon = document.createElement("i");
    lockIcon.className = "fas fa-lock fa-xs ml-2";
    postTitleElement.appendChild(lockIcon);
  }

  document.getElementById("postDate").textContent = post.Date;

  let summaryElement = document.getElementById("postSummary");
  summaryElement.textContent = post.Summary;
  summaryElement.style.textAlign = "center";

  displayEmotion(post.Emotion);
}

function displayPostContent(postDetail) {
  let contentElement = document.getElementById("postContent");

  contentElement.innerText = postDetail.Content;

  contentElement.style.textAlign = "left";

  document.getElementById("editButton").addEventListener("click", function () {
    const editUrl = `edit-record.html?id=${postDetail.ID}`;
    window.location.href = editUrl;
  });
}

function parseCSV(data) {
  let parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
}

function displayEmotion(emotionCode) {
  const emotionLabelMap = {
    0: "행복",
    1: "평안",
    2: "보통",
    3: "우울",
    4: "분노",
  };

  const emotionColorMap = {
    0: "#E69BC4", // 행복
    1: "#AED581", // 평안
    2: "#FFD54F", // 보통
    3: "#FF8A65", // 우울
    4: "#E57373", // 분노
  };

  const emotionContainer = document.createElement("div");
  emotionContainer.className = "emotion-display-container";
  emotionContainer.style.display = "flex";
  emotionContainer.style.alignItems = "center";
  emotionContainer.style.marginTop = "10px";

  const emotionColorBox = document.createElement("div");
  emotionColorBox.style.width = "20px";
  emotionColorBox.style.height = "20px";
  emotionColorBox.style.backgroundColor =
    emotionColorMap[emotionCode] || "#FFFFFF";
  emotionContainer.appendChild(emotionColorBox);

  const emotionTextLabel = document.createElement("p");
  emotionTextLabel.textContent = ` ${emotionLabelMap[emotionCode] || ""}`;
  emotionTextLabel.style.marginLeft = "10px";
  emotionContainer.appendChild(emotionTextLabel);

  const summaryElement = document.getElementById("postSummary");
  summaryElement.parentNode.insertBefore(
    emotionContainer,
    summaryElement.nextSibling
  );
}
