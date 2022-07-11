import React, { useState, useEffect } from "react";
import "./style.css";

//getting data from local storage

const getLocalStroage = () => {
    const list = localStorage.getItem("MyTodoList");

    if (list) {
        return JSON.parse(list)
    } else {
        return [];
    }
}


const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalStroage());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    //editing the item
    const editItem = (index) => {
        const itemTodoEditied = items.find((curElem) => {
            return curElem.id === index;
        });
        setIsEditItem(index);
        setInputData(itemTodoEditied.name);
        setToggleButton(true);
    }


    // adding item to the list
    const addItems = () => {
        if (!inputData) {
            alert("Input Field is Empty");
        } else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputData };
                    }
                    return curElem;
                })
            )
            setIsEditItem(null);
            setInputData("");
            setToggleButton(false);
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]); //'...' is an spread operator which keeps previous data and keep adding data behind it
            setInputData("");
        }
    }


    //deleting item from the list
    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItem);

    }

    // deleting all item from the list
    const removeAll = () => {
        return setItems([]);
    }

    //local storage
    useEffect(() => {
        // local storage takes in two parameter => key and value so key will be any name we like and value will be whatever user input
        localStorage.setItem("MyTodoList", JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todoo.webp" alt="Todo Logo" />
                        <figcaption>Add Your List 📝</figcaption>
                    </figure>
                    <div className="addItems">
                        <input placeholder="✍️ Add items...." className="form-control" value={inputData} onChange={(e) => setInputData(e.target.value)} />

                        {/* basically it says if the toggle button is true then the first button will be executed else second one will */}
                        {toggleButton ?
                            (<i className="far fa-edit add-btn" onClick={addItems}></i>) :
                            (<i className="fa fa-plus add-btn" onClick={addItems}></i>)
                        }
                    </div>
                    <div className="showItems">

                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })};


                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;