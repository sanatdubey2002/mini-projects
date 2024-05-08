const key="Z6XKLkUHWJV8Fvam6yTfqreWwGf9yWkf00yyuFoyJzs";

const search=document.querySelector(".search");
const inputEl=document.querySelector(".input");
const images=document.querySelector(".images");
const showEl=document.querySelector("#show-more");

let page=1;

async function searchImages(){
    
   
    let url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputEl.value}&client_id=${key}`;
    
    let response=await fetch(url);
    
    let data=await response.json();
   
    if(page==1){ 
        images.innerHTML="";
        
    }
    let res=data.results;
    
    res.map((result)=>{
        let child=document.createElement('div');
        child.classList.add("image");
        let img=document.createElement('img');
        img.src=result.urls.small;
        let anc=document.createElement('a');
        anc.href=result.links.html;
        anc.target="_blank";
        anc.textContent=result.alt_description;
        anc.classList.add("imageLink");
        child.appendChild(img);
        child.appendChild(anc);
        images.appendChild(child);
    });
    page++;
    showEl.setAttribute("style","transform:scale(1);");
    

}
inputEl.addEventListener('keypress',(e)=>{
   if(e.key==="Enter"){
    e.preventDefault();
    search.click();
   }
});

search.addEventListener('click',()=>{
    
    if(inputEl.value=="")return;
    
    page=1;
    
    images.innerHTML="";
   
    searchImages(); 
    
});

showEl.addEventListener('click',()=>{
    searchImages(); 
})
