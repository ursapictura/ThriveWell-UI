// 'use client';

import React from 'react';
import { PropTypes } from 'prop-types';
import DailyJournalRow from './DailyJournalRow';

export default function DailyJournalTable({ dailyJournals, onUpdate, month, year }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="overflow-x-auto visit-table">
      <h2 className="title">
        Daily Journals for {monthNames[month]} {year}
      </h2>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Date</th>
            <th>Symptom Average</th>
            <th aria-label="text" />
          </tr>
        </thead>
        <tbody>
          {dailyJournals.map(
            (
              journal, // eslint-disable-line
            ) => (
              <DailyJournalRow key={journal.id} journalObj={journal} onUpdate={onUpdate} />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

DailyJournalTable.propTypes = {
  dailyJournals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.int,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
