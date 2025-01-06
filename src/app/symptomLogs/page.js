'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getSymptomLogsForLastThirtyDays } from '../../api/SymptomLog';
import SymptomLogCard from '../../components/SymptomLogCard';

export default function SymptomLogsPage() {
  const [symptomLogs, setSymptomLogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getSymptomLogsForLastThirtyDays(user.uid).then(setSymptomLogs);
  }, [user]);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '8vh' }}>Symptom Logs from the Last Thirty Days</h1>

      <div className="logCardsContainer">{symptomLogs ? symptomLogs.map((log) => <SymptomLogCard key={log.id} logObj={log} />) : <h3>Opps! Looks like you haven&apos;t added any logs yet!</h3>}</div>
    </div>
  );
}
