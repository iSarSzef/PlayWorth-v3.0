let inputSequence = '';
const targetSequence = '7312';
document.addEventListener('keydown', function(event) {
  
if (!isNaN(event.key)) {
  inputSequence += event.key;
    
if (inputSequence.length > targetSequence.length) {
      inputSequence = inputSequence.slice(-targetSequence.length);
}

if (inputSequence === targetSequence) {
  window.location.href = "/test/test.html";
}
}
})
  