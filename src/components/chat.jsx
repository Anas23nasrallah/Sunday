import React from 'react';
import io from 'socket.io-client'
import { useState } from 'react';
import { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Messenger from './chatUI/src/components/Messenger';

const Chat = inject('tasksStore', 'user')(observer((props) => {
    
    return (
       <div>
           <Messenger />
       </div>
    )
}))
        
export default Chat;

