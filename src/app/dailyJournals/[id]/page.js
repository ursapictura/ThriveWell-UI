'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteDailyJournal, getSingleDailyJournal } from '../../../api/DailyJournal';
import { getSymptomLogsByDate } from '../../../api/SymptomLog';
import SymptomLogCard from '../../../components/SymptomLogCard';

export default function DailyJournalDetails({ params }) {
  const [journalDetails, setJournalDetails] = useState({});
  const [symptomLogs, setSymptomLogs] = useState([]);
  const [entryDate, setEntryDate] = useState('');
  const { id } = params;
  const router = useRouter();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const deleteThisDailyJournal = () => {
    if (window.confirm(`Delete entry for ${journalDetails.date}?`)) {
      deleteDailyJournal(id).then(() => router.push(`/dailyJournals`));
    }
  };

  useEffect(() => {
    getSingleDailyJournal(id).then(setJournalDetails);
  }, [id]);

  useEffect(() => {
    const journalDate = new Date(journalDetails.date);

    // check that journalDate is valid
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(journalDate)) {
      const journalYear = journalDate.getUTCFullYear();
      const journalMonth = journalDate.getUTCMonth();
      const journalDay = journalDate.getUTCDate();

      const journalWrittenMonth = monthNames[journalDate.getUTCMonth()];
      // Update the entry date
      setEntryDate(`${journalWrittenMonth} ${journalDay}, ${journalYear}`);

      // Add 1 to journal month to account for UTC Months starting from 0 instead of 1
      getSymptomLogsByDate(journalDetails.uid, journalYear, journalMonth + 1, journalDay).then((logs) => setSymptomLogs(logs));
    }
  }, [journalDetails]);

  return (
    <>
      <div className="journalDetails">
        {entryDate && <h2>Entry Date: {entryDate}</h2>}
        <p style={{ marginTop: '2vh' }}>{journalDetails.entry}</p>
        <div style={{ display: 'flex', gap: '15px', minHeight: '55px', margin: '5vh 0' }}>
          <Link passHref href={`/dailyJournals/edit/${journalDetails.id}`}>
            <button className="button" type="submit">
              Edit Entry
            </button>
          </Link>
          <button className="button" type="submit" onClick={deleteThisDailyJournal}>
            Delete Entry
          </button>
        </div>
      </div>
      <div className="logCardsContainer">{symptomLogs.length > 0 ? symptomLogs.map((log) => <SymptomLogCard key={log.id} logObj={log} />) : ''}</div>
    </>
  );
}

DailyJournalDetails.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
