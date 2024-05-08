const info=document.querySelector('.gameInfo');
const b1=document.querySelector('#b1');
const b2=document.querySelector('#b2');
const b3=document.querySelector('#b3');
const b4=document.querySelector('#b4');
const b5=document.querySelector('#b5');
const b6=document.querySelector('#b6');
const b7=document.querySelector('#b7');
const b8=document.querySelector('#b8');
const b9=document.querySelector('#b9');
const newGame=document.querySelector('#newGame');
const boxes=document.querySelectorAll('.boxes');
const newGameBtn=document.querySelector('.newGame');
let count=0;
let gStop=false;
let turn=true;
let winning=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let grid=["","","","","","","","",""];
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handle(box,index);
        });
});
function handle(box,index){
    if(gStop){
        return;
    }
    if(box.textContent===""){
        if(turn){
            box.textContent="X";
            turn=false;
            info.textContent="player O";
            grid[index]="X";
        }
        else{
            box.textContent="O";
            turn=true;
            info.textContent="player X";
            grid[index]="O";

        }
        count++;
    }
    else{
        return;
    }
   if(count>4){
    check();
   }
   if(count>0){
    newGame.setAttribute("style","opacity:1;");
   }
    
}
function check(){
    winning.forEach((ar)=>{
        if(grid[ar[0]]!="" && grid[ar[1]]!="" && grid[ar[2]]!=""){
            if(grid[ar[0]]==grid[ar[1]] && grid[ar[0]]==grid[ar[2]]){
                boxes[ar[0]].setAttribute("style","background-color:green;");
                boxes[ar[1]].setAttribute("style","background-color:green;");
                boxes[ar[2]].setAttribute("style","background-color:green;");
                if(turn){
                    info.textContent="O player wins!";
                }
                else{
                    info.textContent="X player wins!";
                }
                gStop=true;
            }
        }
    })
}
newGameBtn.addEventListener('click',()=>{
    boxes.forEach((box)=>{
        box.textContent="";
        box.setAttribute("style","background-color:black;");
    });
    info.textContent="player X";
    turn=true;
    gStop=false;
    grid=["","","","","","","","",""];
    newGame.setAttribute("style","opacity:0;");

})