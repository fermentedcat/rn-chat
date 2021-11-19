import { useReducer } from 'react'

const initialInputState = (initialValue) => {
  return {
    value: initialValue,
    blurred: false,
  }
}

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      return { value: action.value, blurred: false }
    }
    case 'BLUR': {
      return { value: state.value, blurred: true }
    }
    case 'CLEAR': {
      return initialInputState
    }
    default:
      return inputStateReducer
  }
}

export const useInput = (validate = () => true, initialValue = '') => {
  const [state, dispatch] = useReducer(
    inputStateReducer,
    initialInputState(initialValue)
  )

  const isValid = validate(state.value)
  const hasError = !isValid && state.blurred

  const onChange = (value) => {
    dispatch({ type: 'CHANGE', value: value })
  }

  const onBlur = () => {
    dispatch({ type: 'BLUR' })
  }

  const clear = () => {
    dispatch({ type: 'CLEAR' })
  }

  return {
    value: state.value,
    isValid,
    hasError,
    onChange,
    onBlur,
    clear,
  }
}
