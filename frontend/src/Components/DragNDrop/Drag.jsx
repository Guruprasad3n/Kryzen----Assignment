import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../App.css";

const initialData = {
  todo: [
    { id: 'task-1', content: 'Task 1' },
    { id: 'task-2', content: 'Task 2' },
    // Add more tasks if needed
  ],
  inProgress: [],
  done: [],
  reWork: [],
};

const Drag = () => {
  const [tasks, setTasks] = useState(initialData);

//   const onDragEnd = (result) => {
//     const { source, destination, draggableId } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     ) {
//       return;
//     }

//     const start = tasks[source.droppableId];
//     const finish = tasks[destination.droppableId];

//     if (start === finish) {
//       const newTaskIds = Array.from(start);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...tasks,
//         [source.droppableId]: newTaskIds,
//       };

//       setTasks(newColumn);
//     } else {
//       const startTaskIds = Array.from(start);
//       startTaskIds.splice(source.index, 1);
//       const newStart = {
//         ...tasks,
//         [source.droppableId]: startTaskIds,
//       };

//       const finishTaskIds = Array.from(finish);
//       finishTaskIds.splice(destination.index, 0, draggableId);
//       const newFinish = {
//         ...tasks,
//         [destination.droppableId]: finishTaskIds,
//       };

//       setTasks({
//         ...tasks,
//         [source.droppableId]: newStart,
//         [destination.droppableId]: newFinish,
//       });
//     }
//   };

const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    if (!destination) {
      return;
    }
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const startColumn = tasks[source.droppableId];
    const finishColumn = tasks[destination.droppableId];
  
    // If the task is dropped within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = [...startColumn];
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);
  
      const newState = {
        ...tasks,
        [source.droppableId]: newTasks,
      };
  
      setTasks(newState);
    } else {
      // If the task is dropped into a different column
      const startTasks = [...startColumn];
      startTasks.splice(source.index, 1);
  
      const finishTasks = [...finishColumn];
      finishTasks.splice(destination.index, 0, draggableId);
  
      const newState = {
        ...tasks,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks,
      };
  
      setTasks(newState);
    }
  };
  

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.keys(tasks).map((status, index) => (
            <div key={status} className="column">
              <h3>{status}</h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    className="taskList"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks[status].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Drag;
