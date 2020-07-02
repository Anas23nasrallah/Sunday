import React from 'react';
import { inject, observer } from 'mobx-react';

const Profile = inject('user')(observer((props) => {
    const user = props.user
    return (
        <div>
            <p>Welcome B*tch</p>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.userName}</p>
            <p>{user.email}</p>
        </div>
    );
}))

export default Profile;