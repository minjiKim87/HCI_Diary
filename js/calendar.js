var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  loadAndParseCSVData().then((diaryMap) => {
    calendarInit(diaryMap);
  });
});

function loadAndParseCSVData() {
  return new Promise((resolve, reject) => {
    let diaryDataFromLocalStorage = localStorage.getItem("diaryCSVData");
    if (diaryDataFromLocalStorage) {
      let diaryEntries = parseCSV(diaryDataFromLocalStorage);
      resolve(convertDiaryDataToMap(diaryEntries));
    } else {
      fetch("data/diary.csv")
        .then((response) => response.text())
        .then((csvData) => {
          let diaryEntries = parseCSV(csvData);
          resolve(convertDiaryDataToMap(diaryEntries));
        })
        .catch((error) => {
          console.error("Error fetching CSV:", error);
          reject(error);
        });
    }
  });
}

function parseCSV(data) {
  let parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedData.data;
}

function convertDiaryDataToMap(diaryEntries) {
  return diaryEntries.reduce((map, entry) => {
    if (entry.Delete === "0") {
      map[entry.Date] = {
        id: entry.ID,
        emotion: entry.Emotion,
      };
    }
    return map;
  }, {});
}

function calendarInit(diaryMap) {
  renderCalendar(currentYear, currentMonth, diaryMap);

  document.querySelector(".go-prev").addEventListener("click", function () {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    renderCalendar(currentYear, currentMonth, diaryMap);
  });

  document.querySelector(".go-next").addEventListener("click", function () {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    renderCalendar(currentYear, currentMonth, diaryMap);
  });
}

function renderCalendar(year, month, diaryMap) {
  var firstDay = new Date(year, month, 1).getDay();
  var lastDate = new Date(year, month + 1, 0).getDate();

  var calendar = document.querySelector(".dates");
  calendar.innerHTML = "";

  for (var i = firstDay; i > 0; i--) {
    calendar.innerHTML +=
      '<div class="day other-month">' +
      new Date(year, month, -i + 1).getDate() +
      "</div>";
  }

  for (var i = 1; i <= lastDate; i++) {
    var day = document.createElement("div");
    day.className = "day current-month";
    day.textContent = i;

    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    var fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i
    ).padStart(2, "0")}`;
    if (diaryMap[fullDate]) {
      day.classList.add("has-entry");
      day.addEventListener("click", () => {
        window.location.href = `view-detail.html?id=${diaryMap[fullDate]}`;
      });
    }

    calendar.appendChild(day);
  }

  for (var i = 1; i < 7 - new Date(year, month, lastDate).getDay(); i++) {
    calendar.innerHTML += '<div class="day other-month">' + i + "</div>";
  }

  document.querySelector(".year-month").textContent = `${year}.${String(
    month + 1
  ).padStart(2, "0")}`;

  highlightDiaryDates(diaryMap, year, month);
}
function highlightDiaryDates(diaryMap, currentYear, currentMonth) {
  const emotionColors = {
    0: "#E69BC4", // 행복
    1: "#AED581", // 평안
    2: "#FFD54F", // 보통
    3: "#FF8A65", // 우울
    4: "#E57373", // 분노
  };

  var days = document.querySelectorAll(".day.current-month");
  days.forEach(function (dayElement) {
    var day = dayElement.textContent.padStart(2, "0");
    var fullDate = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${day}`;

    if (diaryMap[fullDate]) {
      const emotion = diaryMap[fullDate].emotion;
      dayElement.style.backgroundColor = emotionColors[emotion] || "#aaa";
      dayElement.addEventListener("click", function () {
        window.location.href = `view-detail.html?id=${diaryMap[fullDate].id}`;
      });
    }
  });
}
