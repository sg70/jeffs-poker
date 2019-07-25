const hasSession = (state) => {
  return state.sessionId !== ''
}

const sessionId = (state) => {
  return state.sessionId
}

const estimation = (state) => {
  return state.estimation
}

const uid = (state) => {
  return state.uid
}

const name = (state) => {
  return state.name
}

const names = (state) => {
  return state.names
}

const hasNames = (state) => {
  return Object.values(state.names).length > 0
}

const estimationSteps = (state) => {
  return state.estimationSteps
}

const values = (state) => {
  return state.estimationValues
}

const aboutTitle = (state) => {
  return state.aboutTitle
}

const aboutTexts = (state) => {
  return state.aboutTexts
}

const estimationLabel = (state) => {
  return state.estimationLabel
}

const inviteTitle = (state) => {
  return state.inviteTitle
}

const inviteText = (state) => {
  return state.inviteText
}

const joinTitle = (state) => {
  return state.joinTitle
}

const nameFieldLabel = (state) => {
  return state.nameFieldLabel
}

const nameFieldError = (state) => {
  return state.nameFieldError
}

const startGameBtnLabel = (state) => {
  return state.startGameBtnLabel
}

const chickenToggleLabel = (state) => {
  return state.chickenToggleLabel
}

const reEstimateLabel = (state) => {
  return state.reEstimateLabel
}

const resetGameLabel = (state) => {
  return state.resetGameLabel
}

const chickenMode = (state) => {
  return state.chickenMode
}

const estimationValueLabel = (state) => {
  if (state.estimation < 0) {
    return Object.values(state.estimationValues).find(o => o.value === state.estimation).label
  }
  return state.estimation
}

export {
  hasSession,
  sessionId,
  estimation,
  uid,
  name,
  names,
  hasNames,
  estimationSteps,
  values,
  aboutTitle,
  aboutTexts,
  estimationLabel,
  inviteTitle,
  inviteText,
  joinTitle,
  nameFieldLabel,
  nameFieldError,
  startGameBtnLabel,
  chickenToggleLabel,
  reEstimateLabel,
  resetGameLabel,
  chickenMode,
  estimationValueLabel
}
