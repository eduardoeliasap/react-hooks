import React, { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * The UseEffect overlaps the lifecycles of our application
 * that in the traditional method were componentDidMount, componentUpdate ...
 */

function App() {
  /**
   * To store information without using Hooks, we would have to turn this function into a class
   * With Hooks we can create states within the function so that we can manipulate the information
   */

   /**
    * In the first case useState returns the state itself
    * In the second position useState returns a function to update this state
    * const [tech, setTech] = useState (['Node', 'JavaScript']); // useState is possible to boot to a default value
    */
  const [tech, setTech] = useState([]);
  const [newtech, setNewTech] = useState(''); // o useState é possivel inicializarmos com um valor padrão

  /**
   * The function handleAdd is inside another function,
   * that's why it's being recreated all the time with the interaction on the screen
   * To call it only when you have a newTech, we use the React Hooks useCallback
   */
  // function handleAdd() {
  //   setTech([...tech, newtech]);
  //   setNewTech(''); // Cleans newtech with each new addition
  //   After executing this function React executes the return again and renders the page with the new information
  // }
  const handleAdd = useCallback(() => {
    setTech([...tech, newtech]);
    setNewTech('');
  }, [newtech, tech]);

  /**
   * In the past, if we wanted to store information on localStorage to compare whenever information in the state changes
   * we had to write the componentdidMount and compare the values.
   * Using useEfect the first parameter is the function that will be executed,
   * and the second parameter is when it will be executed (it is an array of dependencies,
   * which is monitored when changes in certain variables occur)
   */

  /**
    * If I want to load the stored data only once (only on the first page refresh),
    * I can create a useEffect that doesn't monitor any information,
    * so it will run only once (only when we start the application)
  */
  useEffect(() => {
    const techSorage = localStorage.getItem('tech');

    if (techSorage) {
      setTech(JSON.parse(techSorage));
    }

    /**
    * ComponentWillUnmount () simulation (These methods are called when a component is being removed from the DOM)
    */
    // return (() => {}); // This function would be performed whenever our component ceases to exist.
  }, [])

   /**
    * In this case useEffect is monitoring changes in the tech variable
    */
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // Every time my tech variable changes I call the function that is calculating the number of registered technologies
  const techLengh = useMemo(() => tech.length, [tech]);

  return (
    // The fragment is used to have two components in this same return
    <>
      <div className="App">
        <ul>
          {tech.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {/* If we use {tech.length} directly, whenever anything typed on the screen we will be calculating this lenght */}
        {/* To improve this we use useMeno */}
        {/* <strong> You have {tech.length} registered technologies </strong> <br /> */}
        <strong>Você possui {techLengh} tecnologias cadastradas</strong><br />
        <input value={newtech} onChange={e => setNewTech(e.target.value)} />
        <button type="button" onClick={handleAdd}>Adcionar</button>
      </div>
    </>
  );
}

export default App;
