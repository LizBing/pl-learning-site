const tutorial = "https://learnyouahaskell.github.io/";

function lesson(id, title, minutes, reference, explanation, task, hints, expected, solution, placeholder) {
  const exercise = /\{- exercise -\}([\s\S]*?)\{- end -\}/;
  return {
    id, title, minutes, reference: tutorial + reference + ".html",
    explanation: [explanation], task, hints: [hints], expected,
    solution: solution.replace(exercise, "$1"),
    initial: solution.replace(exercise, () => "-- Replace this definition.\n" + placeholder),
  };
}

export const course = {
  id: "haskell",
  name: "Haskell",
  file: "Main.hs",
  storageKey: "workbench:haskell:v1",
  description: "Learn to think in functions, model data with types, and build a reading log that handles invalid input.",
  referenceLabel: "Read the Learn You a Haskell chapter",
  playgroundCode: `main :: IO ()
main = print (take 6 (map (^ (2 :: Int)) [1 :: Integer ..]))
`,
  playgroundNote: `<h3>Run with GHC</h3>
    <p>Run code sends the editor contents to the online Haskell Playground for compilation and execution. Drafts and progress are saved in this browser. To run locally, save the code as <code>Main.hs</code> and use <code>runghc Main.hs</code>.</p>
    <a href="https://play.haskell.org/" target="_blank" rel="noopener noreferrer">Open the Haskell Playground</a>
    <a href="https://www.haskell.org/ghcup/" target="_blank" rel="noopener noreferrer">Install GHC with GHCup</a>`,
  modules: [
    {
      title: "Expressions and types",
      lessons: [
        lesson("first-function", "Your first pure function", 8, "starting-out",
          "Function arguments are separated by spaces. In <code>double n = n * 2</code>, the right-hand side is an expression that uses <code>n</code>. A type signature like <code>Int -&gt; Int</code> says the function takes a machine-sized integer and returns one. <code>main</code> prints the results so you can observe what the pure function computed.",
          "Implement <code>minutesToSeconds</code>. One minute has 60 seconds. Keep the two calls in <code>main</code> so you can check positive and zero input.",
          "A definition can be as short as <code>minutesToSeconds minutes = …</code>.",
          "180\n0",
          `minutesToSeconds :: Int -> Int
{- exercise -}minutesToSeconds minutes = minutes * 60{- end -}

main :: IO ()
main = do
  print (minutesToSeconds 3)
  print (minutesToSeconds 0)
`, "minutesToSeconds _ = 0"),
        lesson("lists-and-tuples", "Lists, tuples, and comprehensions", 12, "starting-out",
          "A list holds elements of one type. A pair can mix types, as in <code>(\"Oak\", 12)</code>. The comprehension <code>[n * 2 | n &lt;- [1..4], odd n]</code> binds each element to <code>n</code>, keeps the odd ones, and produces <code>[2,6]</code>.",
          "Implement <code>largerShelves</code>. Return the names of shelves with at least the requested number of books. Preserve input order and try a threshold that matches a shelf exactly.",
          "Use a pair pattern in the generator, such as <code>(name, count) &lt;- shelves</code>, then add a Boolean condition.",
          '["Oak","Cedar"]\n[]',
          `largerShelves :: Int -> [(String, Int)] -> [String]
{- exercise -}largerShelves minimumCount shelves =
  [name | (name, count) <- shelves, count >= minimumCount]{- end -}

main :: IO ()
main = do
  let shelves = [("Oak", 12), ("Pine", 4), ("Cedar", 10)]
  print (largerShelves 10 shelves)
  print (largerShelves 15 shelves)
`, "largerShelves _ _ = []"),
        lesson("generic-types", "Polymorphism and typeclasses", 12, "types-and-typeclasses",
          "A lowercase type variable stands for a type the caller can choose. For example, <code>first :: (a, b) -&gt; a</code> works for pairs of any two types. A constraint like <code>Eq a =&gt;</code> requires the chosen type to support equality via <code>==</code>.",
          "Implement <code>samePair</code> so it checks whether the two elements are equal. One definition should work for integers and strings.",
          "Match the argument as <code>(left, right)</code> and compare the two values.",
          "True\nFalse\nTrue",
          `samePair :: Eq a => (a, a) -> Bool
{- exercise -}samePair (left, right) = left == right{- end -}

main :: IO ()
main = do
  print (samePair (3 :: Int, 3))
  print (samePair (3 :: Int, 4))
  print (samePair ("ink", "ink"))
`, "samePair _ = False")
      ]
    },
    {
      title: "Patterns and recursion",
      lessons: [
        lesson("guards", "Patterns, guards, and where", 12, "syntax-in-functions",
          "A pattern such as <code>(done, total)</code> names the fields of a pair. Guards are tried top to bottom, and <code>otherwise</code> is the always-true guard. A <code>where</code> binding can be used in every guard and branch of the equation.",
          "Label reading progress as <code>no goal</code> when the goal is zero or negative, <code>complete</code> when the remaining pages are zero or fewer, and <code>in progress</code> otherwise. Use guards with a <code>where</code> binding for the remaining pages.",
          "Check the goal before comparing <code>remaining = goal - done</code> with zero.",
          "no goal\nin progress\ncomplete\ncomplete",
          `progress :: (Int, Int) -> String
{- exercise -}progress (done, goal)
  | goal <= 0 = "no goal"
  | remaining <= 0 = "complete"
  | otherwise = "in progress"
  where remaining = goal - done{- end -}

main :: IO ()
main = mapM_ (putStrLn . progress) [(0, 0), (5, 10), (10, 10), (12, 10)]
`, 'progress _ = "TODO"'),
        lesson("recursive-lists", "Recursion on lists", 14, "recursion",
          "A list is either empty (<code>[]</code>) or has a first element and a tail (<code>x:xs</code>). When a recursive call receives just the tail, the call works on a smaller problem. Start by deciding what the empty case returns.",
          "Implement <code>countLong</code> recursively. Count page totals that meet or exceed the threshold. Include an explicit empty-list case.",
          "The empty list contributes zero. For <code>pages:rest</code>, add one when <code>pages &gt;= threshold</code>, then count the rest.",
          "3\n0\n0",
          `countLong :: Int -> [Int] -> Int
{- exercise -}countLong _ [] = 0
countLong threshold (pages:rest) =
  (if pages >= threshold then 1 else 0) + countLong threshold rest{- end -}

main :: IO ()
main = do
  print (countLong 100 [90, 100, 300, 100])
  print (countLong 100 [])
  print (countLong 100 [99])
`, "countLong _ _ = 0"),
        lesson("lazy-sequences", "Demand and lazy sequences", 12, "starting-out",
          "Haskell evaluates expressions as their results are needed. <code>[1..]</code> describes an unbounded list, and <code>take 4 [1..]</code> demands only a finite prefix. <code>iterate (* 2) 1</code> starts at 1 and repeatedly doubles the previous value.",
          "Implement <code>milestones</code>. Return the first <code>count</code> milestones, starting at <code>start</code> and doubling at each step. Use <code>iterate</code> and <code>take</code>.",
          "Build the sequence with <code>iterate (* 2) start</code> and give it to <code>take count</code>.",
          "[3,6,12,24,48]\n[]\n[10]",
          `milestones :: Int -> Integer -> [Integer]
{- exercise -}milestones count start = take count (iterate (* 2) start){- end -}

main :: IO ()
main = do
  print (milestones 5 3)
  print (milestones 0 7)
  print (milestones 1 10)
`, "milestones _ _ = []")
      ]
    },
    {
      title: "Functions as values",
      lessons: [
        lesson("partial-application", "Currying and partial application", 11, "higher-order-functions",
          "The arrow associates to the right, so <code>Int -&gt; Int -&gt; Bool</code> means <code>Int -&gt; (Int -&gt; Bool)</code>. Supplying one argument returns a function waiting for the second. For example, <code>(+ 5)</code> is a function that adds five.",
          "Define <code>atLeastHundred</code> by partially applying <code>atLeast</code>, then use it as the predicate passed to <code>filter</code> in <code>longReads</code>.",
          "<code>atLeast 100</code> has type <code>Int -&gt; Bool</code>. <code>filter</code> uses that function on every element.",
          "True\nFalse\n[100,240]",
          `atLeast :: Int -> Int -> Bool
atLeast threshold pages = pages >= threshold

atLeastHundred :: Int -> Bool
{- exercise -}atLeastHundred = atLeast 100

longReads :: [Int] -> [Int]
longReads = filter atLeastHundred{- end -}

main :: IO ()
main = do
  print (atLeastHundred 101)
  print (atLeastHundred 99)
  print (longReads [80, 100, 240])
`, "atLeastHundred _ = False\n\nlongReads :: [Int] -> [Int]\nlongReads _ = []"),
        lesson("map-filter-compose", "Map, filter, and compose", 14, "higher-order-functions",
          "<code>filter</code> keeps elements satisfying a predicate. <code>map</code> applies a function to every element. In <code>(f . g) x</code>, <code>g</code> runs on <code>x</code> first and <code>f</code> uses its result. A lambda such as <code>\\n -&gt; n &gt; 0</code> defines a function inline.",
          "Use composition to define <code>positiveLabels</code>. Drop non-positive page counts and turn each remaining count into a string like <code>12 pages</code>.",
          "Compose a <code>map</code> that formats each count with <code>filter (&gt; 0)</code>.",
          '["12 pages","7 pages"]\n[]',
          `positiveLabels :: [Int] -> [String]
{- exercise -}positiveLabels = map (\\n -> show n ++ " pages") . filter (> 0){- end -}

main :: IO ()
main = do
  print (positiveLabels [12, 0, -3, 7])
  print (positiveLabels [0, -1])
`, "positiveLabels _ = []"),
        lesson("folds-and-imports", "Summarize with a fold", 16, "higher-order-functions",
          "A fold combines list elements into one result. <code>foldr (+) 0 [2,3]</code> is <code>2 + (3 + 0)</code>. Use <code>foldl'</code> from <code>Data.List</code> for a strict left fold. Its step gets the accumulator first. A qualified import such as <code>import qualified Data.List as List</code> makes the function available as <code>List.foldl'</code>.",
          "Use <code>List.foldl'</code> to return the count and sum of page totals in one pass. Start with <code>(0, 0)</code> and update both fields for every input.",
          "Define a step with the shape <code>step (count, total) pages = …</code>. For example, consuming 8 from <code>(1, 5)</code> gives <code>(2, 13)</code>.",
          "(3,31)\n(0,0)\n(1,6)",
          `import qualified Data.List as List

summarize :: [Int] -> (Int, Int)
{- exercise -}summarize = List.foldl' step (0, 0)
  where step (count, total) pages = (count + 1, total + pages){- end -}

main :: IO ()
main = mapM_ (print . summarize) [[5, 8, 18], [], [6]]
`, "summarize _ = (0, 0)")
      ]
    },
    {
      title: "Modeling data and failure",
      lessons: [
        lesson("records-and-sums", "Records and custom types", 15, "making-our-own-types-and-typeclasses",
          "A sum type lists alternatives. Here a book is either <code>Reading</code> or <code>Finished</code>. A record gives names to fields and generates accessor functions, so <code>title book</code> extracts the title. A <code>case</code> expression lets you handle both statuses.",
          "Implement <code>bookLabel</code>. Print the title followed by <code> (reading)</code> or <code> (finished)</code>. Cover both constructors.",
          "Start with <code>title book ++ suffix</code> and use <code>case status book of</code> to select the suffix.",
          "Maps (reading)\nTides (finished)",
          `data Status = Reading | Finished
  deriving (Eq, Show)

data Book = Book { title :: String, status :: Status }
  deriving (Eq, Show)

bookLabel :: Book -> String
{- exercise -}bookLabel book = title book ++ suffix
  where
    suffix = case status book of
      Reading -> " (reading)"
      Finished -> " (finished)"{- end -}

main :: IO ()
main = mapM_ (putStrLn . bookLabel) [Book "Maps" Reading, Book "Tides" Finished]
`, 'bookLabel _ = "TODO"'),
        lesson("optional-values", "Handle absence with Maybe", 12, "making-our-own-types-and-typeclasses",
          "<code>Maybe a</code> is either <code>Just value</code> or <code>Nothing</code>. It makes absence visible in the result type. The pattern <code>value:_</code> matches the first element of a non-empty list and ignores the tail.",
          "Implement <code>firstMatch</code> using list patterns and recursion. Return <code>Just</code> the first element that satisfies the predicate or <code>Nothing</code> if there is none.",
          "Return <code>Nothing</code> for the empty list. Test the head before making a recursive call on the tail.",
          "Just 8\nNothing\nNothing",
          `firstMatch :: (a -> Bool) -> [a] -> Maybe a
{- exercise -}firstMatch _ [] = Nothing
firstMatch predicate (value:rest)
  | predicate value = Just value
  | otherwise = firstMatch predicate rest{- end -}

main :: IO ()
main = do
  print (firstMatch (> 5) [1, 8, 9 :: Int])
  print (firstMatch odd [2, 4 :: Int])
  print (firstMatch odd ([] :: [Int]))
`, "firstMatch _ _ = Nothing"),
        lesson("descriptive-errors", "Report errors with Either", 14, "for-a-few-monads-more",
          "<code>Either e a</code> conventionally uses <code>Left</code> for an error and <code>Right</code> for success. <code>readMaybe</code> from <code>Text.Read</code> attempts to parse a whole value. The surrounding type tells it which type to parse.",
          "Implement <code>parsePages</code>. Accept a positive integer. Return <code>Left \"invalid integer\"</code> for malformed input and <code>Left \"pages must be positive\"</code> for zero or negative input.",
          "Match <code>readMaybe input</code> with <code>Nothing</code> and <code>Just pages</code>. In the second case, check the parsed number.",
          'Right 48\nLeft "invalid integer"\nLeft "pages must be positive"\nLeft "pages must be positive"',
          `import Text.Read (readMaybe)

parsePages :: String -> Either String Int
{- exercise -}parsePages input = case readMaybe input of
  Nothing -> Left "invalid integer"
  Just pages
    | pages <= 0 -> Left "pages must be positive"
    | otherwise -> Right pages{- end -}

main :: IO ()
main = mapM_ (print . parsePages) ["48", "4x", "0", "-1"]
`, 'parsePages _ = Left "TODO"')
      ]
    },
    {
      title: "Effects and composition",
      lessons: [
        lesson("functor-applicative", "Map and combine with Applicative", 16, "functors-applicative-functors-and-monoids",
          "<code>fmap length (Just \"ink\")</code> gives <code>Just 3</code>, while mapping over <code>Nothing</code> leaves it empty. <code>&lt;$&gt;</code> is infix <code>fmap</code>. For a two-argument function, <code>f &lt;$&gt; mx &lt;*&gt; my</code> combines two independent <code>Maybe</code> inputs and succeeds only when both are present.",
          "Use <code>&lt;$&gt;</code> and <code>&lt;*&gt;</code> to combine two optional page counts with addition.",
          "Parenthesize the addition operator as <code>(+)</code> to use it as a function.",
          "Just 35\nNothing\nNothing",
          `addCounts :: Maybe Int -> Maybe Int -> Maybe Int
{- exercise -}addCounts left right = (+) <$> left <*> right{- end -}

main :: IO ()
main = do
  print (addCounts (Just 15) (Just 20))
  print (addCounts Nothing (Just 20))
  print (addCounts (Just 15) Nothing)
`, "addCounts _ _ = Nothing"),
        lesson("dependent-steps", "Sequence dependent steps with Monad", 17, "a-fistful-of-monads",
          "Use <code>do</code> when a later computation needs an earlier result. For <code>Either</code>, <code>pages &lt;- parsePages input</code> makes the successful value available to later steps and propagates a <code>Left</code> as the result of the block. <code>pure value</code> produces <code>Right value</code> in this context.",
          "Implement <code>parseWithLimit</code> using <code>do</code>. Parse the page count, propagate the parse error, then reject a count over 500 with <code>Left \"too many pages\"</code>.",
          "Bind <code>pages</code> with <code>&lt;-</code>. Your final expression can be <code>if … then Left … else pure pages</code>.",
          'Right 500\nLeft "too many pages"\nLeft "invalid integer"',
          `import Text.Read (readMaybe)

parsePages :: String -> Either String Int
parsePages input = case readMaybe input of
  Nothing -> Left "invalid integer"
  Just pages
    | pages <= 0 -> Left "pages must be positive"
    | otherwise -> Right pages

parseWithLimit :: String -> Either String Int
{- exercise -}parseWithLimit input = do
  pages <- parsePages input
  if pages > 500 then Left "too many pages" else pure pages{- end -}

main :: IO ()
main = mapM_ (print . parseWithLimit) ["500", "501", "oops"]
`, 'parseWithLimit _ = Left "TODO"'),
        lesson("monoids", "Combine summaries with a Monoid", 14, "functors-applicative-functors-and-monoids",
          "A monoid has an associative operation (<code>&lt;&gt;</code>) and an identity (<code>mempty</code>). Lists use concatenation with <code>[]</code> as identity. <code>Sum</code> wraps a number to select addition and zero. Pairs of monoids combine component by component.",
          "Use <code>foldMap</code> to summarize <code>(title, pages)</code> pairs. Map each pair to a singleton list of titles and a <code>Sum</code> of its pages. Unwrap the final sum with <code>getSum</code>.",
          "The mapping function can be <code>\\(title, pages) -&gt; ([title], Sum pages)</code>. Pattern match the aggregated pair in a <code>where</code> binding.",
          '(["Maps","Tides"],35)\n([],0)',
          `import Data.Monoid (Sum(..))

batchSummary :: [(String, Int)] -> ([String], Int)
{- exercise -}batchSummary entries = (titles, getSum total)
  where
    (titles, total) = foldMap (\\(title, pages) -> ([title], Sum pages)) entries{- end -}

main :: IO ()
main = mapM_ (print . batchSummary) [[("Maps", 15), ("Tides", 20)], []]
`, "batchSummary _ = ([], 0)"),
        lesson("io-boundary", "Keep I/O at the boundary", 13, "input-and-output",
          "An <code>IO</code> value describes an action. <code>map</code> builds a list of results, while <code>mapM_</code> runs an action for every item from left to right and discards the results. Put formatting and calculations in pure functions so you can check them without doing I/O.",
          "Use <code>mapM_</code> in <code>main</code> to print the supplied entries, one per line, using the supplied pure formatter. Print <code>Reading log</code> first.",
          "In a <code>do</code> block, indent both actions and use <code>mapM_ (putStrLn . renderEntry) entries</code>.",
          "Reading log\nMaps: 15 pages\nTides: 20 pages",
          `entries :: [(String, Int)]
entries = [("Maps", 15), ("Tides", 20)]

renderEntry :: (String, Int) -> String
renderEntry (title, pages) = title ++ ": " ++ show pages ++ " pages"

main :: IO ()
{- exercise -}main = do
  putStrLn "Reading log"
  mapM_ (putStrLn . renderEntry) entries{- end -}
`, 'main = putStrLn "Reading log"')
      ]
    },
    {
      title: "Capstone · reading log",
      lessons: [
        lesson("capstone-parse", "Parse one reading-log entry", 18, "functionally-solving-problems",
          "The capstone accepts records in the form <code>title|pages</code>. <code>break (== '|')</code> returns the title candidate and a remainder starting at the first separator. A pattern like <code>(name, '|':rawPages)</code> both verifies the separator and extracts the page text.",
          "Implement <code>parseEntry</code>. Return <code>Left \"expected title|pages\"</code> for a missing separator or a blank title. Use the supplied <code>parsePages</code> and construct an <code>Entry</code> on success.",
          "Case-match the result of <code>break</code>, guard against titles made only of whitespace with <code>all isSpace</code>, and use <code>Entry name &lt;$&gt; parsePages rawPages</code>.",
          'Right (Entry "Maps" 15)\nLeft "expected title|pages"\nLeft "expected title|pages"\nLeft "invalid integer"\nLeft "pages must be positive"',
          `import Data.Char (isSpace)
import Text.Read (readMaybe)

data Entry = Entry String Int
  deriving (Eq, Show)

parsePages :: String -> Either String Int
parsePages input = case readMaybe input of
  Nothing -> Left "invalid integer"
  Just pages
    | pages <= 0 -> Left "pages must be positive"
    | otherwise -> Right pages

parseEntry :: String -> Either String Entry
{- exercise -}parseEntry line = case break (== '|') line of
  (name, '|':rawPages)
    | not (all isSpace name) -> Entry name <$> parsePages rawPages
  _ -> Left "expected title|pages"{- end -}

main :: IO ()
main = mapM_ (print . parseEntry)
  ["Maps|15", "Maps 15", "  |15", "Maps|15|2", "Maps|0"]
`, 'parseEntry _ = Left "TODO"'),
        lesson("capstone-batch", "Validate a batch with traverse", 20, "a-fistful-of-monads",
          "Use <code>lines</code> to split the input into rows and <code>zip [1..]</code> to attach one-based line numbers. <code>traverse</code> applies a function to every item and combines the results. With <code>Either</code>, a successful traversal returns the whole list and a failed one returns the first error.",
          "Implement <code>parseLog</code> using the supplied <code>parseRow</code>. Keep entries in input order, report the first bad line, and treat empty input as an empty log.",
          "The two pipeline steps have types <code>String -&gt; [(Int, String)]</code> and <code>[(Int, String)] -&gt; Either String [Entry]</code>. Compose <code>zip [1..]</code> with <code>lines</code> and then apply <code>traverse parseRow</code>.",
          'Right [Entry "Maps" 15,Entry "Tides" 20]\nLeft "line 2: invalid integer"\nRight []',
          `import Data.Char (isSpace)
import Text.Read (readMaybe)

data Entry = Entry String Int
  deriving (Eq, Show)

parseEntry :: String -> Either String Entry
parseEntry line = case break (== '|') line of
  (name, '|':rawPages)
    | not (all isSpace name) -> case readMaybe rawPages of
        Nothing -> Left "invalid integer"
        Just pages
          | pages <= 0 -> Left "pages must be positive"
          | otherwise -> Right (Entry name pages)
  _ -> Left "expected title|pages"

parseRow :: (Int, String) -> Either String Entry
parseRow (number, row) = case parseEntry row of
  Left message -> Left ("line " ++ show number ++ ": " ++ message)
  Right entry -> Right entry

parseLog :: String -> Either String [Entry]
{- exercise -}parseLog = traverse parseRow . zip [1..] . lines{- end -}

main :: IO ()
main = mapM_ (print . parseLog)
  [ "Maps|15\\nTides|20"
  , "Maps|15\\nTides|oops\\nMoss|0"
  , ""
  ]
`, 'parseLog _ = Right []'),
        lesson("capstone-report", "Build the finished report", 24, "input-and-output",
          "The final program keeps parsing and report generation pure. <code>main</code> prints a demo with both valid and invalid input. For a terminal version that reads redirected input, replace <code>main</code> with <code>getContents &gt;&gt;= putStrLn . report</code> and run <code>runghc Main.hs &lt; log.txt</code>.",
          "Implement <code>report</code>. On success show the entry count and total pages, including zero for an empty log. On failure prefix the existing diagnostic with <code>Error: </code>.",
          "Match <code>parseLog input</code> with <code>Left message</code> and <code>Right entries</code>. For the total, use <code>sum [pages | Entry _ pages &lt;- entries]</code>.",
          "Entries: 2\nPages: 35\nError: line 2: pages must be positive\nEntries: 0\nPages: 0",
          `import Data.Char (isSpace)
import Text.Read (readMaybe)

data Entry = Entry String Int

parseEntry :: String -> Either String Entry
parseEntry line = case break (== '|') line of
  (name, '|':rawPages)
    | not (all isSpace name) -> case readMaybe rawPages of
        Nothing -> Left "invalid integer"
        Just pages
          | pages <= 0 -> Left "pages must be positive"
          | otherwise -> Right (Entry name pages)
  _ -> Left "expected title|pages"

parseLog :: String -> Either String [Entry]
parseLog = traverse parseRow . zip [1 :: Int ..] . lines
  where
    parseRow (number, row) = case parseEntry row of
      Left message -> Left ("line " ++ show number ++ ": " ++ message)
      Right entry -> Right entry

report :: String -> String
{- exercise -}report input = case parseLog input of
  Left message -> "Error: " ++ message
  Right entries ->
    "Entries: " ++ show (length entries) ++
    "\\nPages: " ++ show (sum [pages | Entry _ pages <- entries]){- end -}

main :: IO ()
main = mapM_ (putStrLn . report) ["Maps|15\\nTides|20", "Maps|15\\nTides|0", ""]
`, 'report _ = "TODO"')
      ]
    }
  ]
};
