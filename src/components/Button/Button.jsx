function Button({ click, text }) {
  return (
    <button onClick={click} type="button">
      {text}
    </button>
  );
}

export default Button;
