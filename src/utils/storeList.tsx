export const storeList = (list: Object) => {
  let stringItem = JSON.stringify(list);
  localStorage.setItem("todoList", stringItem);
};
