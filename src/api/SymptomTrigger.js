import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addSymptomTrigger = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptom-triggers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteSymptomTrigger = (symptomTriggerId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/symptom-triggers/${symptomTriggerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { addSymptomTrigger, deleteSymptomTrigger };
