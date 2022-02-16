import React from 'react';

const About = () => {
  return (
    <div className='content text-center text-white pt-4 d-flex align-self-center justify-content-center mr-3'>
      <div className='bannerMessages w-75 pt-2 p-3 mt-5'>
        <h1 className='banner mx-auto'>About</h1>
        <p>
          <span className='titleIcon'>Receitaria</span> is a Project which I 
          decided to create to externalize the knowledge I have acquired so far. 
          It was a big challenge and I am so proud of the results I achieved.
        </p>
        <p>
          React and Bootstrap were the Frameworks I chose to build these Application and, to persist the data, I used MongoDB. Hope you enjoy it!
        </p>
      </div>
    </div>
  );
};

export default About;
