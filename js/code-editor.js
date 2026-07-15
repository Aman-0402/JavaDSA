let monacoReadyPromise = null;

function loadMonaco() {
  if (monacoReadyPromise) return monacoReadyPromise;
  monacoReadyPromise = new Promise((resolve, reject) => {
    if (window.monaco) return resolve(window.monaco);
    const loaderScript = document.createElement("script");
    loaderScript.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs/loader.js";
    loaderScript.onload = () => {
      window.require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.47.0/min/vs" } });
      window.require(["vs/editor/editor.main"], () => resolve(window.monaco));
    };
    loaderScript.onerror = reject;
    document.head.appendChild(loaderScript);
  });
  return monacoReadyPromise;
}

export async function createRetypeEditor(container, theme) {
  const monaco = await loadMonaco();
  const editor = monaco.editor.create(container, {
    value: "",
    language: "java",
    theme: theme === "dark" ? "vs-dark" : "vs-dark",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
  });

  // Block paste: keydown Ctrl/Cmd+V, paste event, and context-menu paste action.
  const domNode = editor.getDomNode();
  domNode.addEventListener(
    "paste",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    true
  );
  editor.onKeyDown((e) => {
    const isPasteCombo = (e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV;
    if (isPasteCombo) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
  editor.updateOptions({ contextmenu: false });

  return editor;
}

export async function createScratchEditor(container, theme, initialValue) {
  const monaco = await loadMonaco();
  const editor = monaco.editor.create(container, {
    value: initialValue || "",
    language: "java",
    theme: theme === "dark" ? "vs-dark" : "vs-dark",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
  });

  return editor;
}
