const App = () => {
  const { useState, useEffect } = React;

  const [page, setPage] = useState(<fw-spinner />);

  useEffect(() => {
    setTimeout(() => {
      setPage(<FreshdeskAuth authenticated={onAuthenticate} />);
    }, 3000);
  }, []);

  const onAuthenticate = () => {
    setPage(<TestPage />);
  };

  return <div>{page}</div>;
};

window.App = App;
