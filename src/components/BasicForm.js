import useInput from "../hooks/useInput";

const BasicForm = (props) => {
  const {
    value: enteredFirstname,
    isValid: enteredFirstameIsValid,
    hasError: enteredFirstnameHasError,
    valueChangeHandler: firstnameChangeHandler,
    valueBlurHandler: firstnameBlurHandler,
    reset: resetFirstname,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastname,
    isValid: enteredLastnameIsValid,
    hasError: enteredLastnameHasError,
    valueChangeHandler: lastnameChangeHandler,
    valueBlurHandler: lastnameBlurHandler,
    reset: resetLastname,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredFirstameIsValid && enteredLastnameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !enteredFirstameIsValid ||
      !enteredLastnameIsValid ||
      !enteredEmailIsValid
    ) {
      return;
    }

    resetFirstname();
    resetLastname();
    resetEmail();
  };

  const firstnameClasses = enteredFirstnameHasError
    ? "form-control invalid"
    : "form-control";

  const lastnameClasses = enteredLastnameHasError
    ? "form-control invalid"
    : "form-control";

  const emailClasses = enteredEmailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstnameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
            value={enteredFirstname}
          />
          {enteredFirstnameHasError && (
            <p className="error-text">Please enter a valid first name</p>
          )}
        </div>
        <div className={lastnameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastnameChangeHandler}
            onBlur={lastnameBlurHandler}
            value={enteredLastname}
          />
          {enteredLastnameHasError && (
            <p className="error-text">Please enter a valid last name</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
