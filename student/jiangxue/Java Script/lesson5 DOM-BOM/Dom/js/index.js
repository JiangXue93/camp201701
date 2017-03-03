window.onload=function(){

const [insertBtn, deleteBtn, updateBtn] 
  = Array.from(document.querySelectorAll('#buttons button'));
    deleteBtn.disabled=true;
    updateBtn.disabled=true;

const datalist = document.getElementById('datalist');
const rowtext = document.getElementById('rowtext');

datalist.addEventListener('click',function(){ 
  console.log(getAllCheckedRows());
  if(getAllCheckedRows().length != 0){  
      deleteBtn.disabled=false;
      updateBtn.disabled=false;
      //evt.stopPropagation();
  }else{
    deleteBtn.disabled=true;
    updateBtn.disabled=true;
  }
});

function getAllCheckedRows(){
  return Array.from(datalist.querySelectorAll('li input:checked'))
        .map(el=>el.parentNode.parentNode);
}

function createNewRow(){
  var row = document.createElement('li');
  row.innerHTML = `<label><input type="checkbox"/>${rowtext.value}</label>`;
  row.setAttribute("class","show");
  return row;
}

insertBtn.addEventListener('click', evt=>{
  var checkedRows = getAllCheckedRows();
  if(checkedRows.length){
    checkedRows.forEach(row=>
       row.insertAdjacentElement('afterend', createNewRow()));
  }else{
    datalist.appendChild(createNewRow());
  }
});

deleteBtn.addEventListener('click', evt=>{
  var checkedRows = getAllCheckedRows();
  checkedRows.forEach(row=>row.setAttribute("class","fade"));
  if(checkedRows.length){ 
    setTimeout(function(){
      checkedRows.forEach(row=>row.remove());
    },2000);
    
  }
});

updateBtn.addEventListener('click', evt=>{
  var checkedRows = getAllCheckedRows();
  checkedRows.forEach(row=>row.setAttribute("class","show"));
  if(checkedRows.length){
    checkedRows.forEach(row=>row.childNodes[0].childNodes[1].textContent = rowtext.value);
  }  
});
}