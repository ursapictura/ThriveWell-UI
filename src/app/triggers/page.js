'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllTriggers } from '../../api/Trigger';
import TriggerCard from '../../components/TriggerCard';

export default function TriggersPage() {
  const { user } = useAuth();
  const [triggers, setTriggers] = useState([]);

  const getAllUserTriggers = () => getAllTriggers(user.uid).then(setTriggers);

  useEffect(() => {
    getAllUserTriggers();
  }, [user]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>Your Triggers</h1>
      <h5 style={{ textAlign: 'center' }}>These are triggers you have used in the past</h5>
      <div className="symptom-trigger-div">
        {triggers ? (
          triggers.map((trigger) => <TriggerCard key={trigger.id} triggerObj={trigger} onUpdate={getAllUserTriggers} />)
        ) : (
          <>
            <h4>You have not tracked any triggers. Create a SymptomLog to add new triggers to ThriveWell!</h4>
            <Link href="/symptomLogs/new" passHref>
              <button type="submit" className="button">
                Log a New Symptom
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
