import { useState } from "react";
import Draw from './components/Draw';
import Todo from './components/Todo'
import './App.css';

function App(){
  return (
    <>
      <div className="container">

        <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item tab-menu">
                <a className="nav-link active" id="draw-tab" data-toggle="tab" href="#thedraw" role="tab">Draw</a>
            </li>
            <li className="nav-item tab-menu">
                <a className="nav-link" id="todo-tab" data-toggle="tab" href="#todo" role="tab">To-Do's</a>
            </li>
        </ul>

        <div className="tab-content" id="myTabContent">

            <div className="tab-pane fade show active" id="thedraw" role="tabpanel" aria-labelledby="draw-tab">
                  <Draw/>
            </div>

            <div className="tab-pane fade" id="todo" role="tabpanel" aria-labelledby="todo-tab">
                  <Todo/>
            </div>

        </div> {/* end of tab-content */}

      </div> {/* end of container */}

      
    </>
  );
}

export default App;
