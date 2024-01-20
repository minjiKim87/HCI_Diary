document
  .getElementById("summarizeButton")
  .addEventListener("click", function (event) {
    this.textContent = "Loading...";

    event.preventDefault();
    let diaryContent = document.getElementById("content").value;

    diaryContent +=
      "요구사항 : 한국어로 이 일기의 내용을 요약해서 80자 이내로 본론만 적어주세요.";

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
        "OpenAI-Beta": "assistants=v1",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: diaryContent }],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("요약 데이터:", data);
        document.getElementById("summary").value =
          data.choices[0].message.content;
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
      })
      .finally(() => {
        this.textContent = "자동 요약";
      });
  });
