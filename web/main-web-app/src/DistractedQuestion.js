import React, { useState } from 'react';

const DistractedQuestion = ({ setMinutes,onYesClick, onNoClick, onClose }) => {

  const handleOptionClick = (option) => {

    if(option){
      onYesClick();
    }else{
      onNoClick();
    }
    onClose(); // Close the distracted question component
  };

  return (
    <div>
      <h2>Were you distracted in the last {setMinutes} minutes?</h2>
      <button onClick={() => handleOptionClick(true)}>Yes</button>
      <button onClick={() => handleOptionClick(false)}>No</button>
    </div>
  );
};

export default DistractedQuestion;