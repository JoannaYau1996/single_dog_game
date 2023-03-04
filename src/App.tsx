import './App.css'
import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [name, setName] = useState("")
  const [rule, setRule] = useState(false);
  const [nameremind, setNameremind] = useState(false);
  const [pressremind, setPressremind] = useState(true);
  const [start, setStart] = useState(false);
  const [user_count, setUser_count] = useState(60);
  const [computer_count, setComputer_count] = useState(60);
  const [computerstart, setComputerstart] = useState(false);
  const [cpwin, setCpwin] = useState(false);
  const [userwin, setUserwin] = useState(false);
  const [truth, setTruth] = useState("");

  const namevalue = useRef("");


  useEffect(() => {
    document.addEventListener('keyup', decrease);
    check()
    return () => {
      document.removeEventListener('keyup', decrease);
    }
  });

  useEffect(() => {
    if (computerstart == true) {
      const intervalId = setInterval(() => {
        setComputer_count((t) => {
          return (t == 0) ? t : t - 1;
        });
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [computerstart]);



  function check() {
    if (computer_count == 0) {
      setCpwin(true);
      if (user_count >= 40) {
        setTruth("You deserve to be single.")
      } else if (user_count < 40 && user_count >= 30) {
        setTruth("Look at your speed, no wonder you are single.")
      } else if (user_count < 30 && user_count >= 20) {
        setTruth("Um.... I guess you have been single for more than 10 years.")
      } else if (user_count < 20 && user_count >= 10) {
        setTruth("HaHaHaHa")
      } else if (user_count < 10 && user_count > 1) {
        setTruth("You almost beat the computer, so it seems like you really want to get out of the single status,huh.")
      } else if (user_count == 1) {
        setTruth("HAHAHAHAHA. Maybe being single is your destiny.");
      }

    } else if (user_count == 0) {
      setComputerstart(false);
      setComputer_count(computer_count);
      setUserwin(true)
      setTruth("WoW, your speed is impressive, you must be a relationship virgin.")
    }
  }



  function decrease(e) {
    if (e.code == "Space") {
      e.preventDefault();
      if (start == true && computer_count > 0 && user_count > 0) {
        setUser_count(prev => prev - 1);
        setComputerstart(true);
        setPressremind(false);
      }
    }
  }



  function showrule() {
    if (namevalue.current.value.length > 0) {
      setRule(true);
    } else {
      setNameremind(true)
    }
  }


  function gamestart() {
    setStart(true);
  }


  function restart() {
    setUser_count(60);
    setComputer_count(60);
    setCpwin(false);
    setUserwin(false);
    setStart(true);
    setComputerstart(false);
    setPressremind(true);
  }


  return (
    <>
      {!rule && <div className='container-fluid blackboard text-center m-0 w-100 vh-100 p-2 d-flex flex-column justify-content-center homepage' >
        <h1 className='display-2 mb-5 title'>Single Dog !!!</h1>
        <p className='mb-5 '>How long have you been single?</p>
        <div className='row m-0 align-items-center position-relative'>
          <p className="display-5 mb-md-5">Name: {name}</p>

          <div>
            <label htmlFor='name fs-4' style={{ verticalAlign: "bottom" }}>Your Name: </label>
            <input className='ms-2 d-inline-block p-2' name="name" id="name" type="text" autoComplete="off" onChange={(e) => setName(e.target.value) + setNameremind(false)} required ref={namevalue} />
            <button className='px-4 py-1 ms-3 mt-4 startbtn' type='button' onClick={showrule} >Start</button>
            {nameremind && <p className='mt-3 text-danger'>Please enter your name</p>}
          </div>
        </div>
      </div>}




      {rule && <div className='container-fluid text-center p-0 m-0 w-100 vh-100 gamepage'>
        <div className='row m-0 h-100 position-relative'>

          {!start && <div className='col-11 col-md-5 p-5 position-absolute rule '>
            <h2>How To PLay:</h2>
            <p className='fs-4 mt-5'>
              <span>{name}</span> I know you've been single for a long time. <br /><br />
              Press the space bar to decrease the number of years that you will be single, <br /> <br />do your best to beat the computer, and prove that you deserve to be out of your single status.</p>
            <button type="button" className='px-4 py-1' onClick={gamestart} >OK</button>
          </div>}

          {cpwin && <div className='col-11 col-md-5 p-5 position-absolute cpwin '>
            <h1 className="mb-4">Computer Win</h1>
            <h4><span className='advent'>you will be single for the next<br /> </span>{user_count}<span className='advent'> years</span></h4>
            <p className='truth'>{truth}</p>
            <button type="button" className='px-4 py-1 restartbtn' onClick={restart}  >restart</button>
          </div>}

          {userwin && <div className='col-11 col-md-5 p-5 position-absolute cpwin '>
            <h1>You Win</h1>
            <p className='truth'>WoW, your speed is impressive, you must be a relationship virgin.</p>
            <h4>Good Luck</h4>
            <button type="button" className='px-4 py-1 restartbtn' onClick={restart}  >restart</button>
          </div>}


          <div className='col-12 col-md-6 user_playground p-3 d-flex flex-column justify-content-center'>
            <h1>{name}</h1>
            <h4>You will be single for the next </h4>
            <h1 className='counter'>{user_count}</h1>
            <h4>years</h4>
            {pressremind &&
              <h4 className="mt-3 press">( Press Space bar to start )</h4>
            }
          </div>
          <div className='col-12 col-md-6 computer_playground p-3 d-flex flex-column justify-content-center'>
            <h1>Computer</h1>
            <h1 className='counter'>{computer_count}</h1>
          </div>
        </div>
      </div>}
    </>
  )
}
