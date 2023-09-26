import React, { useState } from 'react';

// 支持加粗
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import { createCodeBlockPlugin } from '@udecode/plate-code-block';
import { Plate, createPlugins } from '@udecode/plate-common';
import { createHeadingPlugin } from '@udecode/plate-heading';
import { createParagraphPlugin } from '@udecode/plate-paragraph';

import { basicEditorValue } from '@/example';

import { createPlateUI } from '@/example/createUI';

const editableProps = {
  placeholder: 'Type...',
};

// plate 默认只会准换标签 并没有样式
const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),

    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
  ],
  {
    components: createPlateUI(),
  },
);

export default function BasicPluginsDefaultDemo() {
  const [debugValue, setDebugValue] = useState(null);

  return (
    <Plate
      editableProps={editableProps}
      initialValue={basicEditorValue}
      plugins={plugins}
      onChange={(newValue) => {
        setDebugValue(newValue);
        // save newValue...
      }}
    >
      debug value:
      <br />
      {JSON.stringify(debugValue)}
    </Plate>
  );
}
