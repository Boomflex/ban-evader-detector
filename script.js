async function analyze() {
  const userA = document.getElementById('userA').value;
  const userB = document.getElementById('userB').value;

  const response = await fetch("http://172.24.208.1:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user_a: userA, user_b: userB })
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
  scoreSpan.className = ""; // Reset class
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

  // Animate in the result panel
  const resultsPanel = document.getElementById('results');
  resultsPanel.classList.remove('hidden');
  resultsPanel.classList.add('show');
}
