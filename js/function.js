const searchHandler = () => {
    phonesContainer.innerHTML = '';
    loadingSpiner(true);
    let searchValue = document.getElementById('search-field');
    searchValue = searchValue.value;
    loadSearch(searchValue);
}

async function loadSearch(phoneName) {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await response.json();
    const phones = data.data;
    pageNoshower.innerText='1'
    displayPhones(phones);

}

const displayPhones = (phones) => {

    matchNumber.innerHTML = `${phones.length} Match Found`;

    if (phones.length > 12) {
        // showAllFUn(phones);
        showAll.innerHTML = '';
        let pageNumber = phones.length / 12;

        for (let i = 0; i < pageNumber; i++) {
            pageButton = document.createElement('button');
            pageButton.classList = `join-item btn btn-lg`;
            pageButton.innerHTML = `${i + 1}`;
            showAll.appendChild(pageButton);
        }
        phones = phones.slice(0, 12);
    }
    else {
        showAll.innerHTML = ''
    }

    useData(phones);
    loadingSpiner(false);

}

const useData = (phones) => {
    phones.forEach(element => {
        let div = document.createElement('div');
        div.classList = `card w-full bg-white shadow-2xl p-6 mt-10`
        div.innerHTML = `
        <figure>
            <img src=${element.image} alt="Shoes" />
        </figure>
        <div class="card-body w-full pl-0 gap-5">
            <h2 class="card-title">${element.phone_name}</h2>
            <p class='text-justify'>There are many variations of passages of available, but the majority have suffered</p>
            <p class='font-extrabold text-2xl'> $999</p>
            <div class="card-actions justify-start mt-5">
            <button class="btn  w-full btn-primary" onclick="showDetails('${element.slug}'),showDetailsModal.showModal()">Show Details</button>
            </div>
        </div>`
        phonesContainer.appendChild(div);
    });
}

const pagiNationSearch = (clickedPage) => {
    phonesContainer.innerHTML = '';
    loadingSpiner(true);
    let searchValue = document.getElementById('search-field');
    searchValue = searchValue.value;
    pagiNationLoadData(searchValue, clickedPage);

}

const pagiNationLoadData = async (phoneName, clickedPage) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await response.json();
    const phones = data.data;
    
    if(phones.length>12){
        pageNoshower.innerText=`${clickedPage} of ${Math.ceil(phones.length/12)} pages`;
    }
    else{
        pageNoshower.innerText=`1 of 1 pages`
    }

    matchNumber.innerHTML = `${phones.length} Match Found`;
    clickedPage = (clickedPage * 12)
    let phonesData = [];
    for (let i = clickedPage - 12; i < clickedPage; i++) {
        if (phones[i]) {
            phonesData.push(phones[i]);
        }
    }

    useData(phonesData);
    loadingSpiner(false);

};

function loadingSpiner(isLoading) {
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

const showDetails = async (id) => {
    const phonesObj = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const phoneDetails = await phonesObj.json();
    const phoneData = phoneDetails.data;
    const phoneFeatures = phoneData.mainFeatures;
    modalBox.innerHTML = `
        <img src="${phoneData.image}" class="w-fit mx-auto" />
        <h3 class="font-extrabold text-3xl">${phoneData.name}</h3>
        <p class="text-light text-justify">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

        <p class="text-md "> <span class="font-bold"> Storage: </span> ${phoneFeatures.storage} </p>
        <p class="text-md "> <span class="font-bold"> Display Size: </span> ${phoneFeatures.displaySize} </p>
        <p class="text-md "> <span class="font-bold"> ChipSet: </span> ${phoneFeatures.chipSet} </p>
        <p class="text-md "> <span class="font-bold"> Memory: </span> ${phoneFeatures.memory} </p>
        <p class="text-md "> <span class="font-bold"> Sensors: </span> ${phoneFeatures.sensors} </p>
        <p class="text-md "> <span class="font-bold"> Release Date: </span> ${phoneData.releaseDate} </p>
        <p class="text-md "> <span class="font-bold"> Brand: </span> ${phoneData.brand} </p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>

    `

    //         brand
    // : 
    // "Apple"
    // image
    // : 
    // "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg"
    // mainFeatures
    // : 
    // { '128GB/256GB/512GB storage, no card slot', displaySize: '5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)', chipSet: 'Apple A15 Bionic (5 nm)', memory: '128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM', sensors: Array(6)}
    // name
    // : 
    // "iPhone 13 mini"
    // releaseDate
    // : 
    // "Released 2021, September 24"
    // slug
    // : 
    // "apple_iphone_13_mini-11104"
    // [[Prototype]]
    // : 
    // Object
    // status
    // : 
    // true


}



