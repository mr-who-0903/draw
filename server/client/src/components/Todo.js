import React, {useState, useEffect} from 'react';
import './todo.css';
import Tooltip from '@material-ui/core/Tooltip';
import ToDoList from './ToDoList'

const ToDo = () => {

    const [listItem, setListItem] = useState("");
    const [itemArr, setItemArr]   = useState([]);
    const [reloadData, setReloadData] = useState(false);

    const date = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return today = dd + '/' + mm + '/' + yyyy;
   }


    /********************************************* CALLS CODE START  ************************************************/

    const getData = async() =>{
        try{
            const res = await fetch("/getdata", {
                method:"GET",
                headers:{
                    "Content-Type": "application/json" // content-type is the media-type of the request being sent from client.
                },
            });

            const data = await res.json();
            console.log(data);
            setItemArr(data);
            setReloadData(false);
    }
    catch(e){
            console.log(e);
        }
    }


    const postData = async () =>{

        const payload = {
                task:listItem, 
                date:date()
        }

        const res = await fetch("/postdata", {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(payload)
        });

        const data = await res.json();
        if(res.status === 401){
            console.log(data.error);
        }
        else if(res.status === 201){
            console.log(data.message);
        }
    }

    const updateData = async (id) =>{

        const payload = {
            completed:true,
            CompletionDate:date()
        }

        const res = await fetch("/update/"+id, {
            method:"PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(payload),
            params:JSON.stringify({
                id:id
            })
        });

        const data = await res.json();
        if(res.status === 401){
            console.log(data.error);
        }
        else if(res.status === 201){
            console.log(data.message);
        }
    }

    const deleteData = async (id) =>{
        const res = await fetch("/delete/"+id, {
            method:"DELETE",
            headers:{
                "Content-Type" : "application/json"
            },
            params:JSON.stringify({
                id:id
            })
        });

        const data = await res.json();
        if(res.status === 401){
            console.log(data.error);
        }
        else if(res.status === 201){
            console.log(data.message);
        }
    }
    
    /************************************************ CALLS CODE END *******************************************/

    useEffect(() => {
        getData();
    }, []);

    useEffect(() =>{
        getData();
    }, [reloadData])

    const onchangeFunc = (event) =>{
        setListItem(event.target.value);
    };

    const addItem = () =>{
        postData();
        setReloadData(true);
        setListItem("");
    };

    const deleteFunc = (id) =>{
        deleteData(id);
        setReloadData(true);
    };

    const checkFunc = (id) =>{
        console.log(id);
        updateData(id);
        setReloadData(true);
    }

    return(
        <>
            <div className="main-div">
                <div className="center-div">
                <div className="inputdiv">
                    <input type="text" placeholder="Add item" onChange={onchangeFunc} value={listItem}></input> 
                    <Tooltip title="add item">
                        <button className="addBtn" onClick={addItem}> + </button>
                    </Tooltip>   
                </div>
                <ol>
                    { itemArr.map((itemObj, index) =>{
                            return <ToDoList
                                       
                                       text     = {itemObj.task}
                                       key      = {index}
                                       id       = {itemObj._id}
                                       isCompleted = {itemObj.completed}
                                       date     = {itemObj.date}
                                       CompletionDate = {itemObj.CompletionDate}
                                       onCheck  = {checkFunc}
                                       onDelete = {deleteFunc}

                                    />;
                    })}
                </ol>
                </div>
            </div>
        </>
    )
}

export default ToDo;