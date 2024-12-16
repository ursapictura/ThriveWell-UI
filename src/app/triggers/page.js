'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllTriggers } from '../../api/Trigger';
import TriggerDiv from '../../components/TriggerDiv';

export default function TriggersPage() {
  const { user } = useAuth();
  const [triggers, setTriggers] = useState([]);

  const getAllUserTriggers = () => getAllTriggers(user.uid).then(setTriggers);

  useEffect(() => {
    getAllUserTriggers();
  }, [user]);

  return (
    <div className="symptom-trigger-div">
      <h1>Your Triggers</h1>
      <p>These are triggers you have used in the past</p>
      <div style={{ marginTop: '6vh' }}>
        {triggers ? (
          triggers.map((trigger) => <TriggerDiv key={trigger.id} triggerObj={trigger} onUpdate={getAllUserTriggers} />)
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
    </div>
  );
}
