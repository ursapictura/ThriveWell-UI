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

export default addSymptomTrigger;
