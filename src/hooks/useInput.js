import { useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_ENTERED": {
      return {
        value: action.value,
        isTouched: state.isTouched,
      };
    }
    case "INPUT_BLUR": {
      return {
        isTouched: true,
        value: state.value,
      };
    }
    case "RESET": {
      return { isTouched: false, value: "" };
    }
    default:
      return initialInputState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  //   const [enteredValue, set  EnteredValue] = useState("");
  //   const [isTouched, setIsTouched] = useState(false);

  //   const valueIsValid = validateValue(enteredValue);
  //   const hasError = !valueIsValid && isTouched;
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: "INPUT_ENTERED", value: event.target.value });
  };

  const valueBlurHandler = (event) => {
    // setIsTouched(true);
    dispatch({ type: "INPUT_BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
