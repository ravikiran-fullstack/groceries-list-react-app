import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import UseStateHook from "./UseStateHook";
import SearchItem from "./SearchItem";

import { useState, useEffect } from "react";
import AddItem from "./AddItem";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  console.log("before");
  useEffect(() => {
    // it is asynchronous
    //setItems();
    // localStorage.setItem("shoppingList", JSON.stringify(items));

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        console.log(error.stack);
        setFetchError(error.message);
      }
    };

    setTimeout(() => {
      fetchItems();
      setIsloading(false);
    }, 2000);
    // (async () => await fetchItems())();
  }, []);

  console.log("after");

  // console.log(items);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    // console.log("addItem", listItems);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) {
      return;
    }
    addItem(newItem);
    setNewItem("");
    // console.log("handlesubmit");
  };

  const handleCheck = (id) => {
    // console.log(id);
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    // console.log(listItems);
    setItems(listItems);
  };

  const handleDelete = (id) => {
    // console.log(id);
    const listItems = items.filter((item) => item.id !== id);
    // console.log(listItems);
    setItems(listItems);
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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLocaleLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      <Footer length={items.length} />
    </div>
  );
}

export default App;
