import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const { icon } = props;
    return (
      // <ion-icon name="heart"></ion-icon>
      <i className={`toolbar-button ${icon}`} />
    );
}