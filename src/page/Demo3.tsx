import { Plate } from '@udecode/plate-common';
import { useState } from 'react';

const editableProps = {
  placeholder: 'Type...',
};

// initialValue
const initialValue = [
  {
    type: 'p',
    children: [
      {
        text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
      },
    ],
  },
];

const EeoEditor = () => {
  const [debugValue, setDebugValue] = useState(null);

  // 此处nv 的类型怎么定义呢?
  const handleChange = (nv) => {
    setDebugValue(nv);
  };
  return (
    <div className="app">
      <Plate editableProps={editableProps} initialValue={initialValue} onChange={handleChange}>
        debug value:
        <br />
        {JSON.stringify(debugValue)}
      </Plate>
    </div>
  );
};

export default EeoEditor;
