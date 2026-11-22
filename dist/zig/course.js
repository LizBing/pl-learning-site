const program = body => `const std = @import("std");

pub fn main() void {
${body}
}
`;

export const sandbox = program(String.raw`    std.debug.print("Hello, Zig!\n", .{});`);

export const modules = [
  {
    title: "The foundations", icon: "terminal", level: "Beginner",
    description: "Read and write your first Zig programs.",
    lessons: [
      {
        id: "hello-zig", title: "Hello, Zig!", minutes: 4, reference: "Hello-World",
        explanation: [
          "Zig starts this program at <code>pub fn main() void</code>. The <code>void</code> return type means the function returns no value.",
          "<code>@import(\"std\")</code> loads Zig’s standard library. <code>std.debug.print</code> writes a formatted message to standard error, which appears in the workbench output. The second argument, <code>.{}</code>, is an empty tuple because the message has no format placeholders."
        ],
        task: 'Run the starter, then change its message to <code>Hello, Zig!</code>. Keep <code>\\n</code> at the end of the string for a newline.',
        starter: program(String.raw`    std.debug.print("Hello, world!\n", .{});`),
        solution: sandbox, expected: "Hello, Zig!",
        hint: 'Change only the text inside the quotation marks. Keep the comma and <code>.{}</code> after the string.'
      },
      {
        id: "variables", title: "Constants & variables", minutes: 5, reference: "Variables",
        explanation: [
          "A <code>const</code> binding cannot be reassigned. Declare a binding with <code>var</code> when you need to change its value. Zig reports an error when a local <code>var</code> is never mutated.",
          "In <code>var score: u32 = 5;</code>, the annotation selects an unsigned 32-bit integer. <code>{d}</code> prints it in decimal, and <code>.{score}</code> supplies the value."
        ],
        task: 'Change the amount added to <code>score</code> so that the program prints <code>12</code>.',
        starter: program(String.raw`    const bonus: u32 = 2;
    var score: u32 = 5;
    score += bonus;
    std.debug.print("{d}\n", .{score});`),
        solution: program(String.raw`    const bonus: u32 = 7;
    var score: u32 = 5;
    score += bonus;
    std.debug.print("{d}\n", .{score});`),
        expected: "12", hint: 'The starting score is <code>5</code>, so <code>bonus</code> should be <code>7</code>.'
      },
      {
        id: "repair-binding", title: "Repair a read-only binding", minutes: 5, reference: "Local-Variables",
        reading: "https://pedropark99.github.io/zig-book/Chapters/03-structs.html",
        explanation: [
          "Run the starter and find the line the compiler flags. A <code>const</code> binding keeps the same value after initialization.",
  "Here the running total needs to change. The delivery count can stay constant."
        ],
        task: "Fix the declaration of <code>stock</code> so the program can add the delivery.",
        starter: String.raw`const std = @import("std");

pub fn main() void {
    const stock: u16 = 8;
    const delivery: u16 = 5;
    stock += delivery;
    std.debug.print("{d}\n", .{stock});
}
`,
        solution: String.raw`const std = @import("std");

pub fn main() void {
    var stock: u16 = 8;
    const delivery: u16 = 5;
    stock += delivery;
    std.debug.print("{d}\n", .{stock});
}
`,
        expected: "13", hint: "Change the keyword on <code>stock</code> and leave <code>delivery</code> as a constant."
      },
      {
        id: "types", title: "Integers & booleans", minutes: 5, reference: "Primitive-Types",
        explanation: [
          "Zig lets you specify integer widths. <code>u8</code> holds values from 0 to 255. <code>i8</code> holds values from −128 to 127.",
          "A comparison like <code>value &gt; 0</code> returns a <code>bool</code>. The <code>{}</code> formatter can display it as <code>true</code> or <code>false</code>."
        ],
        task: 'Pick an <code>i8</code> value so the program prints <code>true</code>.',
        starter: program(String.raw`    const value: i8 = -8;
    const positive: bool = value > 0;
    std.debug.print("{}\n", .{positive});`),
        solution: program(String.raw`    const value: i8 = 8;
    const positive: bool = value > 0;
    std.debug.print("{}\n", .{positive});`),
        expected: "true", hint: 'Any integer from <code>1</code> through <code>127</code> fits the type and passes the comparison.'
      },
      {
        id: "functions", title: "Functions", minutes: 6, reference: "Functions",
        explanation: [
          "A function declares its parameters inside parentheses and its return type immediately afterward. <code>fn double(value: i32) i32</code> takes one <code>i32</code> and returns another.",
          "Call it with <code>double(9)</code>. The result can go directly into the tuple passed to <code>std.debug.print</code>."
        ],
        task: 'Implement <code>double</code> so the two calls print <code>18 10</code>.',
        starter: program(String.raw`    std.debug.print("{d} {d}\n", .{ double(9), double(5) });`) + `
fn double(value: i32) i32 {
    return value;
}
`,
        solution: program(String.raw`    std.debug.print("{d} {d}\n", .{ double(9), double(5) });`) + `
fn double(value: i32) i32 {
    return value * 2;
}
`,
        expected: "18 10", hint: 'Multiply the parameter by two in the <code>return</code> expression.'
      }
    ]
  },
  {
    title: "Control & data", icon: "layers", level: "Core concepts",
    description: "Work with collections, decisions and your own types.",
    lessons: [
      {
        id: "conditionals", title: "If expressions", minutes: 5, reference: "if",
        explanation: [
          "Zig’s <code>if</code> can choose a value. In <code>const label = if (ready) \"go\" else \"wait\";</code>, the chosen string initializes <code>label</code>.",
          "The condition must be a boolean. In this exercise the two branches each supply an integer that fits the explicitly declared result type."
        ],
        task: 'Make <code>larger</code> return the larger of its two arguments. The program should print <code>9 12</code>.',
        starter: program(String.raw`    std.debug.print("{d} {d}\n", .{ larger(9, 4), larger(3, 12) });`) + `
fn larger(a: i32, b: i32) i32 {
    return if (a < b) a else b;
}
`,
        solution: program(String.raw`    std.debug.print("{d} {d}\n", .{ larger(9, 4), larger(3, 12) });`) + `
fn larger(a: i32, b: i32) i32 {
    return if (a > b) a else b;
}
`,
        expected: "9 12", hint: 'Select <code>a</code> when <code>a &gt; b</code>.'
      },
      {
        id: "arrays-slices", title: "Arrays & slices", minutes: 7, reference: "Slices",
        explanation: [
          "<code>[_]u8{ 4, 7, 9, 2 }</code> creates a fixed-length array and lets Zig count the items. A slice is a view into contiguous elements and carries a length.",
          "A range like <code>values[1..3]</code> starts at index 1 and stops before index 3. The <code>[]const u8</code> annotation gives the view a slice type."
        ],
        task: 'Change the slice bounds to select <code>7</code> and <code>9</code>. The output should read <code>7 9 (2 items)</code>.',
        starter: program(String.raw`    const values = [_]u8{ 4, 7, 9, 2 };
    const window: []const u8 = values[0..2];
    std.debug.print("{d} {d} ({d} items)\n", .{ window[0], window[1], window.len });`),
        solution: program(String.raw`    const values = [_]u8{ 4, 7, 9, 2 };
    const window: []const u8 = values[1..3];
    std.debug.print("{d} {d} ({d} items)\n", .{ window[0], window[1], window.len });`),
        expected: "7 9 (2 items)", hint: 'The value <code>7</code> is at index <code>1</code> and the end bound is exclusive.'
      },
      {
        id: "loops", title: "For & while loops", minutes: 7, reference: "for",
        explanation: [
          "<code>for (items) |item|</code> visits each element and binds its value to <code>item</code> for that iteration.",
          "Use <code>while</code> when a boolean should control repetition. A loop such as <code>while (i &lt; 5) : (i += 1)</code> increments <code>i</code> after each iteration."
        ],
        task: 'Accumulate every value in <code>items</code> so the program prints <code>15</code>.',
        starter: program(String.raw`    const items = [_]u32{ 4, 7, 4 };
    var total: u32 = 0;
    for (items) |item| {
        total = item;
    }
    std.debug.print("{d}\n", .{total});`),
        solution: program(String.raw`    const items = [_]u32{ 4, 7, 4 };
    var total: u32 = 0;
    for (items) |item| {
        total += item;
    }
    std.debug.print("{d}\n", .{total});`),
        expected: "15", hint: 'Use <code>+=</code> to add each item to the running total.'
      },
      {
        id: "structs", title: "Structs & methods", minutes: 8, reference: "struct",
        explanation: [
          "A <code>struct</code> groups related fields. Create a value with an initializer such as <code>Rectangle{ .width = 4, .height = 6 }</code>.",
          "A function declared inside the struct can take that struct as its first argument. Calling <code>rect.area()</code> supplies <code>rect</code> as the <code>self</code> argument."
        ],
        task: 'Implement <code>area</code> so the rectangle prints <code>24</code>.',
        starter: program(String.raw`    const rect = Rectangle{ .width = 4, .height = 6 };
    std.debug.print("{d}\n", .{rect.area()});`) + `
const Rectangle = struct {
    width: u32,
    height: u32,

    fn area(self: Rectangle) u32 {
        return self.width;
    }
};
`,
        solution: program(String.raw`    const rect = Rectangle{ .width = 4, .height = 6 };
    std.debug.print("{d}\n", .{rect.area()});`) + `
const Rectangle = struct {
    width: u32,
    height: u32,

    fn area(self: Rectangle) u32 {
        return self.width * self.height;
    }
};
`,
        expected: "24", hint: 'Multiply both fields, accessing them through <code>self</code>.'
      },
      {
        id: "enum-switch", title: "Repair an incomplete switch", minutes: 8, reference: "Exhaustive-Switching",
        reading: "https://pedropark99.github.io/zig-book/Chapters/03-structs.html",
        explanation: [
          "An enum names the possible states of a value. Here a traffic light can be red, amber, or green.",
  "Without a catch-all branch, <code>switch</code> must handle every declared enum value. The compiler identifies the missing case."
        ],
        task: "Run the starter, then add the amber branch. It should return <code>wait</code>.",
        starter: String.raw`const std = @import("std");

const Light = enum { red, amber, green };

fn action(light: Light) []const u8 {
    return switch (light) {
        .red => "stop",
        // Handle the missing state.
        .green => "go",
    };
}

pub fn main() void {
    std.debug.print("{s} {s} {s}\n", .{ action(.red), action(.amber), action(.green) });
}
`,
        solution: String.raw`const std = @import("std");

const Light = enum { red, amber, green };

fn action(light: Light) []const u8 {
    return switch (light) {
        .red => "stop",
        .amber => "wait",
        .green => "go",
    };
}

pub fn main() void {
    std.debug.print("{s} {s} {s}\n", .{ action(.red), action(.amber), action(.green) });
}
`,
        expected: "stop wait go", hint: "Add <code>.amber =&gt; \"wait\",</code> alongside the other branches."
      },
      {
        id: "tagged-union", title: "Unpack a tagged union", minutes: 9, reference: "Tagged-union",
        reading: "https://pedropark99.github.io/zig-book/Chapters/09-error-handling.html",
        explanation: [
          "A tagged union stores one variant at a time. A pickup has a text label. A delivery has an integer route number.",
  "A switch branch can capture the active variant’s payload with <code>|value|</code>. Zig infers its type from the branch."
        ],
        task: "Update both branches of <code>describe</code> so each prints the payload it receives.",
        starter: String.raw`const std = @import("std");

const Order = union(enum) { pickup: []const u8, delivery: u32 };

fn describe(order: Order) void {
    switch (order) {
        .pickup => std.debug.print("pickup\n", .{}),
        .delivery => std.debug.print("delivery\n", .{}),
    }
}

pub fn main() void {
    describe(.{ .pickup = "north desk" });
    describe(.{ .delivery = 42 });
}
`,
        solution: String.raw`const std = @import("std");

const Order = union(enum) { pickup: []const u8, delivery: u32 };

fn describe(order: Order) void {
    switch (order) {
        .pickup => |label| std.debug.print("pickup: {s}\n", .{label}),
        .delivery => |route| std.debug.print("delivery: {d}\n", .{route}),
    }
}

pub fn main() void {
    describe(.{ .pickup = "north desk" });
    describe(.{ .delivery = 42 });
}
`,
        expected: "pickup: north desk\ndelivery: 42", hint: "Use <code>{s}</code> for the pickup label and <code>{d}</code> for the delivery route."
      }
    ]
  },
  {
    title: "Thinking in Zig", icon: "cpu", level: "Next steps",
    description: "Handle missing values and failures, then explore memory and comptime.",
    lessons: [
      {
        id: "optionals", title: "Optionals", minutes: 6, reference: "Optionals",
        explanation: [
          "<code>?u32</code> describes a value that is either a <code>u32</code> or <code>null</code>.",
          "<code>value orelse fallback</code> unwraps a present value and evaluates the fallback when the value is null. To branch on presence, you can also use <code>if (value) |present|</code>."
        ],
        task: 'Keep the present value and use <code>10</code> as the fallback for a missing value. The output should read <code>3 10</code>.',
        starter: program(String.raw`    std.debug.print("{d} {d}\n", .{ retries(3), retries(null) });`) + `
fn retries(value: ?u32) u32 {
    return value orelse 0;
}
`,
        solution: program(String.raw`    std.debug.print("{d} {d}\n", .{ retries(3), retries(null) });`) + `
fn retries(value: ?u32) u32 {
    return value orelse 10;
}
`,
        expected: "3 10", hint: 'Change the number after <code>orelse</code>.'
      },
      {
        id: "errors", title: "Errors & recovery", minutes: 8, reference: "Errors",
        explanation: [
          "An error union like <code>InputError!u32</code> holds either a <code>u32</code> or an error from <code>InputError</code>.",
          "<code>catch</code> provides a fallback or handles the error locally. <code>try</code> unwraps success and returns early from the current function when it encounters an error."
        ],
        task: 'Return <code>error.Empty</code> when the input is zero. The calls should print <code>7 99</code> after the second call falls back.',
        starter: program(String.raw`    const good = validated(7) catch 99;
    const empty = validated(0) catch 99;
    std.debug.print("{d} {d}\n", .{ good, empty });`) + `
const InputError = error{Empty};

fn validated(value: u32) InputError!u32 {
    return value;
}
`,
        solution: program(String.raw`    const good = validated(7) catch 99;
    const empty = validated(0) catch 99;
    std.debug.print("{d} {d}\n", .{ good, empty });`) + `
const InputError = error{Empty};

fn validated(value: u32) InputError!u32 {
    if (value == 0) return error.Empty;
    return value;
}
`,
        expected: "7 99", hint: 'Add <code>if (value == 0) return error.Empty;</code> before the existing return.'
      },
      {
        id: "propagate-errors", title: "Repair error propagation", minutes: 8, reference: "try",
        reading: "https://pedropark99.github.io/zig-book/Chapters/09-error-handling.html",
        explanation: [
          "The type <code>error{Empty}!u32</code> holds either a number or an error. Arithmetic needs the number inside.",
  "<code>try</code> gives you the number on success and returns the same error to the caller on failure. The caller can use <code>catch</code> to provide a fallback."
        ],
        task: "Fix <code>withBonus</code> so it adds two to valid scores and propagates <code>error.Empty</code>.",
        starter: String.raw`const std = @import("std");

const ScoreError = error{Empty};

fn checked(score: u32) ScoreError!u32 {
    if (score == 0) return error.Empty;
    return score;
}

fn withBonus(score: u32) ScoreError!u32 {
    const value = checked(score);
    return value + 2;
}

pub fn main() void {
    std.debug.print("{d} {d}\n", .{ withBonus(7) catch 99, withBonus(0) catch 99 });
}
`,
        solution: String.raw`const std = @import("std");

const ScoreError = error{Empty};

fn checked(score: u32) ScoreError!u32 {
    if (score == 0) return error.Empty;
    return score;
}

fn withBonus(score: u32) ScoreError!u32 {
    const value = try checked(score);
    return value + 2;
}

pub fn main() void {
    std.debug.print("{d} {d}\n", .{ withBonus(7) catch 99, withBonus(0) catch 99 });
}
`,
        expected: "9 99", hint: "Put <code>try</code> before the call to <code>checked(score)</code>."
      },
      {
        id: "pointers", title: "Pointers & mutation", minutes: 8, reference: "Pointers",
        explanation: [
          "<code>&amp;score</code> takes the address of a variable. A <code>*u32</code> parameter can receive that address, giving the function access to the original value.",
          "Use <code>pointer.*</code> to dereference the pointer. With a mutable pointer type such as <code>*u32</code>, an assignment through it updates the caller’s variable."
        ],
        task: 'Increment the value behind <code>score</code> by one so the program prints <code>42</code>.',
        starter: program(String.raw`    var score: u32 = 41;
    increment(&score);
    std.debug.print("{d}\n", .{score});`) + `
fn increment(score: *u32) void {
    score.* += 0;
}
`,
        solution: program(String.raw`    var score: u32 = 41;
    increment(&score);
    std.debug.print("{d}\n", .{score});`) + `
fn increment(score: *u32) void {
    score.* += 1;
}
`,
        expected: "42", hint: 'The dereference is already in place. Change the amount added to <code>score.*</code>.'
      },
      {
        id: "allocator-cleanup", title: "Allocate and release a buffer", minutes: 10, reference: "defer",
        reading: "https://pedropark99.github.io/zig-book/Chapters/01-memory.html",
        explanation: [
          "An allocator hands out memory at runtime. <code>alloc(u8, len)</code> returns a writable slice or an allocation error.",
  "The function that owns the allocation must return it to the same allocator. Schedule <code>free</code> with <code>defer</code> immediately after a successful allocation so cleanup runs on every later exit."
        ],
        task: "Add a deferred free in <code>showCopy</code>. The starter uses a fixed buffer so the second call can only allocate after the first releases its memory.",
        starter: String.raw`const std = @import("std");

fn showCopy(allocator: std.mem.Allocator, input: []const u8) !void {
    const copy = try allocator.alloc(u8, input.len);
    // Release the allocation when this function returns.
    @memcpy(copy, input);
    std.debug.print("{s}\n", .{copy});
}

pub fn main() !void {
    var memory: [4]u8 = undefined;
    var buffer = std.heap.FixedBufferAllocator.init(&memory);
    try showCopy(buffer.allocator(), "Zig!");
    try showCopy(buffer.allocator(), "Next");
}
`,
        solution: String.raw`const std = @import("std");

fn showCopy(allocator: std.mem.Allocator, input: []const u8) !void {
    const copy = try allocator.alloc(u8, input.len);
    defer allocator.free(copy);
    @memcpy(copy, input);
    std.debug.print("{s}\n", .{copy});
}

pub fn main() !void {
    var memory: [4]u8 = undefined;
    var buffer = std.heap.FixedBufferAllocator.init(&memory);
    try showCopy(buffer.allocator(), "Zig!");
    try showCopy(buffer.allocator(), "Next");
}
`,
        expected: "Zig!\nNext", hint: "Write <code>defer allocator.free(copy);</code> immediately after <code>alloc</code>."
      },
      {
        id: "comptime", title: "Compile-time parameters", minutes: 9, reference: "comptime",
        explanation: [
          "<code>comptime</code> requires an argument to be known at compile time. This allows functions to accept types as arguments and use them in other parameter and return types.",
          "Here, <code>twice</code> takes a type <code>T</code> and a value of that type. The compiler can instantiate the function for both <code>u8</code> and <code>i32</code>."
        ],
        task: 'Make <code>twice</code> return two times its input for both types. The program should print <code>14 -8</code>.',
        starter: program(String.raw`    std.debug.print("{d} {d}\n", .{ twice(u8, 7), twice(i32, -4) });`) + `
fn twice(comptime T: type, value: T) T {
    return value;
}
`,
        solution: program(String.raw`    std.debug.print("{d} {d}\n", .{ twice(u8, 7), twice(i32, -4) });`) + `
fn twice(comptime T: type, value: T) T {
    return value * 2;
}
`,
        expected: "14 -8", hint: 'Return <code>value * 2</code>. The literal <code>2</code> can be coerced to either integer type here.'
      }
    ]
  },
  {
    title: "Project: Base64", icon: "terminal", level: "Project",
    description: "Encode and decode bytes using bit operations, output buffers, and error handling.",
    lessons: [
      {
        id: "base64-bits", title: "Split bytes into six-bit groups", minutes: 9, reference: "Table-of-Operators",
        reading: "https://pedropark99.github.io/zig-book/Chapters/01-base64.html",
        explanation: [
          "Base64 represents six bits at a time. Three input bytes fit into 24 bits and form four groups.",
  "The starter packs the bytes into a <code>u24</code>. Shift a group down to the low bits, then use <code>&amp; 0x3f</code> to keep just six bits."
        ],
        task: "Complete the third group. Its six bits start 6 bits above the low end of <code>word</code>.",
        starter: String.raw`const std = @import("std");

fn showGroups(bytes: [3]u8) void {
    const word = (@as(u24, bytes[0]) << 16) |
        (@as(u24, bytes[1]) << 8) | @as(u24, bytes[2]);
    std.debug.print("{d} {d} {d} {d}\n", .{
        (word >> 18) & 0x3f,
        (word >> 12) & 0x3f,
        @as(u24, 0),
        word & 0x3f,
    });
}

pub fn main() void {
    showGroups(.{ 'Z', 'i', 'g' });
    showGroups(.{ 0, 0, 64 });
}
`,
        solution: String.raw`const std = @import("std");

fn showGroups(bytes: [3]u8) void {
    const word = (@as(u24, bytes[0]) << 16) |
        (@as(u24, bytes[1]) << 8) | @as(u24, bytes[2]);
    std.debug.print("{d} {d} {d} {d}\n", .{
        (word >> 18) & 0x3f,
        (word >> 12) & 0x3f,
        (word >> 6) & 0x3f,
        word & 0x3f,
    });
}

pub fn main() void {
    showGroups(.{ 'Z', 'i', 'g' });
    showGroups(.{ 0, 0, 64 });
}
`,
        expected: "22 38 37 39\n0 0 1 0", hint: "Shift right by <code>6</code> and mask with <code>0x3f</code>."
      },
      {
        id: "base64-encode", title: "Encode blocks and add padding", minutes: 14, reference: "Slices",
        reading: "https://pedropark99.github.io/zig-book/Chapters/01-base64.html",
        explanation: [
          "Each six-bit group indexes the 64-character alphabet. For a short final block, the starter treats missing input bytes as zero while packing.",
  "One input byte produces two characters and two padding marks. Two bytes produce three characters and one padding mark. A full block uses all four characters."
        ],
        task: "Fix the last two assignments in <code>encode</code>. Write an alphabet character only when its group contains input bits. Otherwise write <code>=</code>.",
        starter: String.raw`const std = @import("std");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// The caller supplies four output bytes per input block.
fn encode(input: []const u8, output: []u8) []const u8 {
    var read: usize = 0;
    var written: usize = 0;
    while (read < input.len) : (written += 4) {
        const block = input[read..][0..@min(3, input.len - read)];
        var word: u24 = 0;
        for (block, 0..) |byte, i| {
            const shift: u5 = @intCast(16 - 8 * i);
            word |= @as(u24, byte) << shift;
        }

        output[written] = alphabet[(word >> 18) & 0x3f];
        output[written + 1] = alphabet[(word >> 12) & 0x3f];
        output[written + 2] = alphabet[(word >> 6) & 0x3f];
        output[written + 3] = alphabet[word & 0x3f];
        read += block.len;
    }
    return output[0..written];
}

pub fn main() void {
    var output: [8]u8 = undefined;
    for ([_][]const u8{ "Z", "Zi", "Zig", "Zig!" }) |input| {
        std.debug.print("{s}\n", .{encode(input, &output)});
    }
}
`,
        solution: String.raw`const std = @import("std");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// The caller supplies four output bytes per input block.
fn encode(input: []const u8, output: []u8) []const u8 {
    var read: usize = 0;
    var written: usize = 0;
    while (read < input.len) : (written += 4) {
        const block = input[read..][0..@min(3, input.len - read)];
        var word: u24 = 0;
        for (block, 0..) |byte, i| {
            const shift: u5 = @intCast(16 - 8 * i);
            word |= @as(u24, byte) << shift;
        }

        output[written] = alphabet[(word >> 18) & 0x3f];
        output[written + 1] = alphabet[(word >> 12) & 0x3f];
        output[written + 2] = if (block.len > 1) alphabet[(word >> 6) & 0x3f] else '=';
        output[written + 3] = if (block.len > 2) alphabet[word & 0x3f] else '=';
        read += block.len;
    }
    return output[0..written];
}

pub fn main() void {
    var output: [8]u8 = undefined;
    for ([_][]const u8{ "Z", "Zi", "Zig", "Zig!" }) |input| {
        std.debug.print("{s}\n", .{encode(input, &output)});
    }
}
`,
        expected: "Wg==\nWmk=\nWmln\nWmlnIQ==", hint: "<code>block.len &gt; 1</code> enables the third character, and <code>block.len &gt; 2</code> enables the fourth."
      },
      {
        id: "base64-decode", title: "Decode and validate input", minutes: 12, reference: "Errors",
        reading: "https://pedropark99.github.io/zig-book/Chapters/01-base64.html",
        explanation: [
          "A decoder needs a writable slice with the right length. The standard library’s <code>calcSizeForSlice</code> computes that length and can reject invalid padding.",
  "The <code>decode</code> call writes into the slice and returns an error for malformed input. Propagating the error lets the caller choose a message."
        ],
        task: "Call the decoder with the exact-size output slice. Propagate failures so the final test prints <code>invalid Base64</code>.",
        starter: String.raw`const std = @import("std");

fn decode(input: []const u8, output: []u8) ![]const u8 {
    const decoder = std.base64.standard.Decoder;
    const size = try decoder.calcSizeForSlice(input);
    if (size > output.len) return error.BufferTooSmall;
    const result = output[0..size];
    @memset(result, '?');
    return result;
}

pub fn main() void {
    var output: [4]u8 = undefined;
    for ([_][]const u8{ "Wg==", "WmlnIQ==", "W!ln" }) |input| {
        const decoded = decode(input, &output) catch {
            std.debug.print("invalid Base64\n", .{});
            continue;
        };
        std.debug.print("{s}\n", .{decoded});
    }
}
`,
        solution: String.raw`const std = @import("std");

fn decode(input: []const u8, output: []u8) ![]const u8 {
    const decoder = std.base64.standard.Decoder;
    const size = try decoder.calcSizeForSlice(input);
    if (size > output.len) return error.BufferTooSmall;
    const result = output[0..size];
    try decoder.decode(result, input);
    return result;
}

pub fn main() void {
    var output: [4]u8 = undefined;
    for ([_][]const u8{ "Wg==", "WmlnIQ==", "W!ln" }) |input| {
        const decoded = decode(input, &output) catch {
            std.debug.print("invalid Base64\n", .{});
            continue;
        };
        std.debug.print("{s}\n", .{decoded});
    }
}
`,
        expected: "Z\nZig!\ninvalid Base64", hint: "Use <code>try decoder.decode(result, input);</code> before returning the decoded bytes."
      }
    ]
  }
];

export const lessons = modules.flatMap((module, moduleIndex) => module.lessons.map(lesson => ({
  ...lesson, moduleIndex, moduleTitle: module.title
})));
