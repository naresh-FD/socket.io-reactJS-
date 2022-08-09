import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:5000', { reconnect: true });

function App() {
  const [msg, setMsg] = useState('');
  const [msgRcd, setMsgRcd] = useState();
  const sendMessage = () => {
    console.log(msg);
    socket.emit('send_message', { message: ` Message from client ${msg}` });
  };
  useEffect(() => {
    socket.on('receive_message', (res) => {
      setMsgRcd(res.message);
    });
  }, [msg]);

  return (
    <div className='App'>
      <div className='container app-container'>
        <h2 className='text-center'>Socket IO react messaging app</h2>
        <input
          type='text'
          className='form-control mt-2'
          placeholder='Enter Message'
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={sendMessage} className='btn btn-primary mt-2'>
          Send message
        </button>

        <h2>Message Received</h2>

        <div>{msgRcd}</div>
      </div>
    </div>
  );
}

export default App;
