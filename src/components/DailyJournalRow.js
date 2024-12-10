// 'use client';

import React from 'react';
import { PropTypes } from 'prop-types';

export default function DailyJournalRow({ journalObj }) {
  return (
    <tr>
      <th>{journalObj.date}</th>
      <td>{journalObj.severityAverage}</td>
      <td>
        <a href={`/dailyJournals/${journalObj.id}`}>
          <button type="submit" className="button">
            VIEW
          </button>
        </a>
      </td>
    </tr>
  );
}

DailyJournalRow.propTypes = {
  journalObj: PropTypes.shape({
    severityAverage: PropTypes.number,
    date: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
