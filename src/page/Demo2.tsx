import { Plate } from '@udecode/plate-common';

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
  return (
    <div className="app">
      <Plate editableProps={editableProps} />
    </div>
  );
};

export default EeoEditor;
