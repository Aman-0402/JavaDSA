// Frontend-only keyword/pattern matching against a lesson's practiceQuestions rules.
// Never claims real Java compilation or hidden test execution.
export function checkPracticeAnswer(answer, rule) {
  const normalized = answer.trim().toLowerCase();
  if (normalized.length === 0) {
    return { status: "empty", message: "Write an answer to check it." };
  }

  const requiredKeywords = rule.requiredKeywords || [];
  const missing = requiredKeywords.filter((kw) => !normalized.includes(kw.toLowerCase()));

  if (missing.length === 0) {
    return { status: "success", message: rule.successMessage || "Looks good — covers the key ideas." };
  }

  return {
    status: "warn",
    message: rule.hintMessage || "Not quite — consider mentioning:",
    missing,
  };
}
