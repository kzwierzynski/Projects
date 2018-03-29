// Get modal element
let modal = document.getElementById('simpleModal');
// Get open modal button
let modalBtn = document.getElementById('modalBtn');
// Get close button
let closeBtn = document.getElementsByClassName('closeBtn')[0];

// Get modal window
let modalWindow = document.getElementsByClassName('modal-content')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(){
  modal.style.display = 'block';
}

// Function to close modal
function closeModal(){
  modalWindow.classList.add('modal-close');
  modal.classList.add('fade-out');
  setTimeout( ()=>{
    modalWindow.classList.remove('modal-close');
    modal.classList.remove('fade-out');
    modal.style.display = 'none';
  }, 1000)
  
  
}

// Function to close modal if outside click
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}