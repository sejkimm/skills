function go(idx) {
  const chapters = document.querySelectorAll(".chapter");
  const buttons = document.querySelectorAll(".side-link");
  const totalChapters = chapters.length;

  chapters.forEach((chapter, i) => {
    chapter.classList.toggle("active", i === idx);
  });
  buttons.forEach((button, i) => {
    button.classList.toggle("active", i === idx);
    const group = button.closest(".side-chapter");
    if (group) {
      group.classList.toggle("active", i === idx);
    }
  });

  const progress = document.getElementById("progress");
  if (progress && totalChapters > 0) {
    progress.style.width = `${((idx + 1) / totalChapters) * 100}%`;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function checkQuiz(btn, result, id) {
  const quiz = btn.closest(".quiz");
  if (!quiz || quiz.dataset.answered) return;

  quiz.dataset.answered = "true";
  quiz.querySelectorAll(".quiz-opt").forEach(option => {
    if (option.dataset.result === "correct") {
      option.classList.add("correct");
    } else if (option === btn) {
      option.classList.add("wrong");
    }
  });

  const explanation = document.getElementById(id);
  if (explanation) {
    explanation.style.display = "block";
  }
}
