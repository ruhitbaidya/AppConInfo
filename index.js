

let inputName = document.querySelector('#InputName');
let btnName = document.querySelector('#btnName');
let imgStore = document.querySelector('.flag-img');
let infoStore = document.querySelector('#infoStore');
let alertText = document.querySelector('#alertText');

let contryInfo = {}



btnName.addEventListener('click', function(){
    
        fetch(`https://restcountries.com/v3.1/name/${inputName.value}?fullText=true`)
        .then( (res)=>  res.ok ? res.json() : alertText.innerHTML='Please Give Valid Country Name',setTimeout(()=>{alertText.innerHTML=''},4000))
        .then((data)=>{
        
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
            staStore()
            
        })               
    })
});

function staStore(){
    imgStore.src = contryInfo.flag;
    infoStore.innerHTML = `
        <li class="list-group-item">Name : ${contryInfo.name} </li>
        <li class="list-group-item">Official Name : ${contryInfo.official} </li>
        <li class="list-group-item">Capital City : ${contryInfo.capital} </li>
        <li class="list-group-item">Population : ${contryInfo.population} </li>
        <li class="list-group-item">Native Languages : ${contryInfo.leng} </li>
    `
}


