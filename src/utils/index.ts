import { FC } from 'react';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { createNodesWithHOC } from '@udecode/plate-common';
import { WithDraggableOptions, withDraggable as withDraggablePrimitive } from '@udecode/plate-dnd';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

// import { Draggable, DraggableProps } from './draggable';

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<Partial<Omit<DraggableProps, 'editor' | 'element' | 'children'>>>,
) => withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any);

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: any) => {
  return withDraggablesPrimitive(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      key: ELEMENT_H1,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-1 text-[1.875em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      key: ELEMENT_H2,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-1 text-[1.5em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      key: ELEMENT_H3,
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[2px] px-0 pb-1 text-[1.25em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      keys: [ELEMENT_H4, ELEMENT_H5],
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0 text-[1.1em]',
          blockToolbarWrapper: 'h-[1.3em]',
        },
      },
    },
    {
      keys: [ELEMENT_PARAGRAPH],
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0',
        },
      },
    },
    {
      keys: [ELEMENT_H6, ELEMENT_UL, ELEMENT_OL],
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
    },
    {
      key: ELEMENT_CODE_BLOCK,
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-8 px-0 pb-0',
        },
      },
    },
  ]);
};

// 连字符中划线转小驼峰
function kebabToCamel(str: string) {
  return str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
}
export function styleStringToObject(styleString: string) {
  const styleObj: Record<string, string> = {};

  // 将样式字符串切割为数组
  const styles = styleString.split(';');

  // 遍历数组,获取样式键值对
  styles.forEach((style) => {
    // 去掉空格
    const trimmed = style.trim();

    // 分割关键字和值
    const [key, value] = trimmed.split(':');

    // 赋值到对象
    styleObj[kebabToCamel(key)] = value;
  });

  return styleObj;
}

interface Point {
  path: number[];
  offset: number;
}

const isEqual = (arr1: number[], arr2: number[]) => {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
};

export function orderByPoint(point1: Point, point2: Point) {
  if (isEqual(point1.path, point2.path)) {
    return point1.offset < point2.offset ? [point1, point2] : [point2, point1];
  }

  const len = Math.min(point1.path.length, point2.path.length);
  for (let i = 0; i < len; i++) {
    if (point1.path[i] < point2.path[i]) {
      return [point1, point2];
    } else if (point1.path[i] > point2.path[i]) {
      return [point2, point1];
    }
  }

  return point1.path.length < point2.path.length ? [point1, point2] : [point2, point1];
}

//point1 在 point2之前
export function isMinPoint(point1: Point, point2: Point) {
  if (isEqual(point1.path, point2.path)) {
    return point1.offset < point2.offset ? true : false;
  }

  const len = Math.min(point1.path.length, point2.path.length);
  for (let i = 0; i < len; i++) {
    if (point1.path[i] < point2.path[i]) {
      return true;
    } else if (point1.path[i] > point2.path[i]) {
      return false;
    }
  }

  return point1.path.length < point2.path.length ? true : false;
}

//正序排序
export function sortPoint(point1: Point, point2: Point) {
  return isMinPoint(point1, point2) ? -1 : 1;
}
