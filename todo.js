
//Today's Date

var date=document.querySelector('.date');
var today = new Date();
var options = { weekday: 'long', month: 'long', day: 'numeric' };
date.innerHTML = today.toLocaleDateString('en-IN', options);


//Submitting TODO's to Local Stroge through Form

var myForm=document.getElementById('myForm');
myForm.addEventListener('submit', saveTodo);


//Saving to Local Storage
function saveTodo(e){

    var d=new Date();
    var getId=d.getTime();
    var todoName=document.getElementById('todoName').value;
    
    var todo={
        id:getId,
        todo:todoName,
        completed:false
    };

    if(localStorage.getItem('todos')===null){
        var todos=[];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }else{
        var todos=JSON.parse(localStorage.getItem('todos'));
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    document.getElementById('myForm').reset();
    addTodo();
    e.preventDefault();

}

//Classes

const CHECK = 'checked';
const UNCHECK = 'unchecked';
const LINE_THROUGH = 'lineThrough';


// Adding TODO to the List

function addTodo(){
    var todos=JSON.parse(localStorage.getItem('todos'));
    var todoResults=document.getElementById('todoResults');

    var eachTodo='';
    for(var i=0; i<todos.length;i++){
        var id =todos[i].id;
        var name=todos[i].todo;
        var done=todos[i].completed;

        const DONE = done ? CHECK : UNCHECK;
        const LINE = done ? LINE_THROUGH : '';

        eachTodo += `<li class="list-group-item d-flex align-items-center">
                        <input  
                            id="${id}"
                            type="checkbox"
                            class="checkbox mr-2"
                            job="complete"
                            ${DONE}
                        />
                        <p class="text ${LINE}">${name}</p>
                        <button 
                            class="delete-btn btn btn-sm btn-danger ml-auto" 
                            onclick="deleteTodo(${id})"
                        >
                            X
                        </button>
                    </li>`;
    }
    todoResults.innerHTML=eachTodo;

    if(todos.length == 0){
        todoResults.innerHTML=`<h6 class="text-center">Your TODO List is Empty</h6>`;
    }

}

// Completed The TODO 

function checkTodo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    const idValue = element.attributes.id.value;
    
    var todos=JSON.parse(localStorage.getItem('todos'));
    todos.forEach((todo,index)=>{
        if(todo.id == idValue){
            todos[index].completed = todos[index].completed ? false : true;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

todoResults.addEventListener('click',function(e){
    let element = e.target;
    let eleJob = element.attributes.job.value;
    if(eleJob == 'complete'){
        checkTodo(element);
    }
});


// Deleting a TODO

function deleteTodo(id){
    var todos=JSON.parse(localStorage.getItem('todos'));

    for(var i=0;i<todos.length;i++){
        if(id == todos[i].id){
            todos.splice(i,1);
        }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodo();

}

