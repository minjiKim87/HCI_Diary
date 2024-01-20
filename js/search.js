document.getElementById("searchButton").addEventListener("click", function () {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const keyword = document.getElementById("searchKeyword").value.toLowerCase();

  fetchDataAndFilter(startDate, endDate, keyword);
});

function containsKeyword(entry, keyword) {
  const containsInTitle = entry.Title.toLowerCase().includes(keyword);
  const containsInSummary = entry.Summary.toLowerCase().includes(keyword);

  return containsInTitle || containsInSummary;
}

function fetchDataAndFilter(startDate, endDate, keyword) {
  const diaryData = localStorage.getItem("diaryCSVData");
  const entries = parseCSV(diaryData);

  const detailData = localStorage.getItem("diaryDetailCSVData");
  const details = parseCSV(detailData);

  const filteredEntries = entries.filter((entry) => {
    if (entry.Delete && entry.Delete.trim() === "1") return false;

    if (startDate && entry.Date < startDate) return false;
    if (endDate && entry.Date > endDate) return false;

    let matchesKeywordInDiary = keyword
      ? containsKeyword(entry, keyword)
      : true;
    let detail = details.find((detail) => detail.ID === entry.ID);

    let matchesKeywordInDetail =
      detail &&
      detail.Content &&
      detail.Content.toLowerCase().includes(keyword);

    if (keyword) {
      if (!matchesKeywordInDiary && !matchesKeywordInDetail) return false;
    }

    return true;
  });

  filteredEntries.sort((a, b) => new Date(b.Date) - new Date(a.Date));
  displayData(filteredEntries);
}

function fetchDataAndDisplay() {
  const diaryData = localStorage.getItem("diaryCSVData");
  const entries = parseCSV(diaryData);
  const filteredAndSortedEntries = filterAndSortData(entries);
  displayData(filteredAndSortedEntries);
}

document
  .getElementById("resetFilterButton")
  .addEventListener("click", function () {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("searchKeyword").value = "";
    fetchDataAndDisplay();
  });
