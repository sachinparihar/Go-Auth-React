import React from 'react';

const Home = (props: { name: string, justLoggedOut: boolean }) => {
    let message;

    if (props.name === '' || props.justLoggedOut) {
        message = 'You are not logged in';
    } else {
        message = 'You are now logged in';
    }

    return (
        <div>
            <h1>Hello</h1>
            {message}
        </div>
    );
};

export default Home;