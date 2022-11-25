import { useState } from 'react';
import './Clock.css';


const TimerControl = ({data, setData}) => {
  function handleDecrement (){
    let length = data.length, min= data.min

    if( data.length > min ){
      setData((prevState ) => ({
        ...prevState,
        length: length - 1
      }));
    }
    

  }

  function handleIncrement(){
    let length = data.length,  max= data.max
    if( data.length < max ){
      setData((prevState ) => ({
        ...prevState,
        length: length + 1
      }));
    }
  }


  return (
    <div>
      <p id="break-label">{data.label}</p>
      <div className='control'>
        <button
          id="break-decrement"
          data-operator="-"
          onClick={handleDecrement}
          // onClick={() => props.length > 1 && props.setLength(props.length - 1)}
        >-</button>
        <div id='break-length'>{data.length}</div>
        <button 
        id="break-increment"
        data-operator="+"
        onClick={handleIncrement}
        //  onClick={() => props.length <= 59 && props.setLength(props.length + 1)}
         >+</button>
      </div>
    </div>
  )
}

function Clock() {
  const [breakLength, setBreakLength] = useState({
    label: 'Break Length',
    length: 45,
    min: 1,
    max: 60
  });
  const [sessionLength, setSessionLength] = useState({
    label: 'Session Length',
    length: 20,
    min: 1,
    max: 60
  });

  return (
    <main>
      <h1>
        25 + 5 Clock
      </h1>
      <div className="controls-wr">

        <TimerControl data={breakLength} setData={setBreakLength} />

        <TimerControl data={sessionLength} setData={setSessionLength}/>
      </div>

      <div className="timer-wr">
        <div></div>
        <div id="timer-label">Session</div>
        <div id="time-left">22:57</div>
        <div className='timer-control'>
          <button id="start_stop">start/stop</button>
          <button id="reset">reset</button>
        </div>
      </div>

    </main>
  );
}

export default Clock;
