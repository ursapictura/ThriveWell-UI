'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import SymptomDiv from '../../components/SymptomDiv';
import { getAllSymptoms } from '../../api/Symptom';

export default function SymptomsPage() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState([]);

  const getAllUserSymptoms = () => getAllSymptoms(user.uid).then(setSymptoms);

  useEffect(() => {
    getAllUserSymptoms();
  }, [user]);

  return (
    <div className="symptom-trigger-div">
      <h1>Your Symptoms</h1>
      {symptoms ? (
        symptoms.map((symptom) => <SymptomDiv key={symptom.id} symptomObj={symptom} onUpdate={getAllUserSymptoms} />)
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
  );
}
