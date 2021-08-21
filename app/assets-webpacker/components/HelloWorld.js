const HelloWorld = ({ from }) => (
  <>
    Hello World
    {from && ` from ${from}.`}
  </>
);

export default HelloWorld;
