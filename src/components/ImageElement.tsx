import React from 'react';
type ImageElementProps = { element: any; children: any; attributes: any };
const ImageElement: React.FC<ImageElementProps> = (props: ImageElementProps) => {
  console.log('props---', props);
  // 'https://wsevlt001.eeo.im'
  const { attributes, children, element } = props;
  console.log('props--------', props);
  return (
    <span {...attributes}>
      {children}
      <img width={50} src={element.url} alt="图片缺少host" />
    </span>
  );
};

export default ImageElement;
