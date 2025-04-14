import React from "react";
import { useState } from "react";
import { useRef } from "react";
import styles from "./assets/style.module.css"

const App = () => {
   const inputRef = useRef();

   const [list, setList] = useState([])
   // const [task, setTask] = useState([])

   const [editIndex, setEditIndex] = useState(null)
   const [editedTask, setEditedTask] = useState('')



   const addTask = (event)=> {
      event.preventDefault()
      const inputTask = inputRef.current.value;
      console.log(inputTask)
      // setTask(inputTask)
      if (!inputTask) {
         return
      }
      setList([...list, inputTask])
      inputRef.current.value = ''
   }

   const finishTask = ()=>{}

   const editTask = (index) => {
      setEditIndex(index);
      setEditedTask(list[index]);
   };

   const saveTask = (index) => {
      const updatedList = [...list];
      updatedList[index] = editedTask;
      setList(updatedList);
      setEditIndex(null);
      setEditedTask('');
   };

   const deleteTask = (index)=>{
      const updatedList = list.filter((item, i)=> i !== index)
      setList(updatedList)
   }


   return (
      <div className={styles.card}>
         <h2>JUST DO IT</h2>
         <form className={styles["to-do-form"]}>
            <input type="text" ref={inputRef} />
            <button className={styles["add-btn"]} type="submit" onClick={addTask}>ADD</button>
         </form>
         <div className={styles["to-do-list"]}>
            {list.map((task, index) => (
               <div key={index} className={styles["list-item"]}>

                  {editIndex === index ? (
                  <input type="text" className={styles["edit-input"]} value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                  ) : (
                     <h6 className={styles.task}>{task}</h6>
                  )}

                  {/* <button className={styles["finish-btn"]} onClick={finishTask}>Finish</button> */}

                  {editIndex === index ? (
                     <button className={styles["edit-btn"]} onClick={() => saveTask(index)}>Save</button>
                  ) : (
                     <button className={styles["edit-btn"]} onClick={() => editTask(index)}>Edit</button>
                  )}

                  <button className={styles["delete-btn"]} onClick={()=>deleteTask(index)}>Delete</button>
               </div>
            ))}
         </div>
      </div>
   );
    
};

export default App;
