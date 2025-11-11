// 过滤公用节点
const three = (data: any[]) => {
  const arr: object[] = [];
  data.forEach((item) => {
    const threeData = { ...item?.self, disabled: false };
    if (item.children) threeData.children = three(item.children);
    // @ts-ignore
    arr.push(threeData);
  });
  return arr;
};

/**
 * 自定义处理树方法
 * @param r
 * @param handleRoute
 */
const customTree = (r, handleRoute) => {
  const arr = [];
  r.forEach((item) => {
    const _a = { ...item };
    if (item.children) {
      _a.children = customTree(item.children, handleRoute); // 更新子路由
    }
    //@ts-ignore
    arr.push({
      ..._a,
      ...handleRoute(item),
    });
  });
  return arr;
};

// 关闭子节点
const closeSon = (threeData: any[]) => {
  if (threeData) {
    threeData.forEach((item) => {
      if (!item.children) item.disabled = true;
      closeSon(item.children);
    });
  }
};

// 关闭父节点
const closeParent = (threeData: any[]) => {
  threeData.forEach((item) => {
    if (item.children) {
      item.disabled = true;
      closeParent(item.children);
    }
  });
};

// 树节搜索
const searchTree = (data: any[], keyword: object, name = 'name') => {
  let results = [];
  data.forEach(function (item) {
    if (item[name]?.includes(keyword)) {
      // @ts-ignore
      results.push(item);
    }
    if (item.children && item.children.length > 0) {
      const childResults = searchTree(item.children, keyword, name);
      results = results.concat(childResults);
    }
  });
  return results;
};

/**
 * 遍历出正确的数据格式
 * @param data
 * @param children
 * @param name
 * @param id
 */
const threeData = (data, children, name, id) => {
  // 遍历根节点
  for (const node of data) {
    handleNode(node, children, name, id);
  }
  return data;
};

// 遍历
function handleNode(node, children, name, id) {
  // 将所有 替换成 children
  if (node[children]) {
    node.children = node[children];
    delete node[children];
    for (const childNode of node.children) {
      handleNode(childNode, children, name, id);
    }
  }

  // 将所有替换成 name
  if (node[name]) {
    node.name = node[name];
  }

  // 重复遍历所有
  node.key = node[id] || node.id;
  if (node.children) {
    node.key = node[id] || node.id;
    for (const childNode of node.children) {
      handleNode(childNode, children, name, id);
    }
  }
}

/**
 * 根据树节点id查到节点
 * @param three
 * @param id
 */
/*const getNodeById = (three, id) => {
  const arr = Array.isArray(three) ? three : [three];
  let result = [];
  while (arr.length) {
    const item = arr.pop();
    if (item && item.id === id) {
      result = item;
      break;
    } else if (item && item.children && item.children.length) {
      arr.push(...item.children);
    }
  }
  return result;
};*/

const getNodeById = (tree, id) => {
  // 创建树的副本数组
  const arr = Array.isArray(tree) ? [...tree] : [tree];
  let result = null;

  while (arr.length) {
    const item = arr.pop();

    if (item && typeof item === 'object') {
      if (item.id === id) {
        result = item;
        break;
      } else if (Array.isArray(item.children)) {
        arr.push(...item.children);
      }
    }
  }
  return result;
};

// 搜索并且返回父节点
const searchField = (nodes, query) => {
  const results: any = [];
  nodes.forEach((node) => {
    // 如果节点标题包含搜索关键词，添加该父节点（包括其子节点）
    if (node.title.includes(query)) {
      // 创建一个副本，防止直接修改原始数据
      const nodeCopy = { ...node };
      results.push(nodeCopy);
    }

    // 递归搜索子节点
    if (node.children) {
      const childResults = searchField(node.children, query);
      if (childResults.length > 0) {
        // 如果子节点中有匹配项，将父节点和子节点一起加入结果
        const nodeCopy = { ...node, children: childResults };
        results.push(nodeCopy);
      }
    }
  });

  return results;
};

const generateTree = (data) => {
  const tree: any = [];
  data.forEach((item, index) => {
    const unitNode: any = {
      ...item,
      name: item.unit,
      title: item.unit,
      disabled: false,
      _child: `parent-${index}`,
      children: [],
    };
    item.unitPersons.forEach((person) => {
      const personNode: any = {
        ...person,
        name: person.psnName,
        title: person.psnName,
        _child: person.psnSid,
      };
      unitNode.children.push(personNode);
    });
    tree.push(unitNode);
  });
  return tree;
};

// 树数据扁平化
const flattenTreeWithLevel = (tree, key = 'children', level = 0) => {
  return tree.reduce((acc, node) => {
    acc.push({ ...node, level });
    if (node[key] && node[key].length) {
      acc.push(...flattenTreeWithLevel(node[key], key, level + 1));
    }
    return acc;
  }, []);
};

function findNodeByTitle(tree: any[], keyword: any): any[] {
  const result: any[] = [];
  for (const node of tree) {
    // 递归搜索子节点 @ts-ignore
    const filteredChildren = node.children ? searchTree(node.children, keyword) : [];
    // 如果当前节点匹配，或者它的子节点中有匹配
    if (node.title.includes(keyword) || filteredChildren.length > 0) {
      result.push({
        ...node,
        children: filteredChildren, // 只保留匹配项及其相关的子树
      });
    }
  }
  return result;
}

export {
  three,
  closeSon,
  closeParent,
  searchTree,
  threeData,
  getNodeById,
  customTree,
  searchField,
  generateTree,
  flattenTreeWithLevel,
  findNodeByTitle,
};
