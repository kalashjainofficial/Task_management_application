import React, { useContext, useState } from "react";
import { slide_context } from "./header";
import { MdDeleteForever } from "react-icons/md";
import { GiCheckMark, GiCrossMark } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";

function Body() {
  const [mode] = useContext(slide_context);

  // Page theme
  const pageTheme =
    mode == 3
      ? "bg-yellow-100 text-slate-900"
      : mode == 2
      ? "bg-amber-50 text-slate-900"
      : mode == 1
      ? "bg-slate-700 text-slate-100"
      : "bg-slate-950 text-slate-100";

  // Panels
  const panelTheme =
    mode == 3
      ? "bg-yellow-200"
      : mode == 2
      ? "bg-yellow-300"
      : mode == 1
      ? "bg-slate-800"
      : "bg-slate-900";

  // Cards
  const cardTheme =
    mode == 3
      ? "bg-amber-300"
      : mode == 2
      ? "bg-amber-200"
      : mode == 1
      ? "bg-slate-800"
      : "bg-slate-900";

  // Completed / Incomplete
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

  // NEW: Input theme
  const inputTheme =
    mode == 3
      ? "bg-yellow-50 text-slate-900 placeholder-slate-500 border-slate-300"
      : mode == 2
      ? "bg-yellow-100 text-slate-900 placeholder-slate-500 border-slate-300"
      : mode == 1
      ? "bg-slate-700 text-slate-100 placeholder-slate-300 border-slate-500"
      : "bg-slate-800 text-slate-100 placeholder-slate-400 border-slate-600";

  // NEW: Button theme
  const buttonTheme =
    mode == 3
      ? "bg-green-300 hover:bg-green-400 text-slate-900"
      : mode == 2
      ? "bg-green-400 hover:bg-green-500 text-slate-900"
      : mode == 1
      ? "bg-green-600 hover:bg-green-700 text-slate-100"
      : "bg-green-800 hover:bg-green-900 text-slate-100";

  // State
  const [task, setTask] = useState({ heading: "", description: "" });
  const [idnum, setidnum] = useState(0);
  const [editKey, setEditKey] = useState(null);

  // Add / Edit Task
  const addTask = () => {
    if (!task.heading) return;

    const newTask = {
      heading: task.heading,
      description: task.description,
      status: false,
    };

    if (editKey) {
      const existing = JSON.parse(localStorage.getItem(editKey));
      localStorage.setItem(
        editKey,
        JSON.stringify({
          ...existing,
          heading: task.heading,
          description: task.description,
        })
      );
      setEditKey(null);
    } else {
      localStorage.setItem(Date.now().toString(), JSON.stringify(newTask));
    }

    setidnum((prev) => prev + 1);
    setTask({ heading: "", description: "" });
  };

  // All tasks
  const gothrough = () => {
    let tasksarr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let obj;
      try {
        obj = JSON.parse(localStorage.getItem(key));
      } catch {
        continue;
      }

      if (!obj?.heading) continue;

      tasksarr.push(
        <div
          key={key}
          className={`p-2 mb-2 w-full rounded transition-colors duration-700 ${cardTheme}`}
        >
          <h3 className="font-bold">{obj.heading}</h3>
          <p>{obj.description}</p>

          {/* Toggle status */}
          <button
            className="mr-2 bg-blue-300 hover:bg-blue-500 p-1 rounded"
            onClick={() => {
              const updatedObj = JSON.parse(localStorage.getItem(key));
              updatedObj.status = !updatedObj.status;
              localStorage.setItem(key, JSON.stringify(updatedObj));
              setidnum((prev) => prev + 1);
            }}
          >
            {obj.status ? <GiCrossMark /> : <GiCheckMark />}
          </button>

          {/* Delete */}
          <button
            className="mr-2 bg-red-400 hover:bg-red-600 p-1 rounded"
            onClick={() => {
              localStorage.removeItem(key);
              setidnum((prev) => prev + 1);
            }}
          >
            <MdDeleteForever />
          </button>

          {/* Edit */}
          <button
            className="bg-blue-500 hover:bg-blue-600 p-1 rounded"
            onClick={() => {
              setTask({
                heading: obj.heading,
                description: obj.description,
              });
              setEditKey(key);
            }}
          >
            <RiEdit2Fill />
          </button>
        </div>
      );
    }

    return tasksarr;
  };

  // Completed tasks
  const completedtasks = () => {
    let arr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let obj;
      try {
        obj = JSON.parse(localStorage.getItem(key));
      } catch {
        continue;
      }

      if (obj?.heading && obj.status) {
        arr.push(
          <div key={key} className={`p-2 mb-2 w-full rounded ${cardTheme}`}>
            <h3 className="font-bold">{obj.heading}</h3>
            <p>{obj.description}</p>
          </div>
        );
      }
    }

    return arr;
  };

  // Incomplete tasks
  const incompletetasks = () => {
    let arr = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let obj;
      try {
        obj = JSON.parse(localStorage.getItem(key));
      } catch {
        continue;
      }

      if (obj?.heading && !obj.status) {
        arr.push(
          <div key={key} className={`p-2 mb-2 w-full rounded ${cardTheme}`}>
            <h3 className="font-bold">{obj.heading}</h3>
            <p>{obj.description}</p>
          </div>
        );
      }
    }

    return arr;
  };

  return (
    <div className={`flex flex-wrap min-h-screen ${pageTheme}`}>
      
      {/* INSERT TASK */}
      <div className={`w-1/4 flex flex-col items-center p-4 ${panelTheme}`}>
        <h2 className="font-bold underline mb-4">INSERT TASKS</h2>

        <input
          type="text"
          className={`border w-full p-2 mb-2 rounded transition-colors duration-700 ${inputTheme}`}
          placeholder="TASK HEADING"
          value={task.heading}
          onChange={(e) =>
            setTask({ ...task, heading: e.target.value })
          }
        />

        <textarea
          className={`border min-h-[200px] w-full p-2 mb-2 rounded transition-colors duration-700 ${inputTheme}`}
          placeholder="TASK DESCRIPTION"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <button
          className={`rounded p-2 w-full transition-colors duration-700 ${buttonTheme}`}
          onClick={addTask}
        >
          {editKey ? "UPDATE TASK" : "ADD TASK"}
        </button>
      </div>

      {/* ALL TASKS */}
      <div className={`w-1/4 p-4 flex flex-col items-center ${panelTheme}`}>
        <h2 className="font-bold underline mb-4">ALL TASKS</h2>
        {gothrough()}
      </div>

      {/* COMPLETED */}
      <div className={`w-1/4 p-4 flex flex-col items-center ${completeTheme}`}>
        <h2 className="font-bold underline mb-4">COMPLETED TASKS</h2>
        {completedtasks()}
      </div>

      {/* INCOMPLETE */}
      <div className={`w-1/4 p-4 flex flex-col items-center ${incompleteTheme}`}>
        <h2 className="font-bold underline mb-4">INCOMPLETE TASKS</h2>
        {incompletetasks()}
      </div>
    </div>
  );
}

export default Body;