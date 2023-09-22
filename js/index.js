document.addEventListener("DOMContentLoaded", function () {
  const csvFileInput = document.getElementById("csvFileInput");
  const csvOutput = document.getElementById("csvOutput");

  csvFileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      const lines = text.split("\n");
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
          row.appendChild(cellElement);
        });

        csvOutput.appendChild(row);
      });
    };

    reader.readAsText(file, "UTF-8");
  });
});
