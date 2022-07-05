
//create child nodes for parent element (array)
export function createArrChildNodes(parentSelector) {

  const childNodesArray = [];

  for (let elem of parentSelector.childNodes) {
    if (elem.nodeName === '#text' || elem.nodeName === 'BUTTON') {
        continue;
    }

    let replaceSpace = elem.className.replace(/ /g, '.');
    childNodesArray.push(replaceSpace);
  }

  return childNodesArray;
}