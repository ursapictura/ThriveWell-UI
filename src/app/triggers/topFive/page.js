'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getTopFiveTriggers } from '../../../api/Trigger';
import TopTriggersCard from '../../../components/TopTriggersCard';

export default function TopFiveTriggersPage() {
  const [TopFiveTriggers, setTopFiveTriggers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getTopFiveTriggers(user.uid).then(setTopFiveTriggers);
  }, [user]);

  return (
    <div className="analysisContainer">
      <h1>What is Contributing to my Symptoms?</h1>
      <h2>We&apos;ve analyzed all of your symptom logs from the last thirty days, and these are your most likely triggers...</h2>
      {TopFiveTriggers ? (
        TopFiveTriggers.map((trigger) => <TopTriggersCard key={trigger.id} triggerObj={trigger} />)
      ) : (
        <h2>Looks like you haven&apos;t logged enough symptoms to run an analysis. Keep logging symptoms and check back in a few days!</h2>
      )}
    </div>
  );
}
