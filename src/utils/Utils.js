const Utils = () => {
    const insertComment = function (tree, commentId, item) {
      if (tree.id === commentId) {
        tree.items.push({
          id: new Date().getTime(),
          name: item,
          items: [],
        });
  
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertComment(ob, commentId, item);
      });
  
      return { ...tree, items: latestNode };
    };
  
    const editComment = (tree, commentId, value) => {
      if (tree.id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob) => {
        return editComment(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteComment = (tree, id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem.id === id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
            deleteComment(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertComment, editComment, deleteComment };
  };
  
  export default Utils;