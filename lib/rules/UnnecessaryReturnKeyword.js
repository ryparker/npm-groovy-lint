// Unnecessary return keyword

const { getStringRange, getVariable } = require('../utils')

const rule = {
  scope: 'file',
  unitary: true,
  range: {
    type: 'function',
    func: (errLine, errItem) => {
      return getStringRange(errLine, 'return', errItem)
    },
  },
  fix: {
    label: 'Remove return keyword',
    type: 'function',
    func: (allLines, variables) => {
      const lineNumber = getVariable(variables, 'lineNb', { mandatory: true })
      if (allLines[lineNumber].includes('return')) {
        allLines.splice(lineNumber, 1)
      } else {
        const itemIndex = allLines.findIndex((line) => line.includes(className))
        throw new Error(
          `FIX ERROR: Unnecessary return keyword was expecting ${className} at position ${lineNumber} but it is at position ${itemIndex} `
        )
      }
      return allLines
    },
  },
  tests: [
    {
      sourceBefore: `
    private getUser() {
      def user
    }
`,
      sourceAfter: `
    private getUser() {

    }
`,
    },
  ],
}

module.exports = { rule }
