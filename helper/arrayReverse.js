import { logList } from "./logic.js";


const p = ()=>{
    return console.log("hello")
}

const trow = document.getElementById("33")

trow.addEventListener("click", myFunction);

function myFunction() {
 return logList.reverse()   
}
