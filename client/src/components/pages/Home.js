import React from 'react';

const Home = () => {
  return (
    <div className='content text-center text-white pt-4 d-flex align-self-center justify-content-center mr-3'>
      <div className='bannerMessages w-75 pt-2 mt-5'>
        <h1 className='banner mx-auto'>Welcome to Receitaria</h1>
        <blockquote className='blockquote'>
          <div className='mt-3 d-flex flex-column flex-md-row align-self-center justify-content-center'>
            <i className='fad fa-book-open fa-2x mr-3'></i>
            <p> Your online Recipe Book</p>
          </div>
          <footer className='blockquote-footer sloganTitle1 w-100 d-flex justify-content-center ml-5 pr-4 titleIcon'>
            <span>by MoPinAle</span>
          </footer>
        </blockquote>
        <h5 className='p-2 w-50 mx-auto'>
          Here you will be able to consult and be enchanted with pratic and
          tasty preparations ... Add yours to a special list!
        </h5>
      </div>
    </div>
  );
};

export default Home;
