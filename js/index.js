document.addEventListener("DOMContentLoaded", function () {
  // diary.csv
  const diaryFileInput = document.getElementById("diaryFileInput");
  diaryFileInput.addEventListener("change", function (event) {
    handleFileUpload(event, "diaryCSVData", "diaryOutput");
  });

  // diary_detail.csv
  const diaryDetailFileInput = document.getElementById("diaryDetailFileInput");
  diaryDetailFileInput.addEventListener("change", function (event) {
    handleFileUpload(event, "diaryDetailCSVData", "diaryDetailOutput");
  });

  // config.csv
  const configFileInput = document.getElementById("configFileInput");
  configFileInput.addEventListener("change", function (event) {
    handleConfigFileUpload(event, "configOutput");
  });

  //memo.csv
  const memoFileInput = document.getElementById("memoFileInput");
  memoFileInput.addEventListener("change", function (event) {
    handleFileUpload(event, "memoData");
  });

  loadPasswordFromLocalStorageOrFetch();

  function loadPasswordFromLocalStorageOrFetch() {
    const configDataFromLocalStorage = localStorage.getItem("configCSVData");
    if (configDataFromLocalStorage) {
      const parsedData = Papa.parse(configDataFromLocalStorage, {
        header: true,
        skipEmptyLines: true,
      }).data;
      if (parsedData && parsedData.length > 0) {
        localStorage.setItem("passwordFromConfig", parsedData[0].Password);
      }
    } else {
      fetch("data/config.csv")
        .then((response) => response.text())
        .then((data) => {
          const configData = Papa.parse(data, {
            header: true,
            skipEmptyLines: true,
          }).data;
          if (configData && configData.length > 0) {
            localStorage.setItem("passwordFromConfig", configData[0].Password);
          }
        })
        .catch((error) => {
          console.error("Error fetching config.csv:", error);
        });
    }
  }

  function handleConfigFileUpload(event, outputId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      localStorage.setItem("configCSVData", text);

      const lines = text.split("\n");
      const outputElement = document.getElementById(outputId);
      lines.forEach(function (line, index) {
        const row = document.createElement("tr");
        const cells = line.split(",");
        cells.forEach(function (cell) {
          let cellElement;
          if (index === 0) {
            cellElement = document.createElement("th");
          } else {
            cellElement = document.createElement("td");
          }
          cellElement.textContent = cell;
        });
      });

      "Local Storage - configCSVData:", text;
      loadPasswordFromLocalStorageOrFetch();
    };

    reader.readAsText(file, "UTF-8");
  }

  function handleFileUpload(event, localStorageKey, outputId) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      localStorage.setItem(localStorageKey, text);
    };

    reader.readAsText(file, "UTF-8");
  }
});
