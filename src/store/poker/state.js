export default {
  sessionId: '',
  estimation: -4,
  name: '',
  chickenMode: false,
  uid: '1',
  userId: '',
  names: {},
  estimationSteps: 15,
  estimationValues: {
    '0': { // initial fibonacci value
      value: 0,
      label: '0',
      show: true
    },
    '-1': { // infinity
      value: -1,
      label: '∞',
      show: true
    },
    '-2': { // unsure
      value: -2,
      label: '?',
      show: true
    },
    '-3': { // break
      value: -3,
      label: '☕',
      show: true
    },
    '-4': { // waiting for user
      value: -4,
      label: '⏳',
      show: false
    },
    '-5': { // user done
      value: -5,
      label: '⌛',
      show: false
    },
    '-6': { // watch
      value: -6,
      label: '👁',
      show: false
    },
    '-7': {
      value: -7,
      label: '🚫',
      show: false
    }
  },
  aboutTitle: 'About',
  aboutTexts: {
    '1': 'This web app is inspired by <a href="https://www.scrumguides.org/jeff.html" target="_blank">Jeff Sutherland</a> (co-creator of Scrum), his book <a href="https://www.scruminc.com/new-scrum-the-book/" target="_blank">"Scrum: The Art of Doing Twice The Work In Half the Time"</a> and his article about estimation: <a href="https://www.scruminc.com/why-do-we-use-fibonacci-numbers-to-estimate-user-stories/" target="_blank">"Why Do We Use Fibonacci Numbers to Estimate User Stories?"</a>',
    '2': 'User story estimation with Planning Poker is based on the Delphi technique, to avoid anchoring biases such as the halo effect or bandwagon effect or just plain stupid groupthink.',
    '3': 'Use the average of the estimates if the estimates are not more than two levels apart. If people are more then three levels apart, them the persons with the highest and the lowest estimation say in 30 seconds why the estimated before re-estimate.',
    '4': 'The source code can be found on <a href="https://github.com/sg70/jeffs-poker" target="_blank">GitHub</a>. You report issue there as well.',
    '5': '<b>Chicken mode:</b> The chicken mode can be use for watch the planning poker.'
  },
  estimationLabel: 'Estimation',
  inviteTitle: 'Invite players',
  inviteText: 'Use your camera app or copy the url',
  joinTitle: 'Join game',
  nameFieldLabel: 'Name',
  nameFieldError: 'Name is required',
  startGameBtnLabel: 'Start game',
  chickenToggleLabel: 'Chicken mode',
  reEstimateLabel: 'Re-Estimate'
}
