// import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
// import { ELEMENT_IMAGE } from '@udecode/plate-media';
// import ParagraphElement from '../components/ParagraphElement/Index';
// import ImageElement from '../components/ImageElement';
import { styleStringToObject } from '@/utils';
const BlockElement = (props: any) => {
  const { attributes, nodeProps = {}, children, element } = props;
  const elementAttr = Object.entries(element).reduce((acc, [key, value]) => {
    if (key.startsWith('data-')) {
      return { ...acc, [key]: value };
    }
    return acc;
  }, {});
  // 需要重新整理className, nodeProps里面class 属性报错
  const { class: nodePropsClass = '', style: nodePropsStyle = '', ...restNodeProps } = nodeProps;
  const reactStyle = styleStringToObject(nodePropsStyle);
  const disposalClassName = Array.from(new Set([element.className, nodePropsClass, props.className])).join(' ');

  const Wrap = element.type;
  // 梳理一下这几个属性的关系
  return (
    <Wrap {...attributes} {...elementAttr} {...restNodeProps} className={disposalClassName} style={reactStyle}>
      {children}
    </Wrap>
  );
};

export const plateUI = {
  // [ELEMENT_PARAGRAPH]: ParagraphElement,
  // [ELEMENT_IMAGE]: ImageElement,
  ['div']: BlockElement,
  ['span']: BlockElement,
  ['em']: BlockElement,
  ['p']: BlockElement,
};
