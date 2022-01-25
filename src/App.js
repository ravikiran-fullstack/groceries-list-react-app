import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import UseStateHook from "./UseStateHook";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

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

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    // console.log("addItem", listItems);
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
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

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = listItems.find((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myItem),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) {
      setFetchError(result);
    }
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
