// import { Plate, PlateProvider } from '@udecode/plate-common';
// import { createCaptionPlugin } from '@udecode/plate-caption';
// import { createImagePlugin, createMediaEmbedPlugin, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
// import { createSelectOnBackspacePlugin } from '@udecode/plate-select';

// //  editableProps
// const editableProps = {
//   placeholder: 'Type...',
// };

// const EeoEditor = () => {
//   const plugins = [
//     // ...otherPlugins,
//     createCaptionPlugin({ options: { pluginKeys: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] } }),
//     createImagePlugin(),
//     createMediaEmbedPlugin(),
//     createSelectOnBackspacePlugin({
//       options: {
//         query: {
//           allow: [ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED],
//         },
//       },
//     }),
//   ];
//   return (
//     <div className="app">
//       <PlateProvider plugins={plugins}>
//         <Plate editableProps={editableProps} />
//       </PlateProvider>
//     </div>
//   );
// };

// export default EeoEditor;

import { Plate, createPlugins } from '@udecode/plate-common';
import { createImagePlugin } from '../plugins/createImagePlugin';
import { plateUI } from '../common/plateUI';

//  editableProps
const editableProps = {
  placeholder: 'Type...',
};

const EeoEditor = () => {
  const plugins = createPlugins([createImagePlugin()], { components: plateUI });
  return (
    <div className="app">
      <Plate editableProps={editableProps} plugins={plugins} />
    </div>
  );
};

export default EeoEditor;
