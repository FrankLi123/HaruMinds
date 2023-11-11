import React, { useState } from 'react';

const FormSetting = () => {
  const [showForm, setShowForm] = useState(false);
  const [recordTime, setRecordTime] = useState('');
  const [interactionPreference, setInteractionPreference] = useState('');
  const [advicePreference, setAdvicePreference] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSettingsClick = () => {
    setShowForm(true);
    setShowDetails(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowDetails(false);
  };

  const handleShowDetailsClick = () => {
    setShowDetails(!showDetails); // Toggle the value of showDetails
  };

  return (
    <div>
      <h1>Settings</h1>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="recordTime">How long to record distractions (in minutes)?</label>
            <input
              type="number"
              id="recordTime"
              value={recordTime}
              onChange={(e) => setRecordTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="interactionPreference">Interaction preference:</label>
            <input
              type="text"
              id="interactionPreference"
              value={interactionPreference}
              onChange={(e) => setInteractionPreference(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="advicePreference">Do you expect advice or supportive words?</label>
            <input
              type="text"
              id="advicePreference"
              value={advicePreference}
              onChange={(e) => setAdvicePreference(e.target.value)}
            />
          </div>
          <button type="submit">Save Settings</button>
        </form>
      ) : (
        <div>
          <button onClick={handleSettingsClick}>Open Settings</button>
          <button onClick={handleShowDetailsClick}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      )}

      {showDetails && (
        <div>
          <h2>Settings Details</h2>
          <p>Record Time: {recordTime} minutes</p>
          <p>Interaction Preference: {interactionPreference}</p>
          <p>Advice Preference: {advicePreference}</p>
        </div>
      )}
    </div>
  );
};

export default FormSetting;




