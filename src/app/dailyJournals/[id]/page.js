'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleDailyJournal } from '../../../api/DailyJournal';
import { getSymptomLogsByDate } from '../../../api/SymptomLog';
import SymptomLogCard from '../../../components/SymptomLogCard';

export default function DailyJournalDetails({ params }) {
  const [journalDetails, setJournalDetails] = useState({});
  const [symptomLogs, setSymptomLogs] = useState([]);
  const { id } = params;

  useEffect(() => {
    getSingleDailyJournal(id).then(setJournalDetails);
  }, [id]);

  useEffect(() => {
    const journalDate = new Date(journalDetails.date);

    const journalYear = journalDate.getUTCFullYear();
    const journalMonth = journalDate.getUTCMonth();
    const journalDay = journalDate.getUTCDate();

    getSymptomLogsByDate(journalDetails.uid, journalYear, journalMonth + 1, journalDay).then((logs) => setSymptomLogs(logs));
  }, [journalDetails]);

  return (
    <>
      <div className="journalDetails">
        <h2>{journalDetails.date}</h2>
        <p>{journalDetails.entry}</p>
      </div>
      {symptomLogs ? symptomLogs.map((log) => <SymptomLogCard key={log.id} logObj={log} />) : ''}
    </>
  );
}

DailyJournalDetails.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
