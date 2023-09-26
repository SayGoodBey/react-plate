import { plateUI } from '@/common/plateUI';
import {
  Plate,
  PlateProvider,
  createPlateEditor,
  createPluginFactory,
  createPlugins,
  deserializeHtml,
  parseHtmlDocument,
  usePlateActions,
  usePlateSelectors,
} from '@udecode/plate-common';
import { Children, useEffect, useMemo, useRef, useState } from 'react';

import { orderByPoint, isMinPoint } from '@/utils';
import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { ReactEditor } from 'slate-react';

import { Path, Node } from 'slate';

interface ResetPluginsEffectProps {
  initialValue: any;
  plugins: any;
}

const ResetPluginsEffect = ({ initialValue, plugins }: ResetPluginsEffectProps) => {
  const editor = usePlateSelectors().editor();
  const setEditor = usePlateActions().editor();
  const setValue = usePlateActions().value();

  useEffect(() => {
    if (initialValue) {
      const document = parseHtmlDocument(initialValue);
      const fragment = deserializeHtml(editor, { element: document.body });
      // console.log('fragment---', fragment);
      const newEditor = createPlateEditor({ id: editor.id, plugins });
      // console.log(' editor.children---', editor.children);
      newEditor.children = fragment ?? editor.children;
      setValue(fragment);
      setEditor(newEditor);
    }
  }, [plugins, setEditor, editor.id, initialValue, setValue]);

  return null;
};
//  editableProps
const editableProps = {
  placeholder: 'Type...',
};
const ELEMENT_DIV = 'div';
const EeoEditor = () => {
  //'<div id="1"><em><span>1234</span>567</em>999</div><div id="2">哈哈哈啊哈222</div>',
  //,
  const [initialValue, setInitialValue] = useState(
    '<p class="qt_default 333">2020-2021学年江西省南昌市红谷滩区凤凰城上海外国语学校七年级(下)期末数学复习试卷(2)</p><p class="qt_default">试题数:20,总分:0</p><div class="question" data-type="1"data-uuid="9087800690433707-1694501106343-2"><div class="questionWraper"><p class="qt_title"><span class="title">1.</span><span class="content">(单选题,0分)下列采用的调查方式正确的是(  )</span></p><p class="key key_A"><span class="title">A.</span><span class="content">某企业招聘,对应聘人员的面试,适合采用抽样调查</span></p><p class="key key_B"><span class="title">B.</span><span class="content">为了解全班同学每周体育锻炼的时间,适合采用抽样调查</span></p><p class="key key_C"><span class="title">C.</span><span class="content">为了解某市初二年级学生每天完成作业的用时量,适合采用普查</span></p><p class="key key_D"><span class="title">D.</span><span class="content">神舟十二号飞船发射前,工作人员对其各个零部件安全情况的检查,适合采用普查</span></p></div></div><p class="qt_split"></p><div class="question" data-type="1"data-uuid="9087800690433707-1694501106343-3"><div class="questionWraper"><p class="qt_title"><span class="title">2.</span><span class="content">(单选题,0分)下列采用的调查方式正确的是(  )</span></p><p class="key key_A"><span class="title">A.</span><span class="content">某企业招聘,对应聘人员的面试,适合采用抽样调查</span></p><p class="key key_B"><span class="title">B.</span><span class="content">为了解全班同学每周体育锻炼的时间,适合采用抽样调查</span></p><p class="key key_C"><span class="title">C.</span><span class="content">为了解某市初二年级学生每天完成作业的用时量,适合采用普查</span></p><p class="key key_D"><span class="title">D.</span><span class="content">神舟十二号飞船发射前,工作人员对其各个零部件安全情况的检查,适合采用普查</span></p></div></div><p class="qt_split"></p><div class="question" data-type="1"data-uuid="9087800690433707-1694501106343-4"><div class="questionWraper"><p class="qt_title"><span class="title">3.</span><span class="content">(单选题,0分)下列采用的调查方式正确的是(  )</span></p><p class="key key_A"><span class="title">A.</span><span class="content">某企业招聘,对应聘人员的面试,适合采用抽样调查</span></p><p class="key key_B"><span class="title">B.</span><span class="content">为了解全班同学每周体育锻炼的时间,适合采用抽样调查</span></p><p class="key key_C"><span class="title">C.</span><span class="content">为了解某市初二年级学生每天完成作业的用时量,适合采用普查</span></p><p class="key key_D"><span class="title">D.</span><span class="content">神舟十二号飞船发射前,工作人员对其各个零部件安全情况的检查,适合采用普查</span></p></div></div><p class="qt_split"></p><div class="question" data-type="1"data-uuid="9087800690433707-1694501106343-8"><div class="questionWraper"><p class="qt_title"><span class="title">4.</span><span class="content">(单选题,0分)下列采用的调查方式正确的是444444(  )</span></p><p class="key key_A"><span class="title">A.</span><span class="content">某企业招聘,对应聘人员的面试,适合采用抽样调查</span></p><p class="key key_B"><span class="title">B.</span><span class="content">为了解全班同学每周体育锻炼的时间,适合采用抽样调查</span></p><p class="key key_C"><span class="title">C.</span><span class="content">为了解某市初二年级学生每天完成作业的用时量,适合采用普查</span></p><p class="key key_D"><span class="title">D.</span><span class="content">神舟十二号飞船发射前,工作人员对其各个零部件安全情况的检查,适合采用普查</span></p></div></div>',
  );
  const editorRef = useRef();

  const onChangeData = (v) => {
    // console.log('change--', v);
  };

  const plugins = useMemo(
    () =>
      createPlugins(
        [
          createPluginFactory({
            key: ELEMENT_DIV,
            isElement: true,
            deserializeHtml: {
              rules: [
                {
                  validNodeName: 'DIV',
                },
              ],
              getNode(el, node) {
                const attributeNames = el.getAttributeNames();
                const attributes = attributeNames.reduce((acc: any, name: string) => {
                  acc[name] = el.getAttribute(name);
                  return acc;
                }, {});
                return { attributes, className: el.className, type: el.nodeName.toLowerCase() };
              },
            },
          })(),
          createPluginFactory({
            key: 'span',
            isElement: true,
            isInline: true,
            deserializeHtml: {
              rules: [
                {
                  validNodeName: 'SPAN',
                },
              ],
              getNode(el, node) {
                const attributeNames = el.getAttributeNames();
                const attributes = attributeNames.reduce((acc: any, name: string) => {
                  acc[name] = el.getAttribute(name);
                  return acc;
                }, {});
                return { attributes, className: el.className, type: el.nodeName.toLowerCase() };
              },
            },
          })(),
          createPluginFactory({
            key: 'em',
            isElement: true,
            isInline: true,
            deserializeHtml: {
              rules: [
                {
                  validNodeName: 'EM',
                },
              ],
              getNode(el, node) {
                const attributeNames = el.getAttributeNames();
                const attributes = attributeNames.reduce((acc: any, name: string) => {
                  acc[name] = el.getAttribute(name);
                  return acc;
                }, {});
                return { attributes, className: el.className, type: el.nodeName.toLowerCase() };
              },
            },
          })(),
          createParagraphPlugin({
            deserializeHtml: {
              isElement: true,
              getNode(el, node) {
                const attributeNames = el.getAttributeNames();
                const attributes = attributeNames.reduce((acc: any, name: string) => {
                  acc[name] = el.getAttribute(name);
                  return acc;
                }, {});
                return { attributes, className: el.className, type: el.nodeName.toLowerCase() };
              },
            },
          }),
        ],
        { components: plateUI },
      ),
    [],
  );

  const handleChange = () => {
    // setInitialValue('<div><p>哈哈哈<em>999</em></p></div>');
    // setInitialValue('<span>123</span>');
  };

  const handleMoveNode = () => {
    editorRef.current.moveNodes({
      // at: [0],
      to: [0],
    });
    console.log('editor', editorRef.current.children);
  };

  const handleLiftNodes = () => {
    editorRef.current.liftNodes({ at: [0, 0, 0], mode: 'lowest' });
  };

  const handleSplitNodes = () => {
    editorRef.current.splitNodes();
    // editorRef.current.splitNodes();
  };

  const handleGetSection = () => {
    console.log('editorRef.current--', editorRef.current);
    const selection = editorRef.current.selection;
    const anchor = selection.anchor;
    const focus = selection.focus;
    console.log('selection---', selection);
    console.log('anchor---', anchor);
    console.log('focus---', focus);
  };

  // 两端拆分节点 拆分 跨块元素 1. 需要把切分的元素移动到顶层，2. 选中的是完整的同级，需要去掉包裹元素
  const handlePatch = () => {
    const selection = editorRef.current.selection;
    const anchor = selection.anchor;
    const focus = selection.focus;

    const [minPoint, maxPoint] = orderByPoint(anchor, focus);

    editorRef.current.splitNodes({ at: maxPoint });
    editorRef.current.splitNodes({ at: minPoint });
    console.log('editorRef-children---', editorRef.current.children);
  };

  const handleMovePatch = () => {
    const selection = editorRef.current.selection;
    const anchor = selection.anchor;
    const focus = selection.focus;

    const [minPoint, maxPoint] = orderByPoint(anchor, focus);

    console.log('minPoint.path[0]---', minPoint.path[0]);
    console.log('maxPoint.path[0]---', maxPoint.path[0]);
    editorRef.current.insertNodes(
      {
        type: 'div',
        className: 'split_wrap',
        children: [{ text: '' }],
      },
      { at: [maxPoint.path[0] + 1] },
    );
    //移动的时候先移动到maxPoint
    editorRef.current.moveNodes({
      to: [maxPoint.path[0] + 1, 0],
    });
    editorRef.current.moveNodes({
      at: [maxPoint.path[0]],
      to: [maxPoint.path[0] - 1],
    });
    // 根据path
    console.log('editorRef-children---', editorRef.current.children);
  };

  const isNewOperate = useRef(false);
  const minMaxPoint = useRef([]);
  const handleSplitMovePatch = () => {
    minMaxPoint.current = getMinMaxPoint();
    isNewOperate.current = true;
    // 第一步 拆分
    splitBySection();
    // 第二步 插入新节点
    insertNewQuestionWrap();

    // // 第四步 移动之前先删除掉空question元素
    deleteEmptyQuestion();
    // return;
    // 第三步 移除newQuestion 里面的split元素
    removeSplitInQuestion();

    // 第五步 判断是否移动 移动新试题到正确位置 minPoint + 1

    handleMove();
    // 第六步 后面指针没有选择完剩余部分处理
    handleSplitResidue();

    // 第七步 判断新试题前后如果是试题插入分割元素
    handleQuestionSplitNodes();
  };

  const handleQuestionSplitNodes = () => {
    const insertPathArr = [];
    editorRef.current.children.forEach((node, index) => {
      // console.log('node.path---', node.path);
      const currentIsQuestion = node.className?.split(' ')?.includes('question');
      const nextNodeIsQuestion = editorRef.current.children[index + 1]?.className?.split(' ')?.includes('question');
      if (currentIsQuestion && nextNodeIsQuestion) {
        insertPathArr.push([index]);
      }
    });
    insertPathArr.reverse().forEach((insertPath) => {
      editorRef.current.insertNodes(
        {
          type: 'p',
          className: 'qt_split',
          children: [{ text: '' }],
        },
        { at: [+insertPath + 1] },
      );
    });
  };

  // 有剩余部分，处理后面剩余部分
  const handleSplitResidue = () => {
    const { isCrossQuestion, nextHasContentWithoutSection, maxPoint, newAnchor, endMaxPoint, minPoint } =
      getDataCache();
    if (isCrossQuestion && nextHasContentWithoutSection) {
      const maxQuestionPath = [minPoint.path[0] + 2];
      unwrapQuestion(maxQuestionPath);
    }

    // 没有跨问题 后面还有内容的 把后面内容移出去
    if (!isCrossQuestion && nextHasContentWithoutSection) {
      editorRef.current.setSelection({
        anchor: newAnchor,
        focus: endMaxPoint,
      });
      editorRef.current.moveNodes({
        to: [+minPoint.path[0] + 2],
      });
    }
  };

  const removeSplitInQuestion = () => {
    // 综合题此处需要传试题路径
    // 跟据path 获取选区的node 1. remove掉split元素节点
    const { isCrossQuestion } = getDataCache();
    if (isCrossQuestion) {
      editorRef.current.removeNodes({
        at: [],
        match: (n, path) => {
          return (
            path.length >= 3 &&
            isElementNodeByClass(n, 'qt_split') &&
            isElementNodeByClass(getParentNode(path), 'questionWraper')
          );
        },
        mode: 'all',
      });
    }
  };

  // 处理新的试题到正确位置
  const handleMove = () => {
    const { minPoint, prevHasContentWithoutSection, nextHasContentWithoutSection, isCrossQuestion } = getDataCache();

    // 选区后有剩余部分，并且是跨题的需要移动
    if (prevHasContentWithoutSection && nextHasContentWithoutSection && isCrossQuestion) {
      editorRef.current.moveNodes({
        at: [+minPoint.path[0] + 1],
        to: [+minPoint.path[0] + 2],
      });
      return;
    }
    if (!prevHasContentWithoutSection && nextHasContentWithoutSection && isCrossQuestion) {
      editorRef.current.moveNodes({
        at: [+minPoint.path[0]],
        to: [+minPoint.path[0] + 1],
      });
    }
  };

  const getDataCache = (() => {
    let res;
    return () => {
      console.log('isNewOperate.current---', isNewOperate.current);
      if (isNewOperate.current) {
        res = getData();
        isNewOperate.current = false;
      }
      return { ...res };
    };
  })();
  const getMinMaxPoint = () => {
    const selection = editorRef.current.selection;
    const anchor = selection.anchor;
    const focus = selection.focus;
    console.log('anchor---focus', anchor, focus);
    let [minPoint, maxPoint] = [anchor, focus].sort((a, b) => (isMinPoint(a, b) ? -1 : 1));

    // 调整用户选择锚点位置，锚点位置在split 元素上 前后锚点位置不一样，前后锚点可能落在split元素上了，修正到最近的question上
    const minNode = editorRef.current.node([minPoint.path[0]]);
    const maxNode = editorRef.current.node([maxPoint.path[0]]);

    // min point 在元素上 ++
    if (isElementNodeByClass(minNode, 'qt_split')) {
      const firstChild = editorRef.current.first([+minPoint.path[0] + 1]);
      minPoint = {
        path: firstChild[1],
        offset: 0,
      };
    }
    console.log(`isElementNodeByClass(minNode, 'qt_split')-- ${isElementNodeByClass(minNode, 'qt_split')}`);
    console.log(`isElementNodeByClass(maxNode, 'qt_split')-- ${isElementNodeByClass(maxNode, 'qt_split')}`);
    if (isElementNodeByClass(maxNode, 'qt_split')) {
      const lastChild = editorRef.current.last([maxPoint.path[0] - 1]);
      const lastChildOffset = lastChild[0].text.length;
      maxPoint = {
        path: lastChild[1],
        offset: lastChildOffset,
      };
    }

    return [minPoint, maxPoint];
  };
  // 选区前还有内容
  const getData = () => {
    const [minPoint, maxPoint] = minMaxPoint.current;
    // 在同一个题内
    const isCrossQuestion = minPoint.path[0] !== maxPoint.path[0];

    //是否跨多个问题 1，-----，5
    const isCrossMultiQuestion = maxPoint.path[0] - minPoint.path[0] > 1;

    // 判断除选区外，前后受影响的试题是否还有内容， 比较锚点跟各自试题最后锚点位置，min start>split |  max:split<end 证明还有剩余试题内容
    const firstChild = editorRef.current.first([minPoint.path[0]]);
    const startMinPoint = {
      path: firstChild[1],
      offset: 0,
    };
    // 获取大的锚点最后一个子节点path
    const lastChild = editorRef.current.last([maxPoint.path[0]]);
    const lastChildOffset = lastChild[0].text.length;
    const endMaxPoint = {
      path: lastChild[1],
      offset: lastChildOffset,
    };
    const prevHasContentWithoutSection = isMinPoint(startMinPoint, minPoint); // 选区前还有内容，没截全
    const nextHasContentWithoutSection = isMinPoint(maxPoint, endMaxPoint); // 选区后还有内容，没截全

    // split拆分后 选择的选区
    const newMinSelectPath = minPoint.offset > 0 ? getNextPath(minPoint.path) : minPoint;
    // 开始节点text 切割后，结束锚点位置也要+1
    const newMaxSelectPath =
      minPoint.offset > 0 && !isCrossQuestion && isExistPath(getNextPath(maxPoint.path))
        ? getNextPath(maxPoint.path)
        : maxPoint;
    // 拆分后开始锚点
    const newAnchor = editorRef.current.start(newMinSelectPath);
    //拆分后结束锚点
    const newFocus = editorRef.current.end(newMaxSelectPath);

    return {
      minPoint,
      maxPoint,
      prevHasContentWithoutSection,
      nextHasContentWithoutSection,
      newAnchor,
      newFocus,
      isCrossQuestion,
      isCrossMultiQuestion,
      endMaxPoint,
    };
  };

  // 是否是指定元素
  const isElementNodeByClass = (node: any, className: string) => {
    return Boolean(node?.['className']?.split(' ')?.includes(className));
  };

  // 新增一个空的question wrap,并把选中的内容移入新增容器，为了不影响path操作,新增的容器在maxPath +1 位置
  const insertNewQuestionWrap = () => {
    const { newAnchor, newFocus, maxPoint } = getDataCache();
    editorRef.current.insertNodes(
      {
        type: 'div',
        className: 'split_wrap question',
        children: [{ type: 'div', className: 'questionWraper', children: [{ text: '' }] }],
      },
      { at: [+maxPoint.path[0] + 1] },
    );
    editorRef.current.setSelection({
      anchor: newAnchor,
      focus: newFocus,
    });
    console.log('newAnchor--', newAnchor, 'newFocus==', newFocus, 'maxPoint====', maxPoint);
    //移动的时候先移动到maxPoint 保证path 不变
    editorRef.current.moveNodes({
      to: [+maxPoint.path[0] + 1, 0, 0],
    });
  };

  // 删除空的question
  const deleteEmptyQuestion = () => {
    // console.log('deleteEmptyQuestion');
    const match = (n) => {
      const result =
        n.className?.split(' ')?.includes('question') &&
        n.children?.[0]?.className?.split(' ')?.includes('questionWraper') &&
        Node.string(n).length <= 0;

      if (result) {
        console.log(`%c:n-----${n}`, 'color:red');
      }
      return result;
    };
    editorRef.current.removeNodes({
      at: [],
      match: match,
      mode: 'all',
    });
  };

  // 按照选区两个端点拆分节点
  const splitBySection = () => {
    const [minPoint, maxPoint] = minMaxPoint.current;
    editorRef.current.splitNodes({ at: maxPoint });
    editorRef.current.splitNodes({ at: minPoint });
  };

  // 获取下一个有效试题子元素path
  const getNextPath = (path: Path) => {
    return Path.next(Path.parent(Path.parent(path)));
  };

  // 判断path 是否存在
  const isExistPath = (path: Path) => {
    console.log('editorRef.current.hasPath(path)---', editorRef.current.hasPath(path));
    return editorRef.current.hasPath(path);
  };

  //把一个question的children 全部提到指定位置
  const unwrapQuestion = (insertPath) => {
    const questionNode = editorRef.current.node(insertPath);
    console.log('questionNode-', questionNode);
    const handleNodes = questionNode[0].children[0].children?.reverse();

    // 移除试题
    editorRef.current.removeNodes({ at: insertPath });

    handleNodes?.forEach((node) => {
      editorRef.current.insertNodes(node, { at: insertPath });
    });
  };

  //根据node 节点 获取父节点
  const getParentNode = (path) => {
    const parentPath = path.slice(0, -1);
    return editorRef.current.node(parentPath)[0];
  };

  const handleUnwrapNodes = () => {
    editorRef.current.unwrapNodes({ split: true });
  };
  return (
    <div className="app">
      <PlateProvider onChange={onChangeData} plugins={plugins} editorRef={editorRef}>
        <Plate editableProps={editableProps} />
        <ResetPluginsEffect initialValue={initialValue} plugins={plugins} />
      </PlateProvider>

      <button onClick={handleChange}>切换initialValue</button>
      <button onClick={handleMoveNode}>moveNode</button>
      <button onClick={handleLiftNodes}>liftNodes</button>
      <button onClick={handleSplitNodes}>splitNodes</button>
      <button onClick={handleGetSection}>getSection</button>
      <button onClick={handlePatch}>多次同步操作拆分</button>
      <button onClick={handleMovePatch}>move 拆分</button>
      <button onClick={handleSplitMovePatch}>split move 拆分</button>
      <button onClick={handleUnwrapNodes}>unwrapNodes</button>
    </div>
  );
};

export default EeoEditor;
