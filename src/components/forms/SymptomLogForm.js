// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'
// import { createTrigger } from '../../api/Trigger';
// import { addSymptomTrigger, deleteSymptomTrigger } from '../../api/SymptomTrigger';

// const nullSymptomLog = {
//     symptomId: 0,
//     date: null,
//     severity: 0,

// }

// export default function SymptomLogForm() {
//     const [formInput, setFormInput] = useState(nullSymptomLog);
//     const [triggers, setTriggers] = useState([]);
//     const [selectedTriggers, setSelectedTriggers] = useState([]);
//     const router = useRouter();
//     const { user } = useAuth();

//     const getTriggers = () => {
//         getAllTriggers(user.uid).then(setTriggers)
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormInput((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//       }

//     const handleTriggerChange = (selections) => {
//         setSelectedTriggers(selections);
//     }

//     // The CreatableSelect component stores trigger data as an array of objects where
//     // triggers that exist in the "triggers" state array (returned from the db) are stored as
//     // { value: {trigger.id}, name: {trigger.name} }
//     // and triggers that do not exist in the "triggers" state array (and need to be created) as
//     // { value: "NewTrigger", label: "NewTrigger", __isNew__: true }
//     const manageLogTriggers = async (logId) => {
//           // Create array of promises for triggers that need to be added to log
//         const addedTriggers = await selectedTriggers
//          // Filter out triggers that were on the log and will remain on the log after update
//             .filter((trigger) => !logObj?.triggers?.some((logTrigger) => logTrigger.id === trigger.value))
//             .map((trigger) => {
//                 // If trigger.value is of type string, then trigger does not yet exist and needs to be created
//                 // before adding it to the log
//                 if (typeof trigger.value === 'string') {
//                     return createTrigger({name: trigger.name}).then(({id}) => addSymptomTrigger({uid: user.uid, severityAverage: formInput.severity, id}))
//                 }
//                 // Otherwise, trigger.value is an int corresponding to the triggerId in the db
//                 // and only a call to add the SymptomTrigger is necessary
//                 return addSymptomTrigger({uid: user.uid, severityAverage: formInput.severity, id: trigger.value})
//                 // If no SymptomTriggers need to be added, set addedTriggers to an empty array (rather than undefined)
//             }) || [];

//             await Promise.all([...addedTags]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         createSymptomLog({
//             ...formData,
//             uid: user.id,
//         }).then(({ id }) => {
//             managePostTags({uid: user.uid, severityAverage: formInput.severity, id: id}).then(() => router.push(`/posts/${id}`));
//         });
//     }

//         useEffect(() => {
//             getTriggers();
//         }, [user.uid]);

//   return (
//     <Form onSubmit={handleSubmit} className="mt-7 w-[80%] ml-auto mr-auto">

//         <CreatableSelect
//         instanceId="tagSelect"
//         aria-label="Triggers"
//         name="triggers"
//         className="mb-3"
//         placeholder="Select or Create a Trigger..."
//         value={selectedTriggers}
//         isMulti
//         onChange={handleTriggerChange}
//         options={triggers.map((trigger) => ({ value: trigger.id, name: trigger.name }))}
//     />

//     <button variant="primary" type="submit"> Log a Symptom
//     </button>
//     </Form>
//   )
// }
