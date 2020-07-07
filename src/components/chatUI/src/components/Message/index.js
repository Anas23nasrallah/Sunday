import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      authorname
    } = props;
    // const authorName = props.author

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            <span style={{ display: 'block',fontSize: '1em'}}>{`${data.authorname}:`}</span>
            <span style={{ display: 'block',fontSize: '1.7em'}}>{`\t${data.message}`}</span>
            
          </div>
        </div>
      </div>
    );
}