document.addEventListener("DOMContentLoaded", function () {
  const memoContent = document.getElementById("memoContent");
  const addMemoButton = document.getElementById("addMemoButton");
  let memoData = [];

  function loadMemo() {
    let memoDataFromLocalStorage = localStorage.getItem("memoData");
    if (memoDataFromLocalStorage) {
      memoData = parseCSV(memoDataFromLocalStorage);
      displayMemo();
    }
  }

  function parseCSV(data) {
    let parsedData = Papa.parse(data, {
      header: false,
      skipEmptyLines: true,
    });
    return parsedData.data.map((row) => row[0]);
  }

  function displayMemo() {
    memoContent.innerHTML = "";
    memoData.forEach((memo, index) => {
      const memoItem = document.createElement("div");
      memoItem.textContent = memo;
      memoItem.classList.add("memo-item");
      memoItem.setAttribute("data-memo-index", index);
      memoItem.addEventListener("click", () => editMemo(memo, index));
      memoContent.appendChild(memoItem);
    });
  }

  function editMemo(memoText, index) {
    const memoInput = document.createElement("textarea");
    memoInput.value = memoText;
    memoInput.classList.add("form-control");

    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.id = "saveButton";
    saveButton.classList.add("btn");
    saveButton.addEventListener("click", () =>
      saveMemo(memoInput.value, index)
    );

    memoContent.innerHTML = "";
    memoContent.appendChild(memoInput);
    memoContent.appendChild(saveButton);
  }

  function saveMemo(newMemo, index) {
    memoData[index] = newMemo;

    const memoText = memoData.join("\n");
    localStorage.setItem("memoData", memoText);
    displayMemo();
  }

  addMemoButton.addEventListener("click", () => editMemo("", memoData.length));

  loadMemo();
});
