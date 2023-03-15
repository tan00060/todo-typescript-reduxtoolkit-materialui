interface todoArray {
  dateCreated: string;
  id: string;
  name: string;
  status: boolean;
}

export const getSessionStorageTodoList = () => {
  let storageItem = localStorage.getItem("todoList");
  if (storageItem !== null) {
    const returnItem = JSON.parse(storageItem);
    return returnItem;
  }
  return [];
};
