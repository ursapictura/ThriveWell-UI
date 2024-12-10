// 'use client';

import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function DailyJournalCard({ dailyJournal }) {
  const date = new Date(dailyJournal.date);
  const day = date.getUTCDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <div className="flex">
            <Link href={`/journals/${dailyJournal.id}`} passHref>
              <Card.Title className="post-card-link">
                {monthNames[month - 1]} {day}, {year}
              </Card.Title>
            </Link>
          </div>
          <Card.Text style={{ fontWeight: '600', color: '#c82ae8' }}>Average Symptom Severity: {dailyJournal.severityAverage}</Card.Text>
          <Card.Text style={{ maxHeight: '20vh', minHeight: '18vh', overflow: 'hidden' }}>{dailyJournal.entry}</Card.Text>
          <Link href={`/posts/${dailyJournal.id}`} passHref>
            <Card.Text style={{ marginTop: '10px' }}>
              <b>Keep Reading...</b>
            </Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

DailyJournalCard.propTypes = {
  dailyJournal: PropTypes.shape({
    id: PropTypes.number,
    entry: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    severityAverage: PropTypes.number,
  }).isRequired,
};
