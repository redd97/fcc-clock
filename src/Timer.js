import { useEffect, useState } from 'react';
import './Timer.css';


const TimerControl = ({ data, setData }) => {
  return (
    <div>
      <p id={data.label + '-label'}>{data.label}</p>
      <div className='control'>
        <button
          id={data.label + '-decrement'}
          data-operator="-"
          onClick={(e) => setData(e.target.dataset.operator, data)}
        >-</button>
        <div id={data.label + '-length'}>{data.length}</div>
        <button
          id={data.label + '-increment'}
          data-operator="+"
          onClick={(e) => setData(e.target.dataset.operator, data)}
        >+</button>
      </div>
    </div>
  )
}

const TimerDisplay = ({ timer }) => {
  const {timeleft, countdown} = {...timer}
  let minutes = Math.floor(timeleft / 60);
  let seconds = timeleft - minutes * 60;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div  >
      <strong id="timer-label">{capitalize(countdown)}</strong>
      <span id="time-left">
        {minutes >= 10 ? minutes : '0' + minutes}:{seconds >= 10 ? seconds : '0' + seconds}
      </span>


    </div>
  )
}

const Timer = () => {

  const [breakTime, setBreakTime] = useState({
    label: 'break',
    length: 5,
    min: 1,
    max: 60
  })

  const [sessionTime, setSessionTime] = useState({
    label: 'session',
    length: 25,
    min: 1,
    max: 60
  })

  const [timer, setTimer] = useState({
    countdown: 'session',
    timeleft: null,
    isStarted: null
  })

  /**
   * Initializarea timer-ului cu datele predefinite 
   */
  useEffect(() => {
    setTimer((prevState) => ({
      ...prevState,
      timeleft: sessionTime.length * 60
    }))
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.isStarted) {
        setTimer((prevState) => {

          if(prevState.timeleft === 0 ){
              if(prevState.countdown === 'break'){
                return {...prevState, countdown: 'session', timeleft: sessionTime.length*60}
              }
              else if(prevState.countdown ==='session'){
                return {...prevState, countdown: 'break', timeleft: breakTime.length*60}
              }
          }
          return { ...prevState, timeleft: prevState.timeleft - 1 }
        })
      }
    }, 1000)

    return () => clearInterval(interval);
  }, [timer.isStarted]);

  
  function handleStartStop() {
    setTimer((prevState) => ({
      ...prevState,
      isStarted: !prevState.isStarted
    }))
  }

  function handleReset() {
    setTimer((prevState) => ({
      countdown: 'session',
      timeleft: 25*60,
      isPaused: null
    }))

    setBreakTime((prevState) => ({
      ...prevState,
      length: 5
    }));

    setSessionTime((prevState) => ({
      ...prevState,
      length: 25
    }));
  }

  function handleCounter(operator, data) {
    let calc = {
      '+': data.length < data.max ? data.length + 1 : data.length,
      '-': data.length > data.min ? data.length - 1 : data.length
    }

    if(!timer.isStarted){
      switch (data.label) {
        case 'break':
          setBreakTime((prevState) => ({
            ...prevState,
            length: calc[operator]
          }));

          timer.countdown === data.label && setTimer((prevState)=> ({
            ...prevState,
            timeleft: breakTime.length*60
          }));
          break;

        case 'session':
          setSessionTime((prevState) => ({
            ...prevState,
            length: calc[operator]
          }));

          timer.countdown === data.label && setTimer((prevState)=> ({
            ...prevState,
            timeleft: sessionTime.length*60
          }));
          break;
      }


    }
  }

  return (
    <main>
      <h1>
        25 + 5 Clock
      </h1>
      <div className="controls-wr">
        <TimerControl data={breakTime} setData={handleCounter} />
        <TimerControl data={sessionTime} setData={handleCounter} />
      </div>

      <div className="timer-wr">
        <TimerDisplay timer={timer} />
        <div className='timer-control'>
          <button id="start_stop" onClick={handleStartStop}>start/stop</button>
          <button id="reset" onClick={handleReset}>reset</button>
        </div>
      </div>

    </main>
  );
}

export default Timer;
