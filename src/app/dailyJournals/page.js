'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllDailyJournalsByMonthYear } from '../../api/DailyJournal';
import DailyJournalCard from '../../components/DailyJournalCard';

export default function DailyJournalMainPage() {
  const [dailyJournals, setDailyJournals] = useState([]);

  const { user } = useAuth();
  const today = new Date();
  console.warn(today);
  const month = today.getUTCMonth();
  console.warn(month);
  const year = today.getUTCFullYear();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDailyJournals = () => {
    getAllDailyJournalsByMonthYear(user.uid, year, month).then(setDailyJournals);
  };

  useEffect(() => {
    getDailyJournals();
  }, [user.uid]);

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '6vh' }}>Daily Journal Entries</h2>
      <div className="journalCardsContainer">
        {dailyJournals.length > 0 ? (
          dailyJournals.map((journal) => <DailyJournalCard dailyJournal={journal} />)
        ) : (
          <div className="noJournalEntries">
            <h2>
              Looks like you haven&apos;t made any entries for {monthNames[month]} {year}.
            </h2>
            {console.warn(user.uid)}
            <Link
              href="/journals/new"
              passHref
              style={{
                display: 'flex',
                width: '125px',
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              <button type="submit" className="button">
                Add New
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
