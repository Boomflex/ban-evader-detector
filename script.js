async function analyze() {
  const userA = document.getElementById('userA').value;
  const userB = document.getElementById('userB').value;
  const loadingSpinner = document.getElementById('loadingSpinner');

  // Show spinner
  loadingSpinner.classList.remove('hidden');

  try {
    const response = await fetch("https://2741-2a02-c7c-584a-a900-d566-912a-fc31-585b.ngrok-free.app/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_a: userA,
        user_b: userB
      })
    });

    const data = await response.json();

    // Hide spinner
    loadingSpinner.classList.add('hidden');

    if (data.error) {
      alert("Error: " + data.error);
      console.error("API Error:", data);
      return;
    }

    const score = data.similarity_score;
    const scoreSpan = document.getElementById('score');
    const scoreBar = document.getElementById('scoreBar');

    scoreSpan.textContent = score.toFixed(1);
    document.getElementById('verdict').textContent = data.verdict;

    scoreSpan.className = "";
    if (score >= 8.5) {
      scoreSpan.classList.add("score-green");
    } else if (score >= 6.5) {
      scoreSpan.classList.add("score-yellow");
    } else {
      scoreSpan.classList.add("score-red");
    }

    const percent = Math.min(100, (score / 10) * 100);
    scoreBar.style.width = percent + "%";

    document.getElementById('emoji').textContent = data.breakdown.emoji_slang;
    document.getElementById('vocab').textContent = data.breakdown.subject_matter;
    document.getElementById('pattern').textContent = data.breakdown.behavioral_pattern;

    const resultsPanel = document.getElementById('results');
    resultsPanel.classList.remove('hidden');
    resultsPanel.classList.add('show');
  } catch (error) {
    loadingSpinner.classList.add('hidden');
    alert("An error occurred: " + error.message);
    console.error("Request failed:", error);
  }
}
