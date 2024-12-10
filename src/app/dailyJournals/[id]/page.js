import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleDailyJournal } from '../../../api/DailyJournal';

export default function DailyJournalDetails({ params }) {
  const [journalDetails, setJournalDetails] = useState({});
  const { id } = params;

  useEffect(() => {
    getSingleDailyJournal(id).then(setJournalDetails);
  });

  return (
    <>
      <div className="journalDetails">
        <h2>{journalDetails.date}</h2>
        <p>{journalDetails.entry}</p>
      </div>
      <div>placeholder for SymptomLog Cards</div>
    </>
  );
}

DailyJournalDetails.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
