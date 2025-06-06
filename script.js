async function analyze() {
  const userA = document.getElementById('userA').value;
  const userB = document.getElementById('userB').value;

  const spinner = document.getElementById('loadingSpinner');
  const resultsPanel = document.getElementById('results');

  // Show spinner
  spinner.classList.remove('hidden');
  resultsPanel.classList.add('hidden');

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

    if (data.error) {
      alert("Error: " + data.error);
      console.error("API Error:", data);
      return;
    }

    const score = data.similarity_score;
    const scoreSpan = document.getElementById('score');
    const scoreBar = document.getElementById('scoreBar');

    // Update numeric score and verdict
    scoreSpan.textContent = score;
    document.getElementById('verdict').textContent = data.verdict;

    // Score styling
    scoreSpan.className = "";
    if (score >= 8.5) {
      scoreSpan.classList.add("score-green");
    } else if (score >= 6.5) {
      scoreSpan.classList.add("score-yellow");
    } else {
      scoreSpan.classList.add("score-red");
    }

    // Animate score bar
    const percent = Math.min(100, (score / 10) * 100);
    scoreBar.style.width = percent + "%";

    // Show breakdown
    document.getElementById('emoji').textContent = data.breakdown.emoji_slang;
    document.getElementById('vocab').textContent = data.breakdown.subject_matter;
    document.getElementById('pattern').textContent = data.breakdown.behavioral_pattern;

    // Show results
    resultsPanel.classList.remove('hidden');
    resultsPanel.classList.add('show');

  } catch (error) {
    alert("Something went wrong. Check the console for more info.");
    console.error("Request failed:", error);
  } finally {
    // Hide spinner
    spinner.classList.add('hidden');
  }
}
