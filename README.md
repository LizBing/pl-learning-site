# Learning Workbench

The starting page links to the Go, Zig, and Haskell courses. They share the lesson, playground, and progress views. Go and Zig run in the browser. Haskell sends code to the [Haskell Playground](https://play.haskell.org/) when you run code or check an exercise.

The [Haskell course](dist/haskell/) has 19 lessons in six modules, with chapter links to the community edition of Miran Lipovača’s [Learn You a Haskell](https://learnyouahaskell.github.io/chapters.html). The original exercises lead to a reading-log program that validates rows and reports total pages. You can also copy a lesson into `Main.hs` and run it with `runghc Main.hs`.

The site is static. To preview it, run `python3 -m http.server --directory dist` from this folder and open `http://localhost:8000`.

Drafts and progress are stored per course in the browser. Browsers keep that storage scoped to the site address, so activity on the standalone Go and Zig sites is still available on those sites.
