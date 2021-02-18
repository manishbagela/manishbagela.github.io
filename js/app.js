console.log('My Notes App');
let date = new Date();
showNotes();

//Add an added note to the local storage

// console.log(date);
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notesObj);
  showNotes();

});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";

  notesObj.forEach((element, index) => {
    html = html + `<div class="card my-3 mx-3 noteCard" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text" contenteditable = "true">${element}</p>
      <p id = "date">${date.toDateString()}</p>
      <button id="${index}" onclick = "deleteNote(this.id)"class="btn btn-primary">Delete Note</button>
    </div>
  </div>`
  });

  let notesElem = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `No notes to be shown. Add a note above`;
  }
}

function deleteNote(index) {
  // console.log(`Deleting the note ${index}`);
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); //Remove 1 element from the index
  
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', ()=>{
  
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired', inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach((element)=>{
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if(cardTxt.includes(inputVal)){
      element.style.display = 'block';
    }else{
      
      element.style.display = 'none';
    }
    // console.log(cardTxt);
  })
})