// The ‘public’ modifier is not required on methods, constructors or classes.

const { getStringRange } = require("../utils");

const rule = {
    range: {
        type: "function",
        func: (errLine, errItem) => {
            return getStringRange(errLine, "public", errItem);
        }
    },
    fix: {
        label: "Remove public",
        type: "replaceString",
        before: "public ",
        after: ""
    },
    tests: [
        {
            sourceBefore: `
      public class MyClass {

    }
`,
            sourceAfter: `
      class MyClass {

    }
`
        },
        {
            sourceBefore: `
      public MyClass() {}
`,
            sourceAfter: `
      MyClass() {}
`
        },
        {
            sourceBefore: `
      public void myMethod() {}
`,
            sourceAfter: `
      void myMethod() {}
`
        }
    ]
};

module.exports = { rule };
