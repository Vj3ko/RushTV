export const Results = ({ results }) => {
  return (
    <p>
      A total of {results} {results === 1 ? 'result' : 'results'} has been
      found!
    </p>
  );
};
