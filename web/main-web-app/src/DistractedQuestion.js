import React, { useState } from 'react';

const DistractedQuestion = ({ onYesClick, onNoClick, onClose }) => {

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
      <h2>Were you distracted in the last xxx minutes?</h2>
      <button onClick={() => handleOptionClick(true)}>Yes</button>
      <button onClick={() => handleOptionClick(false)}>No</button>
    </div>
  );
};

export default DistractedQuestion;