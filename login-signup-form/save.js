window.addEventListener('load', () => {
    
const name = sessionStorage.getItem('NAME');
const email = sessionStorage.getItem('EMAIL');

const name1 = sessionStorage.getItem('NAME1');
const email1 = sessionStorage.getItem('EMAIL1');

    
    document.getElementById('result-name').innerHTML = name;    
    document.getElementById('result-email').innerHTML = email;

    document.getElementById('result-name1').innerHTML = name1;    
    document.getElementById('result-email1').innerHTML = email1;
 
 

})