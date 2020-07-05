import React from 'react';
import { inject, observer } from 'mobx-react';

const Teams = inject('teamsStore')(observer( (props) => {

    const teams = props.teamsStore.teams
    
    return ( <p>In teams</p> );
}))
 
export default Teams;