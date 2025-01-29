'use client';

import { useRouter } from 'next/navigation';
import CreatableSelect from 'react-select/creatable';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { createTrigger, getAllTriggers } from '../../api/Trigger';
import { addSymptomTrigger } from '../../api/SymptomTrigger';
import { useAuth } from '../../utils/context/authContext';
import { createSymptom, getAllSymptoms } from '../../api/Symptom';
import { createSymptomLog } from '../../api/SymptomLog';

const nullSymptomLog = {
  symptomId: 0,
  severity: 0,
};

export default function SymptomLogForm() {
  const [formInput, setFormInput] = useState(nullSymptomLog);
  const [symptoms, setSymptoms] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  // const todayUTC = new Date().toISOString().split('T')[0];
  const today = new Date().toLocaleDateString('en-CA');
  const router = useRouter();
  const { user } = useAuth();

  const getSymptoms = () => {
    getAllSymptoms(user.uid).then(setSymptoms);
  };

  const getTriggers = () => {
    getAllTriggers(user.uid).then(setTriggers);
  };

  const manageLogSymptom = async (selection) => {
    if (typeof selection.value === 'string') {
      const newSymptom = await createSymptom({ name: selection.label, uid: user.uid }); // Create a new symptom
      setSelectedSymptom({ value: newSymptom.id, label: newSymptom.name }); // Update the state with the created symptom
      return { id: newSymptom.id };
    }
    setSelectedSymptom(selection);
    return { id: selection.value };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('SymptomId:', formInput.symptomId);
  };

  const handleSymptomChange = async (selection) => {
    const managedSymptom = await manageLogSymptom(selection);
    setFormInput((prevState) => ({
      ...prevState,
      symptomId: managedSymptom.id, // Update symptomId based on selection
    }));
  };

  const handleTriggerChange = (selections) => {
    setSelectedTriggers(selections);
  };

  // The CreatableSelect component stores trigger data as an array of objects where
  // triggers that exist in the "triggers" state array (returned from the db) are stored as
  // { value: {trigger.id}, name: {trigger.name} }
  // and triggers that do not exist in the "triggers" state array (and need to be created) as
  // { value: "NewTrigger", label: "NewTrigger", __isNew__: true }
  const manageLogTriggers = async (logId) => {
    console.warn(logId);
    // Create array of promises for triggers that need to be added to log
    const addedTriggers =
      (await selectedTriggers
        // Filter out triggers that were on the log and will remain on the log after update
        // .filter((trigger) => !logObj?.triggers?.some((logTrigger) => logTrigger.id === trigger.value))
        .map((trigger) => {
          // If trigger.value is of type string, then trigger does not yet exist and needs to be created
          // before adding it to the log
          if (typeof trigger.value === 'string') {
            return createTrigger({ name: trigger.label, uid: user.uid }).then(({ id }) => addSymptomTrigger({ symptomSeverity: formInput.severity, symptomLogId: logId.id, triggerId: id }));
          }
          // Otherwise, trigger.value is an int corresponding to the triggerId in the db
          // and only a call to add the SymptomTrigger is necessary
          const payload = { symptomSeverity: formInput.severity, symptomLogId: logId.id, triggerId: trigger.value };
          console.warn(payload);
          return addSymptomTrigger(payload);
          // If no SymptomTriggers need to be added, set addedTriggers to an empty array (rather than undefined)
        })) || [];

    // ensure all promises resolve before exiting function
    await Promise.all([...addedTriggers]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formInput:', formInput);
    if (formInput.severity > 0) {
      createSymptomLog({
        severity: formInput.severity,
        symptomId: formInput.symptomId,
        uid: user.uid,
        date: today,
      }).then(({ id }) => {
        manageLogTriggers({ id }).then(() => router.push(`/dailyJournals`));
      });
    }
  };

  useEffect(() => {
    getSymptoms();
    getTriggers();
  }, [user?.uid]);

  return (
    <Form
      onSubmit={(e) => {
        console.log('Form submit triggered');
        console.log('SymptomId:', formInput.symptomId);
        handleSubmit(e);
      }}
      className="mt-7 w-[80%] ml-auto mr-auto"
    >
      <CreatableSelect instanceId="symptomSelect" aria-label="Symptoms" name="symptoms" className="mb-3" placeholder="Select or Create the Symptom You Are Experiencing" value={selectedSymptom} isClearable onChange={handleSymptomChange} options={symptoms.map((symptom) => ({ value: symptom.id, label: symptom.name }))} required />

      <Form.Select aria-label="Severity" name="severity" className="mb-3" placeholder="How Severe is the Symptom Your Are Experiencing?" value={formInput.severity} onChange={handleChange} style={{ color: 'gray' }} required>
        <option value="0">How Severe is the Symptom?</option>
        <option value="1">1: Mild 😐</option>
        <option value="2">2: Moderate 😓</option>
        <option value="2">3: Severe 😢</option>
        <option value="2">4: Very Severe 😣</option>
        <option value="5">5: Unbearable 😖</option>
      </Form.Select>

      <CreatableSelect instanceId="tagSelect" aria-label="Triggers" name="triggers" className="mb-3" placeholder="Select or Create Potential Triggers" value={selectedTriggers} isMulti onChange={handleTriggerChange} options={triggers.map((trigger) => ({ value: trigger.id, label: trigger.name }))} required />

      {/* Conditionally render the button based on severity */}
      {formInput.severity > 0 && (
        <button className="button" type="submit">
          Log Your Symptom
        </button>
      )}
    </Form>
  );
}
