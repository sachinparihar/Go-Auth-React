import React from 'react';

const Home = (props: { name: string }) => {
    return (
        <div>
              <h1>he;</h1>       
            {props.name ? 'Hi ' + props.name : 'You are not logged in'}
        </div>
    );
};

export default Home;
