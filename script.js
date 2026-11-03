// ===============================
// My Planner v1.0
// ===============================


let currentDate = new Date();

let selectedDate = formatDate(currentDate);


let plannerData =
JSON.parse(
localStorage.getItem("plannerData")
)
|| {};

let selectedMood = "";





// ===============================
// 页面切换
// ===============================


function showPage(id){

    document
    .querySelectorAll(".page")
    .forEach(page=>{
        page.classList.remove("active");
    });


    document
    .getElementById(id)
    .classList.add("active");


    if(id==="todoPage"){
        renderAllTodo();
    }

}






// ===============================
// 日期处理
// ===============================


function formatDate(date){

    return (

        date.getFullYear()
        +
        "-"
        +
        String(date.getMonth()+1)
        .padStart(2,"0")
        +
        "-"
        +
        String(date.getDate())
        .padStart(2,"0")

    );

}







// ===============================
// 日历
// ===============================


function renderCalendar(){


let year =
currentDate.getFullYear();


let month =
currentDate.getMonth();



document
.getElementById("monthTitle")
.innerText =

`${year}年${month+1}月`;





let calendar =
document.getElementById("calendar");


calendar.innerHTML="";



let first =
new Date(year,month,1)
.getDay();


let total =
new Date(year,month+1,0)
.getDate();





for(let i=0;i<first;i++){

    let blank =
    document.createElement("div");

    calendar.appendChild(blank);

}





for(let i=1;i<=total;i++){


    let day =
    document.createElement("div");


    day.className="day";


    let date =

    `${year}-${String(month+1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;



    day.innerText=i;



    if(date===selectedDate){

        day.classList.add("today");

    }




    if(plannerData[date]){

        day.classList.add("has-data");

        day.innerText=i+"🌹";

    }




    day.onclick=function(){

        selectedDate=date;

        openDiary(date);

    };



    calendar.appendChild(day);


}



}





function changeMonth(num){


currentDate
.setMonth(
currentDate.getMonth()+num
);


renderCalendar();


}





// ===============================
// 日记
// ===============================



function openDiary(date){


selectedDate=date;


showPage("diaryPage");



document
.getElementById("diaryTitle")
.innerText =
date;



let info =
plannerData[date]
||
{
diary:"",
mood:"",
todos:[]
};



document
.getElementById("diaryText")
.value =
info.diary;



selectedMood =
info.mood;



renderTodo();



}




function setMood(mood){

selectedMood=mood;

}






function saveDiary(){


if(!plannerData[selectedDate]){


plannerData[selectedDate]={

diary:"",
mood:"",
todos:[]

};


}




plannerData[selectedDate]
.diary =

document
.getElementById("diaryText")
.value;



plannerData[selectedDate]
.mood =
selectedMood;



saveData();


renderCalendar();



alert(
"今天的记录保存好了 🌹"
);


}









// ===============================
// 待办
// ===============================



function addTodo(){


let input =
document.getElementById("todoInput");


let value =
input.value.trim();



if(!value)return;




if(!plannerData[selectedDate]){


plannerData[selectedDate]={

diary:"",
mood:"",
todos:[]

};


}




plannerData[selectedDate]
.todos
.push({

text:value,

done:false

});



input.value="";



renderTodo();


saveData();


}






function renderTodo(){


let list =
document.getElementById("todoList");


if(!list)return;


list.innerHTML="";



let todos =

plannerData[selectedDate]
?
plannerData[selectedDate].todos
:
[];





todos.forEach((item,index)=>{


let li =
document.createElement("li");



li.innerHTML =


`

<label>

<input type="checkbox"
${item.done?"checked":""}>

${item.text}

</label>


<button>
删除
</button>

`;





li.querySelector("input")
.onchange=function(){


item.done=this.checked;


saveData();


};




li.querySelector("button")
.onclick=function(){


todos.splice(index,1);


renderTodo();


saveData();


};




list.appendChild(li);


});



}









function renderAllTodo(){


let list =
document
.getElementById("allTodoList");



list.innerHTML="";



Object.keys(plannerData)
.forEach(date=>{


plannerData[date]
.todos
?.forEach(todo=>{


let li =
document.createElement("li");



li.innerHTML=

`

${todo.done?"✓":"□"}

${date}

<br>

${todo.text}

`;



list.appendChild(li);



});


});


}










// ===============================
// 课表
// ===============================



function createSchedule(){


let body =
document.getElementById("scheduleBody");



body.innerHTML="";



for(let i=1;i<=8;i++){


let tr =
document.createElement("tr");


tr.innerHTML=

`

<th>
${i}
</th>

<td contenteditable></td>

<td contenteditable></td>

<td contenteditable></td>

<td contenteditable></td>

<td contenteditable></td>

`;



body.appendChild(tr);


}



}





function saveSchedule(){



let cells =
document
.querySelectorAll(".schedule td");



let result=[];


cells.forEach(cell=>{

result.push(cell.innerText);

});



localStorage
.setItem(
"schedule",
JSON.stringify(result)
);



alert(
"课表保存成功 📚"
);



}




function loadSchedule(){



let saved =
JSON.parse(
localStorage.getItem("schedule")
);



if(!saved)return;



let cells =
document
.querySelectorAll(".schedule td");



cells.forEach((cell,i)=>{


cell.innerText =
saved[i]||"";


});


}










// ===============================
// 数据
// ===============================


function saveData(){


localStorage
.setItem(

"plannerData",

JSON.stringify(plannerData)

);


}




function clearData(){


if(confirm("确定清除所有资料吗？")){


localStorage.clear();


location.reload();


}


}








// 初始化


renderCalendar();


createSchedule();


loadSchedule();
