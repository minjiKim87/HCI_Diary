document.addEventListener("DOMContentLoaded", function () {
  const emotionButtons = document.querySelectorAll(".emotion-box");
  const emotionValueInput = document.getElementById("emotionValue");

  const setActiveEmotion = (emotionValue) => {
    emotionButtons.forEach((button) => {
      button.classList.remove("active");
      if (button.getAttribute("data-emotion") === emotionValue) {
        button.classList.add("active");
      }
    });
  };

  emotionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setActiveEmotion(button.getAttribute("data-emotion"));
      emotionValueInput.value = button.getAttribute("data-emotion");
    });
  });

  const analyzeSentiment = (diaryContent, button) => {
    button.textContent = "Loading...";

    const prompt = `다음 일기의 내용을 감정 분석하여, 감정을 행복, 평안, 보통, 우울, 분노 중에서 어디에 해당하는지 단어로만 알려주세요. 딱 하나만 적어주세요. 일기 내용: "${diaryContent}"`;

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
        messages: [{ role: "user", content: prompt }],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const sentimentAnalysis = data.choices[0].message.content.trim();
        console.log("감정분석 결과:", sentimentAnalysis);

        const firstTwoChars = sentimentAnalysis.substring(0, 2);

        const sentimentToEmotion = {
          행복: "0",
          평안: "1",
          보통: "2",
          우울: "3",
          분노: "4",
        };

        const emotionValue = Object.keys(sentimentToEmotion).find((key) =>
          key.startsWith(firstTwoChars)
        );
        const emotionCode = sentimentToEmotion[emotionValue] || "";

        setActiveEmotion(emotionCode);
        emotionValueInput.value = emotionCode;
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
      })
      .finally(() => {
        button.textContent = "자동 분석";
      });
  };

  document
    .getElementById("autoAnalyzeButton")
    .addEventListener("click", function () {
      const diaryContent = document.getElementById("content").value;
      analyzeSentiment(diaryContent, this);
    });

  window.setActiveEmotion = setActiveEmotion;
});
