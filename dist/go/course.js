const program = (body, imports = '"fmt"') =>
  `package main\n\nimport ${imports}\n\nfunc main() {\n${body}\n}\n`;

export const course = {
  id: "go",
  name: "Go",
  description: "Follow the official Tour of Go with hands-on exercises, from your first package to generics and channels.",
  referenceLabel: "Read this topic in A Tour of Go",
  modules: [
    {
      title: "Packages, variables & functions",
      lessons: [
        {
          id: "hello-go", title: "Hello, Go!", minutes: 5,
          reference: "https://go.dev/tour/basics/1",
          intro: "Write your first Go program and see how its pieces fit together.",
          concepts: [
            ["package main", "Tells Go to build a program you can run."],
            ['import "fmt"', "Brings in formatting and printing functions."],
            ["func main()", "The function where your program begins."]
          ],
          task: 'Change the message inside <code>fmt.Println</code> so the program prints <strong>Hello, Go!</strong>',
          hints: ['Keep the message between double quotes. <code>fmt.Println</code> prints whatever string you pass to it.'],
          initial: program('\tfmt.Println("Hello, world!")'),
          solution: program('\tfmt.Println("Hello, Go!")'),
          expected: "Hello, Go!"
        },
        {
          id: "functions", title: "Functions", minutes: 10,
          reference: "https://go.dev/tour/basics/4",
          intro: "A function names a piece of work. Its signature describes the values it takes and the value it returns.",
          concepts: [
            ["func add(a, b int) int", "Declares two integer parameters and an integer result."],
            ["return a + b", "Sends the computed value back to the caller."]
          ],
          task: 'Complete <code>multiply</code> so it returns the product of its two parameters. The starter calls it twice.',
          hints: ['Use <code>*</code> to multiply. Return an expression that uses both <code>a</code> and <code>b</code>.'],
          initial: program('\tfmt.Println(multiply(6, 7))\n\tfmt.Println(multiply(-2, 5))') + '\nfunc multiply(a, b int) int {\n\treturn 0\n}\n',
          solution: program('\tfmt.Println(multiply(6, 7))\n\tfmt.Println(multiply(-2, 5))') + '\nfunc multiply(a, b int) int {\n\treturn a * b\n}\n',
          expected: "42\n-10", required: ["function"]
        },
        {
          id: "multiple-results", title: "Returning two values", minutes: 8,
          reference: "https://go.dev/tour/basics/6",
          intro: "A division can give you both a quotient and a remainder. Return the pair from one function and let the caller decide how to use each value.",
          concepts: [
            ["(int, int)", "Lists the two result types in the order the caller receives them."],
  ["q, r := divide(17, 5)", "Binds each result to its own local variable."]
          ],
          task: "Complete <code>divide</code> for positive integers. Return the whole-number quotient first and the leftover amount second.",
          hints: ["Integer division uses <code>/</code>. The remainder operator is <code>%</code>."],
          initial: `package main

import "fmt"

func divide(n, size int) (int, int) {
	return 0, 0
}

func main() {
	fmt.Println(divide(17, 5))
	fmt.Println(divide(8, 4))
}
`,
          solution: `package main

import "fmt"

func divide(n, size int) (int, int) {
	return n / size, n % size
}

func main() {
	fmt.Println(divide(17, 5))
	fmt.Println(divide(8, 4))
}
`,
          expected: "3 2\n2 0", required: ["function"]
        },
        {
          id: "variables", title: "Variables & types", minutes: 8,
          reference: "https://go.dev/tour/basics/10",
          intro: "Give values names so you can reuse them. Inside a function, := declares a variable and lets Go infer its type.",
          concepts: [
            ["name := \"Gopher\"", "Declares a string variable with an inferred type."],
            ["var score int", "Declares an integer with its zero value, 0."],
            ["fmt.Println(a, b)", "Prints two values separated by a space."]
          ],
          task: 'Declare a variable named <code>name</code> with the value <code>"Gopher"</code> and a variable named <code>level</code> with the value <code>1</code>. Print both on the same line.',
          hints: ['Write <code>name := "Gopher"</code> inside <code>main</code>.', 'Pass both variables as arguments to <code>fmt.Println</code>.'],
          initial: program('\t// Declare your variables and print them here.'),
          solution: program('\tname := "Gopher"\n\tlevel := 1\n\tfmt.Println(name, level)'),
          expected: "Gopher 1", required: ["variable"]
        },
        {
          id: "conversions", title: "Constants & conversions", minutes: 8,
          reference: "https://go.dev/tour/basics/13",
          intro: "Three hikers share seven liters of water. Both counts are whole numbers, but each share can include a fraction.",
          concepts: [
            ["const hikers = 3", "Declares a numeric constant. Its untyped value can be used in a floating-point expression."],
  ["float64(liters)", "Converts an integer variable before division so the quotient can have a fractional part."]
          ],
          task: "Convert <code>liters</code> before dividing by <code>hikers</code>. The starter prints each share to two decimal places.",
          hints: ["Compare <code>float64(liters / hikers)</code> with <code>float64(liters) / hikers</code>. Where does integer division happen?"],
          initial: `package main

import "fmt"

func main() {
	const hikers = 3
	liters := 7
	share := float64(liters / hikers)
	fmt.Printf("%.2f\\n", share)
}
`,
          solution: `package main

import "fmt"

func main() {
	const hikers = 3
	liters := 7
	share := float64(liters) / hikers
	fmt.Printf("%.2f\\n", share)
}
`,
          expected: "2.33"
        }
      ]
    },
    {
      title: "Flow control",
      lessons: [
        {
          id: "loops", title: "Loops", minutes: 10,
          reference: "https://go.dev/tour/flowcontrol/1",
          intro: "A for loop repeats a block while its condition is true. It can have an initializer and an update step.",
          concepts: [
            ["for i := 1; i <= 3; i++", "Starts at 1, includes 3, and increments after each iteration."],
            ["total += i", "Adds the current value of i to total."]
          ],
          task: 'Use a <code>for</code> loop to add the integers from 1 through 5. Print the total once the loop finishes.',
          hints: ['Start with <code>total := 0</code>. In your loop, add <code>i</code> to <code>total</code>.', 'Use <code>i <= 5</code> to include the last number.'],
          initial: program('\ttotal := 0\n\t// Add the numbers from 1 through 5.\n\tfmt.Println(total)'),
          solution: program('\ttotal := 0\n\tfor i := 1; i <= 5; i++ {\n\t\ttotal += i\n\t}\n\tfmt.Println(total)'),
          expected: "15", required: ["for"]
        },
        {
          id: "conditionals", title: "Conditionals", minutes: 8,
          reference: "https://go.dev/tour/flowcontrol/7",
          intro: "Use if and else to choose what a program does based on a condition. Go requires braces around each branch.",
          concepts: [
            ["if score >= 70", "Runs a block only when the comparison is true."],
            ["} else {", "Runs the fallback block if the condition is false."]
          ],
          task: 'Use an <code>if</code> statement to print <code>Pass</code> when <code>score</code> is 70 or higher. Print <code>Try again</code> otherwise.',
          hints: ['Place the comparison directly after <code>if</code> and open a brace on that line.', 'Put <code>else</code> on the same line as the closing brace of the first block.'],
          initial: program('\tscore := 74\n\t// Add the decision here.'),
          solution: program('\tscore := 74\n\tif score >= 70 {\n\t\tfmt.Println("Pass")\n\t} else {\n\t\tfmt.Println("Try again")\n\t}'),
          expected: "Pass", required: ["if"]
        },
        {
          id: "square-root", title: "Approximate a square root", minutes: 12,
          reference: "https://go.dev/tour/flowcontrol/8",
          intro: "If z is a positive guess for the square root of x, then x/z lies on the other side of the root. Averaging the two gives you a better guess.",
          concepts: [
            ["z = (z + x/z) / 2", "Refines the estimate by averaging two values."],
  ["%.3f", "Prints a floating-point result to three decimal places."]
          ],
          task: "Start at <code>1.0</code> and refine the guess ten times in a loop. Return the estimate for each positive input.",
          hints: ["Update <code>z</code> inside the loop so each round uses the previous estimate."],
          initial: `package main

import "fmt"

func root(x float64) float64 {
	z := 1.0
	// Refine z here.
	return z
}

func main() {
	fmt.Printf("%.3f\\n", root(2))
	fmt.Printf("%.3f\\n", root(9))
}
`,
          solution: `package main

import "fmt"

func root(x float64) float64 {
	z := 1.0
	for i := 0; i < 10; i++ {
		z = (z + x/z) / 2
	}
	return z
}

func main() {
	fmt.Printf("%.3f\\n", root(2))
	fmt.Printf("%.3f\\n", root(9))
}
`,
          expected: "1.414\n3.000", required: ["for", "function"]
        },
        {
          id: "switch", title: "Choosing a switch case", minutes: 7,
          reference: "https://go.dev/tour/flowcontrol/9",
          intro: "A switch can group several inputs under one action. Go leaves the switch after the first matching case.",
          concepts: [
            ["switch mode", "Compares mode with the values listed in each case."],
  ["case \"walk\", \"bike\":", "Lets either value select the same branch."],
  ["default:", "Handles inputs that match no case."]
          ],
          task: "Write a switch in <code>ticket</code>. Walking and biking are free, the bus costs one fare, and every other mode is unknown.",
          hints: ["Return <code>\"free\"</code>, <code>\"one fare\"</code>, or <code>\"unknown\"</code> from the matching branch."],
          initial: `package main

import "fmt"

func ticket(mode string) string {
	return "unknown"
}

func main() {
	fmt.Println(ticket("bike"))
	fmt.Println(ticket("bus"))
	fmt.Println(ticket("boat"))
}
`,
          solution: `package main

import "fmt"

func ticket(mode string) string {
	switch mode {
	case "walk", "bike":
		return "free"
	case "bus":
		return "one fare"
	default:
		return "unknown"
	}
}

func main() {
	fmt.Println(ticket("bike"))
	fmt.Println(ticket("bus"))
	fmt.Println(ticket("boat"))
}
`,
          expected: "free\none fare\nunknown", required: ["function"]
        },
        {
          id: "defer", title: "Defer & cleanup", minutes: 8,
          reference: "https://go.dev/tour/flowcontrol/12",
          intro: "A deferred call runs when the enclosing function returns. This is useful for cleanup that should happen even when the function exits early.",
          concepts: [
            ['defer fmt.Println("Done")', "Schedules the print call for the end of the function."],
            ["Last in, first out", "When you defer several calls, the most recent runs first."]
          ],
          task: 'Keep the two print statements in their current order and add <code>defer</code> so <code>Working</code> prints before <code>Done</code>.',
          hints: ['Add the <code>defer</code> keyword in front of the call you want to execute last.'],
          initial: program('\tfmt.Println("Done")\n\tfmt.Println("Working")'),
          solution: program('\tdefer fmt.Println("Done")\n\tfmt.Println("Working")'),
          expected: "Working\nDone", required: ["defer"]
        }
      ]
    },
    {
      title: "Structs, slices & maps",
      lessons: [
        {
          id: "pointers", title: "Changing a value through a pointer", minutes: 8,
          reference: "https://go.dev/tour/moretypes/1",
          intro: "A function normally receives a copy of its argument. Passing the address of a counter lets the function update the caller’s counter.",
          concepts: [
            ["&count", "Takes the address of count."],
  ["*int", "The type of a pointer to an integer."],
  ["*p", "Reads or assigns the integer at the address stored in p."]
          ],
          task: "Make <code>add</code> increase the pointed-to counter by <code>delta</code>. Both calls should update the same counter.",
          hints: ["Use <code>*p</code> on the left of the assignment."],
          initial: `package main

import "fmt"

func add(p *int, delta int) {
	// Update the caller’s count.
}

func main() {
	count := 10
	add(&count, 4)
	add(&count, -2)
	fmt.Println(count)
}
`,
          solution: `package main

import "fmt"

func add(p *int, delta int) {
	*p += delta
}

func main() {
	count := 10
	add(&count, 4)
	add(&count, -2)
	fmt.Println(count)
}
`,
          expected: "12"
        },
        {
          id: "structs", title: "Structs", minutes: 12,
          reference: "https://go.dev/tour/moretypes/2",
          intro: "A struct groups related fields into a single value. Define a type once and use it to represent many values with the same shape.",
          concepts: [
            ["type Book struct { … }", "Defines a named struct type with its fields inside the braces."],
            ['Book{Title: "Go Basics"}', "Creates a Book by naming the field to initialize."],
            ["book.Title", "Accesses the Title field of book."]
          ],
          task: 'Add a <code>Pages int</code> field to <code>Book</code>. Initialize it to <code>120</code>, then print the title and page count.',
          hints: ['Add <code>Pages int</code> on a new line inside the struct.', 'Add <code>Pages: 120</code> to the struct literal after a comma.'],
          initial: 'package main\n\nimport "fmt"\n\ntype Book struct {\n\tTitle string\n}\n\nfunc main() {\n\tbook := Book{Title: "Go Basics"}\n\tfmt.Println(book.Title)\n}\n',
          solution: 'package main\n\nimport "fmt"\n\ntype Book struct {\n\tTitle string\n\tPages int\n}\n\nfunc main() {\n\tbook := Book{Title: "Go Basics", Pages: 120}\n\tfmt.Println(book.Title, book.Pages)\n}\n',
          expected: "Go Basics 120", required: ["struct"]
        },
        {
          id: "array-window", title: "Arrays & slice bounds", minutes: 8,
          reference: "https://go.dev/tour/moretypes/8",
          intro: "A slice can select a window into an array. Editing through the window changes the same element in the array.",
          concepts: [
            ["[4]int", "An array with exactly four integer elements."],
  ["a[low:high]", "Selects elements starting at low and stopping before high."],
  ["window[0]", "The first element of the selected window."]
          ],
          task: "Change the slice bounds to select just the two middle readings. Predict which array element will change when the program assigns 25 through the slice.",
          hints: ["For indices 1 and 2, the first excluded index is 3."],
          initial: `package main

import "fmt"

func main() {
	readings := [4]int{10, 20, 30, 40}
	window := readings[:]
	window[0] = 25
	fmt.Println(window)
	fmt.Println(readings)
}
`,
          solution: `package main

import "fmt"

func main() {
	readings := [4]int{10, 20, 30, 40}
	window := readings[1:3]
	window[0] = 25
	fmt.Println(window)
	fmt.Println(readings)
}
`,
          expected: "[25 30]\n[10 25 30 40]"
        },
        {
          id: "slices", title: "Slices", minutes: 10,
          reference: "https://go.dev/tour/moretypes/15",
          intro: "A slice gives you an ordered collection of elements. It can grow when you append items and save the returned slice.",
          concepts: [
            ['[]string{"Go", "Rust"}', "Creates a slice containing two strings."],
            ["items = append(items, value)", "Appends an item and stores the returned slice."],
            ["items[0]", "Reads the first element. Go indexes start at zero."]
          ],
          task: 'Append <code>"pear"</code> to <code>fruit</code>, then print the number of items and the last item on one line.',
          hints: ['Use <code>fruit = append(fruit, "pear")</code>.', 'Get the last index with <code>len(fruit) - 1</code>.'],
          initial: program('\tfruit := []string{"apple", "banana"}\n\t// Append one fruit and print the result.\n\tfmt.Println(fruit)'),
          solution: program('\tfruit := []string{"apple", "banana"}\n\tfruit = append(fruit, "pear")\n\tfmt.Println(len(fruit), fruit[len(fruit)-1])'),
          expected: "3 pear", required: ["append"]
        },
        {
          id: "maps", title: "Maps", minutes: 10,
          reference: "https://go.dev/tour/moretypes/22",
          intro: "Maps store values under keys. Looking up a key gives its value and, optionally, a boolean indicating whether it exists.",
          concepts: [
            ['map[string]int{"Go": 3}', "Creates a map with string keys and integer values."],
            ['levels["Go"]++', "Increments the value stored under the key Go."],
            ['value, ok := levels["Go"]', "Reads a value and whether its key exists."]
          ],
          task: 'Add 2 to the value for <code>"Go"</code> in <code>scores</code> and print the updated value.',
          hints: ['Read or update the value using <code>scores["Go"]</code>.', 'Use <code>+= 2</code> to update the map entry in place.'],
          initial: program('\tscores := map[string]int{"Go": 3, "Rust": 4}\n\t// Update the Go score.\n\tfmt.Println(scores["Go"])'),
          solution: program('\tscores := map[string]int{"Go": 3, "Rust": 4}\n\tscores["Go"] += 2\n\tfmt.Println(scores["Go"])'),
          expected: "5", required: ["map"]
        },
        {
          id: "word-tally", title: "Project: Word tally", minutes: 15,
          reference: "https://go.dev/tour/moretypes/23",
          intro: "Build a small word counter using three pieces you already know: slices, loops, and maps.",
          concepts: [
            ["strings.Fields(text)", "Splits text into a slice of words at whitespace."],
            ["for _, word := range words", "Loops over the slice values and discards the index."],
            ["counts[word]++", "Increments a count. Missing keys start at zero."]
          ],
          task: 'Split <code>text</code> into words and count each occurrence in <code>counts</code>. The final two lines print the counts for <code>go</code> and <code>learn</code>.',
          hints: ['Use <code>strings.Fields(text)</code> to get the words.', 'In a <code>range</code> loop, increment <code>counts[word]</code> for each word.'],
          initial: program('\ttext := "go learn go practice learn go"\n\tcounts := map[string]int{}\n\t// Split the text and tally each word.\n\tfmt.Println("go:", counts["go"])\n\tfmt.Println("learn:", counts["learn"])', '(\n\t"fmt"\n\t"strings"\n)'),
          solution: program('\ttext := "go learn go practice learn go"\n\tcounts := map[string]int{}\n\tfor _, word := range strings.Fields(text) {\n\t\tcounts[word]++\n\t}\n\tfmt.Println("go:", counts["go"])\n\tfmt.Println("learn:", counts["learn"])', '(\n\t"fmt"\n\t"strings"\n)'),
          expected: "go: 3\nlearn: 2", required: ["map", "range"]
        },
        {
          id: "closures", title: "A counter that remembers", minutes: 10,
          reference: "https://go.dev/tour/moretypes/25",
          intro: "A closure can keep a local variable alive after its enclosing function returns. Calling the factory twice gives each counter its own total.",
          concepts: [
            ["func() int", "The type of a function with no arguments and one integer result."],
  ["return func() int { … }", "Returns a function that can still access the surrounding variables."]
          ],
          task: "Update the returned function so each call advances its own counter by <code>step</code> and returns the running total.",
          hints: ["Declare <code>total</code> in the outer function. Update it inside the returned function."],
          initial: `package main

import "fmt"

func counter(step int) func() int {
	total := 0
	return func() int {
		// Advance total here.
		return total
	}
}

func main() {
	pairs := counter(2)
	tens := counter(10)
	fmt.Println(pairs(), tens(), pairs())
}
`,
          solution: `package main

import "fmt"

func counter(step int) func() int {
	total := 0
	return func() int {
		total += step
		return total
	}
}

func main() {
	pairs := counter(2)
	tens := counter(10)
	fmt.Println(pairs(), tens(), pairs())
}
`,
          expected: "2 10 4", required: ["function"]
        }
      ]
    },
    {
      title: "Methods & interfaces",
      lessons: [
        {
          id: "methods", title: "Methods & pointer receivers", minutes: 10,
          reference: "https://go.dev/tour/methods/4",
          intro: "A receiver attaches a method to a type. A pointer receiver lets a method change the value used to call it.",
          concepts: [
            ["func (m *Meter) Advance(n int)", "Declares Advance as a method with receiver m."],
  ["m.Steps", "Selects the field through the pointer. Go handles the dereference."],
  ["meter.Advance(3)", "Calls the method on an addressable Meter variable."]
          ],
          task: "Repair <code>Advance</code> so both calls update the original meter. Keep the calls in <code>main</code> as written.",
          hints: ["The body already updates a field. Check whether the receiver is a copy or a pointer."],
          initial: `package main

import "fmt"

type Meter struct {
	Steps int
}

func (m Meter) Advance(n int) {
	m.Steps += n
}

func main() {
	meter := Meter{}
	meter.Advance(3)
	meter.Advance(4)
	fmt.Println(meter.Steps)
}
`,
          solution: `package main

import "fmt"

type Meter struct {
	Steps int
}

func (m *Meter) Advance(n int) {
	m.Steps += n
}

func main() {
	meter := Meter{}
	meter.Advance(3)
	meter.Advance(4)
	fmt.Println(meter.Steps)
}
`,
          expected: "7", required: ["struct"]
        },
        {
          id: "interfaces", title: "One interface, two implementations", minutes: 12,
          reference: "https://go.dev/tour/methods/10",
          intro: "The sign printer needs a label. A station and a platform can each supply one by defining a method with the signature the printer expects.",
          concepts: [
            ["type Labeled interface { Label() string }", "Describes the method a value must have."],
  ["func sign(item Labeled) string", "Accepts any value whose methods satisfy Labeled."],
  ["item.Label()", "Calls the implementation for the concrete value passed to sign."]
          ],
          task: "Give <code>Platform</code> a <code>Label() string</code> method so it satisfies <code>Labeled</code>. Format its number as <code>Platform 4</code>.",
          hints: ["Use a receiver of type <code>Platform</code> and format it with <code>fmt.Sprintf(\"Platform %d\", p)</code>."],
          initial: `package main

import "fmt"

type Labeled interface {
	Label() string
}

type Station string

func (s Station) Label() string { return string(s) }

type Platform int

// Add the missing method here.

func sign(item Labeled) string { return item.Label() }

func main() {
	fmt.Println(sign(Station("Central")))
	fmt.Println(sign(Platform(4)))
}
`,
          solution: `package main

import "fmt"

type Labeled interface {
	Label() string
}

type Station string

func (s Station) Label() string { return string(s) }

type Platform int

func (p Platform) Label() string {
	return fmt.Sprintf("Platform %d", p)
}

func sign(item Labeled) string { return item.Label() }

func main() {
	fmt.Println(sign(Station("Central")))
	fmt.Println(sign(Platform(4)))
}
`,
          expected: "Central\nPlatform 4"
        },
        {
          id: "errors", title: "Handling errors", minutes: 12,
          reference: "https://go.dev/tour/methods/19",
          intro: "Go functions often return an error alongside their result. A nil error means the operation succeeded.",
          concepts: [
            ["n, err := strconv.Atoi(text)", "Tries to convert a string to an integer."],
            ["if err != nil", "Checks whether the conversion failed."],
            ["return", "Exits the current function early."]
          ],
          task: 'Check the error from <code>strconv.Atoi</code>. If the input is invalid, print <code>Invalid number</code> and exit <code>main</code>. Otherwise print the parsed number.',
          hints: ['Replace <code>_</code> with <code>err</code> to keep the error.', 'Put <code>return</code> after printing the error message so the success path does not run as well.'],
          initial: program('\tn, _ := strconv.Atoi("gopher")\n\t// Check for an error before printing n.\n\tfmt.Println(n)', '(\n\t"fmt"\n\t"strconv"\n)'),
          solution: program('\tn, err := strconv.Atoi("gopher")\n\tif err != nil {\n\t\tfmt.Println("Invalid number")\n\t\treturn\n\t}\n\tfmt.Println(n)', '(\n\t"fmt"\n\t"strconv"\n)'),
          expected: "Invalid number", required: ["if", "nil check"]
        }
      ]
    },
    {
      title: "Generics",
      lessons: [
        {
          id: "type-parameters", title: "Searching with a type parameter", minutes: 12,
          reference: "https://go.dev/tour/generics/1",
          intro: "A search for a seat number follows the same steps as a search for a station name. A type parameter lets one function serve both callers.",
          concepts: [
            ["T comparable", "Allows element types that support == and !=."],
  ["values []T, want T", "Ties the element type and the search target to the same type parameter."]
          ],
          task: "Implement <code>indexOf</code>. Return the first index whose value equals <code>want</code>, or <code>-1</code> when there is no match.",
          hints: ["Use <code>for i, v := range values</code>. Return immediately on a match so a later duplicate cannot replace it."],
          initial: `package main

import "fmt"

func indexOf[T comparable](values []T, want T) int {
	// Search the slice here.
	return -1
}

func main() {
	fmt.Println(indexOf([]int{9, 4, 4}, 4))
	fmt.Println(indexOf([]string{"oak", "elm"}, "oak"))
	fmt.Println(indexOf([]string{"oak", "elm"}, "ash"))
}
`,
          solution: `package main

import "fmt"

func indexOf[T comparable](values []T, want T) int {
	for i, v := range values {
		if v == want {
			return i
		}
	}
	return -1
}

func main() {
	fmt.Println(indexOf([]int{9, 4, 4}, 4))
	fmt.Println(indexOf([]string{"oak", "elm"}, "oak"))
	fmt.Println(indexOf([]string{"oak", "elm"}, "ash"))
}
`,
          expected: "1\n0\n-1", required: ["range", "if"]
        },
        {
          id: "generic-types", title: "A pair of any type", minutes: 9,
          reference: "https://go.dev/tour/generics/2",
          intro: "A generic struct can describe two measurements or two station names. Each instantiation fixes the type of both fields.",
          concepts: [
            ["type Pair[T any] struct", "Introduces a type parameter with no restrictions on the element type."],
  ["Pair[string]", "Gives both fields the concrete type string."]
          ],
          task: "Replace the integer field type with the type parameter so <code>Pair[int]</code> and <code>Pair[string]</code> can both hold their values.",
          hints: ["Use the name declared inside the square brackets as the field type."],
          initial: `package main

import "fmt"

type Pair[T any] struct {
	First, Second int
}

func main() {
	distances := Pair[int]{3, 8}
	stops := Pair[string]{"Harbor", "Hill"}
	fmt.Println(distances.First, distances.Second)
	fmt.Println(stops.First, stops.Second)
}
`,
          solution: `package main

import "fmt"

type Pair[T any] struct {
	First, Second T
}

func main() {
	distances := Pair[int]{3, 8}
	stops := Pair[string]{"Harbor", "Hill"}
	fmt.Println(distances.First, distances.Second)
	fmt.Println(stops.First, stops.Second)
}
`,
          expected: "3 8\nHarbor Hill", required: ["struct"]
        }
      ]
    },
    {
      title: "Concurrency",
      lessons: [
        {
          id: "goroutines", title: "Goroutines & channels", minutes: 14,
          reference: "https://go.dev/tour/concurrency/2",
          intro: "A goroutine runs a function concurrently. A channel lets one goroutine send a value to another and can synchronize their work.",
          concepts: [
            ["make(chan string)", "Creates a channel that carries strings."],
            ["go func() { … }()", "Starts an anonymous function in a new goroutine."],
            ["messages <- value / <-messages", "Sends a value or receives the next value."]
          ],
          task: 'Start a goroutine that sends <code>"Ready"</code> on <code>messages</code>. In <code>main</code>, receive the message and print it.',
          hints: ['Call the anonymous function with <code>()</code> after its closing brace.', 'Use <code>fmt.Println(&lt;-messages)</code> to wait for and print the value.'],
          initial: program('\tmessages := make(chan string)\n\t// Start a goroutine that sends a message.\n\t// Replace this line with a print of the received message.\n\tfmt.Println(messages)'),
          solution: program('\tmessages := make(chan string)\n\tgo func() {\n\t\tmessages <- "Ready"\n\t}()\n\tfmt.Println(<-messages)'),
          expected: "Ready", required: ["goroutine", "channel"]
        },
        {
          id: "channel-range", title: "Draining a closed channel", minutes: 10,
          reference: "https://go.dev/tour/concurrency/4",
          intro: "A buffered channel can hold several pending values. Closing it signals that sending has finished. A receiver can still read the queued values.",
          concepts: [
            ["make(chan int, 3)", "Makes room for three integers before a send must wait."],
  ["close(jobs)", "Signals that no more values will be sent."],
  ["for job := range jobs", "Receives until the channel is closed and its buffer is empty."]
          ],
          task: "After the sender closes <code>jobs</code>, use a range loop to add every queued job size to <code>total</code>.",
          hints: ["A range loop over a channel supplies one value per iteration."],
          initial: `package main

import "fmt"

func main() {
	jobs := make(chan int, 3)
	jobs <- 2
	jobs <- 5
	jobs <- 3
	close(jobs)

	total := 0
	// Drain the channel here.
	fmt.Println(total)
}
`,
          solution: `package main

import "fmt"

func main() {
	jobs := make(chan int, 3)
	jobs <- 2
	jobs <- 5
	jobs <- 3
	close(jobs)

	total := 0
	for size := range jobs {
		total += size
	}
	fmt.Println(total)
}
`,
          expected: "10", required: ["channel", "range"]
        },
        {
          id: "select", title: "Receiving without waiting", minutes: 10,
          reference: "https://go.dev/tour/concurrency/6",
          intro: "A dashboard polls a channel for a status update. When a message is ready it should display it. When the channel is empty it should immediately report idle.",
          concepts: [
            ["select", "Chooses a channel operation that can proceed."],
  ["case msg := <-updates:", "Receives a ready message into msg."],
  ["default:", "Runs when no communication case can proceed."]
          ],
          task: "Complete <code>poll</code> with a select. Return the queued message when one is ready, and <code>\"idle\"</code> when none is ready.",
          hints: ["The first call drains the buffered channel. Add a default branch so the second call can return."],
          initial: `package main

import "fmt"

func poll(updates chan string) string {
	return "idle"
}

func main() {
	updates := make(chan string, 1)
	updates <- "boarding"
	fmt.Println(poll(updates))
	fmt.Println(poll(updates))
}
`,
          solution: `package main

import "fmt"

func poll(updates chan string) string {
	select {
	case msg := <-updates:
		return msg
	default:
		return "idle"
	}
}

func main() {
	updates := make(chan string, 1)
	updates <- "boarding"
	fmt.Println(poll(updates))
	fmt.Println(poll(updates))
}
`,
          expected: "boarding\nidle", required: ["channel", "function"]
        }
      ]
    }
  ]
};

export const playgroundCode = program('\tfmt.Println("Hello from the playground!")');
