function normalize(code) {
  return code
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

function tokenize(line) {
  return line.replace(/\s+/g, " ").trim();
}

// Compares typed code against a reference, tolerant of blank lines / indentation,
// strict about the actual tokens on each meaningful line.
export function checkRetype(typed, reference) {
  const typedLines = normalize(typed).split("\n").map(tokenize);
  const refLines = normalize(reference).split("\n").map(tokenize);

  if (typed.trim().length === 0) {
    return { status: "empty", message: "Type the code above to practice it.", lineHint: null };
  }

  if (typedLines.join("\n") === refLines.join("\n")) {
    return { status: "success", message: "Perfect Match", lineHint: null };
  }

  const minLen = Math.min(typedLines.length, refLines.length);
  for (let i = 0; i < minLen; i++) {
    if (typedLines[i] !== refLines[i]) {
      return {
        status: "error",
        message: `Check Line ${i + 1}`,
        lineHint: i + 1,
        detail: mistakeHint(typedLines[i] || "", refLines[i] || ""),
      };
    }
  }

  if (typedLines.length < refLines.length) {
    return { status: "warn", message: "Code Incomplete", lineHint: typedLines.length + 1 };
  }

  return { status: "warn", message: "Almost Correct — extra content found", lineHint: refLines.length + 1 };
}

function mistakeHint(typedLine, refLine) {
  if (refLine.includes(";") && !typedLine.includes(";")) return "Missing Semicolon";
  if (refLine.includes("{") && !typedLine.includes("{")) return "Missing Opening Brace";
  if (refLine.includes("}") && !typedLine.includes("}")) return "Missing Closing Brace";
  if (refLine.includes("System.out") && !typedLine.includes("System.out")) return "Expected `System.out`";
  if (refLine.includes("return") && !typedLine.includes("return")) return "Missing `return`";
  return "Line does not match expected code";
}
