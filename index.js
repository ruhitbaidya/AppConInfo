

let inputName = document.querySelector('#InputName');
let btnName = document.querySelector('#btnName');
let imgStore = document.querySelector('.flag-img');
let infoStore = document.querySelector('#infoStore');
let alertText = document.querySelector('#alertText');
let contryInfo = {}
let country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


// auto complate code

inputName.addEventListener('input', function(e){
    let showArr = []
    if(e.target.value){
        showArr = country_list.filter(SiNgCountry => SiNgCountry.toLowerCase().includes(e.target.value));
        showArr = showArr.map(country => `<li class="list-group-item"> ${country} </li>`);
    }
    document.querySelector('#ShowTextSeach').innerHTML = showArr;
});


btnName.addEventListener('click', function(){
         let finialText = inputName.value.trim();
       if(inputName.value === ''){
        alertText.innerHTML = 'Fill Up The Field';
       }else{
        fetch(`https://restcountries.com/v3.1/name/${finialText}?fullText=true`)
        .then((res)=>  res.ok ? res.json() : alertText.innerHTML='Please Give Valid Country Name',setTimeout(()=>{alertText.innerHTML=''},4000))
        .then((data)=>{
            if(data === 'Please Give Valid Country Name'){
               console.log('Responds Not Ok')
            }else{
                data.map((json)=>{
                    contryInfo.flag = json.flags.svg,
                    contryInfo.name = json.name.common,
                    contryInfo.official = json.name.official,
                    contryInfo.capital = json.capital.map((data)=>{
                                        return data
                                    })
                    // for(const len in json.languages){
                    //     console.log(json.languages[len])
                    //     let datas = json.languages[len].split(' ')
                    //     contryInfo.leng += datas;
                        
                    // }
                    let dataslen = Object.values(json.languages)
                    contryInfo.leng = dataslen;
                    contryInfo.population = json.population;
                    contryInfo.moneySy = Object.values(json.currencies).map((data)=>{return data.symbol});
                    contryInfo.moneyName = Object.values(json.currencies).map((data)=>{return data.name});
                    contryInfo.continents = json.continents;
                    staStore()
                })
            }              
    })
       }
});

function staStore(){
    imgStore.src = contryInfo.flag;
    infoStore.innerHTML = `
        <li class="list-group-item">Name : ${contryInfo.name} </li>
        <li class="list-group-item">Official Name : ${contryInfo.official} </li>
        <li class="list-group-item">Capital City : ${contryInfo.capital} </li>
        <li class="list-group-item">Population : ${contryInfo.population} </li>
        <li class="list-group-item"> continents : ${contryInfo.continents} </li>
        <li class="list-group-item">Native Languages : ${contryInfo.leng} </li>
        <li class="list-group-item">Money Name : ${contryInfo.moneyName} </li>
        <li class="list-group-item">Money Symbol : ${contryInfo.moneySy} </li>
    `
}


