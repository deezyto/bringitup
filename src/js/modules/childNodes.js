export function createArrChildNodes(parentSelector) {

    //console.log(parentSelector.childNodes);
    const childNodesArray = [];

    for (let elem of parentSelector.childNodes) {
        if (elem.nodeName === '#text' || elem.nodeName === 'BUTTON') {
            continue;
        }
        //замінимо пробіли на точки
        let replaceSpace = elem.className.replace(/ /g, '.');
        childNodesArray.push(replaceSpace);
    }

    return childNodesArray;
}