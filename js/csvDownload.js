function downloadCSVs() {
  downloadCSVFromLocalStorage("diaryCSVData", "diary.csv");
  downloadCSVFromLocalStorage("diaryDetailCSVData", "diary_detail.csv");
  downloadCSVFromLocalStorage("configCSVData", "config.csv");
  downloadCSVFromLocalStorage("memoData", "memo.csv");
}

function downloadCSVFromLocalStorage(storageKey, filename) {
  const data = localStorage.getItem(storageKey);
  if (!data) return;

  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadCSV");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCSVs);
  }
});
