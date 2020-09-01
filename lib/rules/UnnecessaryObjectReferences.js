// Unnecessary object reference

const { getStringRange } = require('../utils')

const rule = {
  scope: 'file',
  unitary: true,
  range: {
    type: 'function',
    func: (errLine, errItem) => {
      return getStringRange(errLine, 'new ', errItem)
    },
  },
  fix: {
    label: 'Use .with()',
    type: 'function',
    func: (allLines, ...args) => {
      console.log('START HERE')
      console.log({ allLines })
      console.log({ ...args })
      // const packageName = getVariable(evaluatedVars, 'CLASS_WITH_PACKAGE', {
      //   mandatory: true,
      //   htmlToString: true,
      //   line: line,
      // })
      // const packageShortName = packageName.split('.').pop()
      // return line.replace(packageName, packageShortName)
      return allLines
    },
  },
  tests: [
    {
      sourceBefore: `
def p1 = new Person()
p1.firstName = 'Hamlet'
p1.lastName = "D'Arcy"
p1.employer = 'Canoo'
p1.street = 'Kirschgaraten 5'
p1.city = 'Basel'
p1.zipCode = '4051'
`,
      sourceAfter: `
def p1 = new Person().with {
  firstName = 'Hamlet'
  lastName = "D'Arcy"
  employer = 'Canoo'
  street = 'Kirschgaraten 5'
  city = 'Basel'
  zipCode = '4051'
}
`,
    },
    {
      sourceBefore: `
def p2 = new Person()
p2.setFirstName('Hamlet')
p2.setLastName("D'Arcy")
p2.setEmployer('Canoo')
p2.setStreet('Kirschgaraten 5')
p2.setCity('Basel')
p2.setZipCode('4051')
`,
      sourceAfter: `
def p2 = new Person().with {
  firstName = 'Hamlet'
  lastName = "D'Arcy"
  employer = 'Canoo'
  street = 'Kirschgaraten 5'
  city = 'Basel'
  zipCode = '4051'
}
`,
    },
  ],
}

module.exports = { rule }
