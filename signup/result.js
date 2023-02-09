window.addEventListener('load', () => {
    
const name = sessionStorage.getItem('NAME');
const lname = sessionStorage.getItem('Lastname');
const city = sessionStorage.getItem('City');
    
    document.getElementById('result-name').innerHTML = name;    
    document.getElementById('result-lname').innerHTML = lname;
    document.getElementById('result-city').innerHTML = city;

})