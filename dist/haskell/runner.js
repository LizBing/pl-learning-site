const endpoint = "https://play.haskell.org/submit";
const version = "9.12.4";

export function createHaskellRunner() {
  let active;

  async function execute(source, _required, onStage) {
    const controller = new AbortController();
    active = controller;
    const timer = setTimeout(() => controller.abort("timeout"), 30_000);
    onStage("Compiling and running with GHC…");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        signal: controller.signal,
        body: JSON.stringify({ code: source, version, opt: "O0", output: "run" }),
      });
      if (response.status === 429) return { error: "The Haskell Playground is rate limiting requests. Wait a moment and try again." };
      if (!response.ok) return { error: "The Haskell Playground is unavailable. Try again or copy the code and run it with GHC locally." };

      const result = await response.json();
      if (result.err) return { error: result.err };
      if (typeof result.ec !== "number" || typeof result.sout !== "string") {
        return { error: "The Haskell Playground returned an unexpected response." };
      }

      return {
        output: result.sout,
        stderr: [result.ghcout, result.serr].filter(Boolean).join("\n"),
        error: result.ec === 0 ? undefined : "GHC could not compile the code or the program exited with an error.",
      };
    } catch {
      if (controller.signal.reason === "stopped") return { stopped: true };
      if (controller.signal.reason === "timeout") return { error: "The Haskell Playground took too long. Try again." };
      return { error: "Could not reach the Haskell Playground. Check your connection or copy the code and run it with GHC locally." };
    } finally {
      clearTimeout(timer);
      if (active === controller) active = undefined;
    }
  }

  return {
    execute,
    stop() {
      active?.abort("stopped");
    },
  };
}
