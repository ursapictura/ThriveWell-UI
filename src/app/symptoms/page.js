'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllSymptoms } from '../../api/Symptom';
import SymptomCard from '../../components/SymptomCard';

export default function SymptomsPage() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState([]);

  const getAllUserSymptoms = () => getAllSymptoms(user.uid).then(setSymptoms);

  useEffect(() => {
    getAllUserSymptoms();
  }, [user]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '5vh' }}>Your Symptoms</h1>
      <h5 style={{ textAlign: 'center' }}>These are symptoms you have tracked in the past</h5>
      <div className="symptom-trigger-div">
        {symptoms ? (
          symptoms.map((symptom) => <SymptomCard key={symptom.id} symptomObj={symptom} onUpdate={getAllUserSymptoms} />)
        ) : (
          <div>
            <h4>You have not tracked any symptoms yet. Create a SymptomLog to add new symptoms to ThriveWell!</h4>
            <Link href="/symptomLogs/new" passHref>
              <button type="submit" className="button">
                Log a New Symptom
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
