import React, { useContext, useReducer, useState } from "react";
import { slide_context } from "./header";
import { MdDeleteForever } from "react-icons/md";//delete button
import { GiCheckMark } from "react-icons/gi"; //tick mark
import { GiCrossMark } from "react-icons/gi"; //cross mark
import { RiEdit2Fill } from "react-icons/ri"; //edit mark


function Body() {


  const [mode, setmode] = useContext(slide_context); // slider value


  // Theme for page background===================
  const pageTheme =
    mode == 3
      ? "bg-yellow-100 text-slate-900"
      : mode == 2
        ? "bg-amber-50 text-slate-900"
        : mode == 1
          ? "bg-slate-700 text-slate-100"
          : "bg-slate-950 text-slate-100";

  // Theme for panels
  const panelTheme =
    mode == 3
      ? "bg-yellow-200"
      : mode == 2
        ? "bg-yellow-300"
        : mode == 1
          ? "bg-slate-800"
          : "bg-slate-900";

  const cardTheme =
    mode == 3
      ? "bg-amber-300"
      : mode == 2
        ? "bg-amber-200"
        : mode == 1
          ? "bg-slate-800"
          : "bg-slate-900";

  const completeTheme =
    mode == 3
      ? "bg-green-200"
      : mode == 2
        ? "bg-green-300"
        : mode == 1
          ? "bg-green-700 text-slate-100"
          : "bg-green-900 text-slate-100";

  const incompleteTheme =
    mode == 3
      ? "bg-red-200"
      : mode == 2
        ? "bg-red-300"
        : mode == 1
          ? "bg-red-700 text-slate-100"
          : "bg-red-900 text-slate-100";
  // ==============================================================




  // stores new input
  const [task, setTask] = useState({ heading: "", description: "" });

  let [idnum, setidnum] = useState(0)
  const [editKey, setEditKey] = useState(null);  //for edit

  let taskdesc = {
    "heading": `${task.heading}`,
    "description": `${task.description}`,
    "status": false
  }
  //----------------------------------------------------------
  // done---

  const addTask = () => {   //to add task
    if (!task.heading) return;

    const newTask = {
      heading: task.heading,
      description: task.description,
      status: false
    };

    if(editKey){
      const existing = JSON.parse(localStorage.getItem(editKey));
      localStorage.setItem(editKey, JSON.stringify({ ...existing, heading: task.heading, description: task.description }));
      setEditKey(null);
    }
    else{
      // store in localStorage with unique key
      localStorage.setItem(Date.now().toString(), JSON.stringify(newTask));

    }




    


    // force re-render
    setidnum(prev => prev + 1);

    // clear input fields
    setTask({ heading: "", description: "" });
  };


  // -------------------------------------------------------------

  //done---
  const gothrough = () => {   //for all tasks
    let tasksarr = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let obj;
      try { obj = JSON.parse(localStorage.getItem(key)); } catch { continue; }

      if (!obj?.heading) continue;

      tasksarr.push(
        <div
          key={key}
          className={`p-2 mb-2 w-full rounded transition-colors duration-700 ease-in-out ${cardTheme}`}
        >
          <h3 className="font-bold">{obj.heading}</h3>
          <p>{obj.description}</p>

          <button  //complete incomplete button
            className="mr-2 bg-blue-300 hover:bg-blue-500 p-1 rounded"
            onClick={() => {
              const updatedObj = JSON.parse(localStorage.getItem(key));
              updatedObj.status = !updatedObj.status;

              localStorage.setItem(key, JSON.stringify(updatedObj));
              setidnum(idnum + 1);
            }}
          >
            {obj.status ? <GiCrossMark /> : <GiCheckMark />}
          </button>

          <button  //delete button
            className=" mr-2 bg-red-400 hover:bg-red-600 p-1 rounded"
            onClick={() => {
              localStorage.removeItem(key);
              setidnum(prev => prev + 1);
            }}

          >
            <MdDeleteForever />
          </button>

          <button  //edit button
            className="bg-blue-500 hover:bg-blue-600 p-1 rounded"
            onClick={() => {
              setTask({
                heading: obj.heading,
                description: obj.description
              });
              setEditKey(key); // store which task you're editing
            }}
          ><RiEdit2Fill /></button>
        </div>
      );
    }

    return tasksarr;
  };

  // -----------------------------------------------------------


  //done---
  const completedtasks = () => {   //completed tasks
    let comparr = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let obj;
      try { obj = JSON.parse(localStorage.getItem(key)); } catch { continue; }

      if (!obj?.heading) continue;

      if (obj.status == true) {
        comparr.push(

          <div key={key} className={`p-2 mb-2 w-full rounded transition-colors duration-700 ease-in-out ${cardTheme}`}>
            <h3 className="font-bold">{obj.heading}</h3>
            <p>{obj.description}</p>
          </div>

        )
      }


    }

    return comparr

  }
  // -----------------------------------------------------------

  //done---
  const incompletetasks = () => { //incomplete tasks
    let incomparr = []

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let obj;
      try { obj = JSON.parse(localStorage.getItem(key)); } catch { continue; }

      if (!obj?.heading) continue;

      if (obj.status == false) {
        incomparr.push(

          <div key={key} className={`p-2 mb-2 w-full rounded transition-colors duration-700 ease-in-out ${cardTheme}`}>
            <h3 className="font-bold">{obj.heading}</h3>
            <p>{obj.description}</p>
          </div>

        )
      }

    }

    return incomparr
  }


  // -----------------------------------------------------------
  return (
    <div className={`flex flex-wrap min-h-screen transition-colors duration-700 ease-in-out ${pageTheme}`}>

      {/* -------------------------------------------------------- */}
      {/* INSERT TASKS */}
      <div className={`w-1/4 flex flex-col items-center p-4 transition-colors duration-700 ease-in-out ${panelTheme}`}>
        <h2 className="font-bold underline mb-4">INSERT TASKS</h2>
        <input
          type="text"
          className="border w-full p-2 mb-2 rounded"
          placeholder="TASK HEADING"
          value={task.heading}
          onChange={(e) => setTask({ ...task, heading: e.target.value })}
        />
        <textarea
          className="border min-h-[200px] w-full p-2 mb-2 rounded"
          placeholder="TASK DESCRIPTION"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button
          className="bg-green-400 hover:bg-green-500 rounded p-2 w-full"
          onClick={() => { addTask() }}
        >
          ADD TASK
        </button>



      </div>

      {/* --------------------------------------------------------------- */}
      {/* ALL TASKS */}
      <div className={`w-1/4 p-4 flex flex-col items-center transition-colors duration-700 ease-in-out ${panelTheme}`}>

        <h2 className="font-bold underline mb-4">ALL TASKS</h2>

        {gothrough()}





      </div>

      {/* ----------------------------------------------------- */}
      {/* COMPLETED TASKS */}
      <div className={`w-1/4 p-4 flex flex-col items-center transition-colors duration-700 ease-in-out ${completeTheme}`}>
        <h2 className="font-bold underline mb-4">COMPLETED TASKS</h2>

        {completedtasks()}



      </div>

      {/* ---------------------------------------------------------- */}
      {/* INCOMPLETE TASKS */}
      <div className={`w-1/4 p-4 flex flex-col items-center transition-colors duration-700 ease-in-out ${incompleteTheme}`}>
        <h2 className="font-bold underline mb-4">INCOMPLETE TASKS</h2>

        {incompletetasks()}

      </div>
    </div >
  );
}

export default Body;