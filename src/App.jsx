import React from "react";
import { useState } from "react";
import styles from "./assets/style.module.css"

const App = () => {
   const [input, setInput] = useState('')

   const [list, setList] = useState([]);
   // const [task, setTask] = useState('')

   const [editIndex, setEditIndex] = useState(null);
   const [editedTask, setEditedTask] = useState('');



   const addTask = (event)=> {
      event.preventDefault()
      if (!input.trim()) return;
      
      const newTask = { text: input, completed: false }
      console.log('newTask :', newTask)

      setList([...list, newTask]);
      setInput('')
   }


   const editTask = (index) => {
      setEditIndex(index);
      setEditedTask(list[index].text);
   };

   const saveTask = (index) => {
      const updatedList = [...list];
      updatedList[index].text = editedTask;
      setList(updatedList);
      setEditIndex(null);
      setEditedTask('');
   };

   const deleteTask = (index)=>{
      const updatedList = list.filter((item, i)=> i !== index)
      setList(updatedList)
   }


   const finishTask = ()=>{} // toggleComplete

   const toggleComplete = (index) => {
      const updatedList = [...list];
      updatedList[index].completed = !updatedList[index].completed;
      setList(updatedList);
   };
   


   return (
      <div className={styles.card}>
         <h2>JUST DO IT</h2>
         <form className={styles["to-do-form"]}>
            <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} />
            <button className={styles["add-btn"]} type="submit" onClick={addTask}>ADD</button>
         </form>
         <div className={styles["to-do-list"]}>
            {list.map((task, index) => (
               <div key={index} className={`${styles["list-item"]} ${task.completed ? styles.completed : ''}`} >             
                  {editIndex === index ? (
                     <input
                        type="text"
                        className={styles["edit-input"]}
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                     />
                  ) : (
                     <>
                        <img src={`${task.completed ? "./check-box-1.png" : "./check-box-2.png"}`} alt="check-box" 
                           className={styles["checkbox"]}
                           onClick={() => toggleComplete(index)}
                        />
                        <h6 className={`${styles.task}`}> {task.text} </h6>
                     </>
                  )}


                  {editIndex === index ? (
                     <button className={styles["edit-btn"]} onClick={() => saveTask(index)}>
                        Save
                     </button>
                  ) : (
                     <button className={styles["edit-btn"]} onClick={() => editTask(index)}>
                        Edit
                     </button>
                  )}

                  <button className={styles["delete-btn"]} onClick={() => deleteTask(index)}>
                     Delete
                  </button>
                  
               </div>
            ))}
         </div>
      </div>
   );
    
};

export default App;