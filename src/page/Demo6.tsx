//测试拖拽

import { useState } from 'react';
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

// 拖拽
import { createDndPlugin, DndProvider } from '@udecode/plate-dnd';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { withDraggables } from '@/components/drag/withDraggable';

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
    createNodeIdPlugin(),
    createDndPlugin(),
  ],
  {
    components: withDraggablecreatePlateUI(),
  },
);

export default function BasicPluginsDefaultDemo() {
  const [debugValue, setDebugValue] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}
