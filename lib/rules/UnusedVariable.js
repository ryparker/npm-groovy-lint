// Unused variable

const { getVariableRange, getVariable } = require('../utils')

const rule = {
  scope: 'file',
  unitary: true,
  variables: [
    {
      name: 'VARNAME',
      regex: /The variable \[(.*)\] in (.*) is not used/,
    },
  ],
  range: {
    type: 'function',
    func: (errLine, errItem, evaluatedVars) => {
      return getVariableRange(errLine, evaluatedVars, 'VARNAME', errItem)
    },
  },
  fix: {
    label: 'Remove unused variables',
    type: 'function',
    func: (allLines, variables) => {
      const VARNAME = getVariable(variables, 'VARNAME', { mandatory: true })
      const lineNumber = getVariable(variables, 'lineNb', { mandatory: true })
      if (allLines[lineNumber].includes(VARNAME)) {
        allLines.splice(lineNumber, 1)
      } else {
        const itemIndex = allLines.findIndex((line) => line.includes(VARNAME))
        throw new Error(
          `FIX ERROR: UnusedVariable was expecting ${VARNAME} at position ${lineNumber} but it is at position ${itemIndex} `
        )
      }
      return allLines
    },
  },
  tests: [
    {
      sourceBefore: `
    private methodName() {
        def a = 1
        def b = 2
        def c = a
    }
`,
      sourceAfter: `
    private methodName() {
        def a = 1
    }
`,
    },
  ],
}

module.exports = { rule }
