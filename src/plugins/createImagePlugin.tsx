import { createPluginFactory } from '@udecode/plate-common';

export const ELEMENT_IMAGE = 'img';

/**
 * Enables support for images.
 */
export const createImagePlugin = createPluginFactory({
  key: ELEMENT_IMAGE,
  isElement: true,
  isInline: true,
  isVoid: true,
  // withOverrides: (editor) => {
  //   // const { } =
  // },
  handlers: {
    onPaste: (editor) => (event) => {
      console.log('event-----', event.clipboardData.files);
      console.log('onPaste-----');

      editor.insertNode({
        type: ELEMENT_IMAGE,
        url: 'https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641',
        children: [{ text: '' }],
      });
    },
  },
  // then: (editor, { type }) => ({
  //   deserializeHtml: {
  //     rules: [
  //       {
  //         validNodeName: 'IMG',
  //       },
  //     ],
  //     getNode: (el) => ({
  //       type,
  //       url: el.getAttribute('src'),
  //     }),
  //   },
  // }),
});
