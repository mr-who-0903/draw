import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';

const ToDoList = (props) =>{
    
    return (
    <>   
        <div className="itemDiv">
            { (props.isCompleted)? 
            <><input type="checkbox" className="checkbox" checked></input> <li><s style={{color:'red'}}><span style={{color:'#8a53c1'}}>{props.text}</span></s></li>  </>: 
            <><input type="checkbox" className="checkbox" onChange={() => { props.onCheck(props.id) }}></input> <li>{props.text}</li> </>}
        
            <div className="dates">
                <p className="date"><b>Created on:</b> {props.date}</p>
                <p className="competionDate"><b>Completed on:</b> { props.CompletionDate }</p>
            </div>

            <Tooltip title="delete item"> 
            <ClearIcon className="fa fa-times" 
                onClick={() => { props.onDelete(props.id); }
                }/>
            </Tooltip> 
        </div>

    </>
    );
};

export default ToDoList;
      