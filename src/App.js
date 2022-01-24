import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import UseStateHook from "./UseStateHook";
import SearchItem from "./SearchItem";

import { useState } from "react";
import AddItem from "./AddItem";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList"))
  );

  // console.log(items);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    console.log("addItem", listItems);
    setAndSaveItems(listItems);
  };

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppingList", JSON.stringify(newItems));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
    console.log("handlesubmit");
  };

  const handleCheck = (id) => {
    console.log(id);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    console.log(listItems);
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    console.log(listItems);
    setAndSaveItems(listItems);
  };

  return (
    <div className='App'>
      <Header title='Groceries'></Header>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch}></SearchItem>
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLocaleLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />
    </div>
  );
}

export default App;
