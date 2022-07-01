const FormError = ({ error }) => {
  return <>{error && <span>{error.message}</span>}</>;
};

export default FormError;
