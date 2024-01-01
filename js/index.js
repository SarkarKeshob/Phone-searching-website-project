loadSearch('iphone');
const phonesContainer=document.getElementById('phones-container');
const searchButton=document.getElementById('search-button');
const showAll=document.getElementById('show-all');
const matchNumber=document.getElementById('match-number');
const loader=document.getElementById('loading');
const modalBox=document.getElementById('show-modal-box')
const pageNoshower=document.getElementById('page-no');
searchButton.addEventListener('click',searchHandler);
showAll.addEventListener('click',function(event){

    const clickedPage=parseInt(event.target.innerText);
    
    pagiNationSearch(clickedPage);
});