import { state } from "../core/main";


const spinner = document.querySelector('.spinner-div');
const mainContent = document.querySelector('.main');    
window.onload = function() {
    spinner.style.display = 'none';
    mainContent.style.display = 'block';
};

window.addEventListener('loading', function() {
    spinner.style.display = 'block';
    mainContent.style.display = 'none';
  });
  