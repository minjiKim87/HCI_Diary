document.addEventListener("DOMContentLoaded", function () {
  const deleteButton = document.getElementById("deleteButton");
  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      const audio = new Audio("data/alert.mp3");
      audio.play().then(() => {
        const confirmDelete = confirm(
          "삭제하시겠습니까? 삭제된 일기는 휴지통에서 복구하실 수 있습니다."
        );
        if (confirmDelete) {
          const postId = new URLSearchParams(window.location.search).get("id");
          if (postId) {
            deleteCSVRecord(postId);
            alert("해당 일기는 휴지통으로 이동되었습니다!");
          }
        }
      });
    });
  }
});

function deleteCSVRecord(postId) {
  let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
  let detailDataFromLocalStorage = localStorage.getItem("diaryDetailCSVData");

  let csvDataArray = parseCSV(diaryDataFromLocalStorage);
  let postIndex = csvDataArray.findIndex((row) => row.ID === postId);
  if (postIndex !== -1) {
    csvDataArray[postIndex].Delete = "1";
    localStorage.setItem("diaryCSVData", convertArrayToCSV(csvDataArray));
  }

  setTimeout(() => {
    window.location.href = `diary-list.html`;
  }, 500);
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
