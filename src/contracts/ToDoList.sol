// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ToDoList {

    struct ToDo {
        bytes32 task;
        bool isDone;
    }

    ToDo[] public todos;

    function addToDo(bytes32 task, bool isDone) public returns (bool success){
        ToDo memory item;
        item.task = task;
        item.isDone = isDone;

        todos.push(item);
        return true;
    }

    function getTodos() public returns (bytes32[] memory, bool[] memory){
        uint length = todos.length;

        bytes32[] memory taskList = new bytes32[](length);
        bool[] memory isDoneList = new bool[](length);

        uint i = 0;

        for (i; i < todos.length; i++){
            taskList[i] = todos[i].task;
            isDoneList[i] = todos[i].isDone;
        }

        return(taskList, isDoneList);
    }

    function deleteToDo(uint index) public returns (bool success){
        if (index>=todos.length) return false;
        uint i = index;

        // for (i; i < todos.length - 1; i++){
        //     todos[i] = todos[i+1];
        // }

        delete todos[i];
        return true;
    }
}