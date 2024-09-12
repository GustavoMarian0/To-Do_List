document.querySelector('#container').addEventListener('submit', async (event) => {
        event.preventDefault();

        const city = document.querySelector('#input_search').value;

        if (!city) {
            return alert('Preencha a barra de pesquisa!');
        }

        const key_api = `6dd88c0a56b8237d84c465cdd67e72e8`;
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${key_api}&units=metric&lang=pt_br`;

        const result = await fetch(api);
        const json = await result.json();

        if (json.cod === 200) {
            interface_show({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            })
        }else {
            alert('Não foi possivel localizar, volte mais tarde...')
        }
    });
    
    function interface_show(json) {

        document.querySelector('#interface').classList.add('show');

        document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
        document.querySelector('#temp_valeu').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}`;
        document.querySelector('#clima').innerHTML = `${json.description}`;
        document.querySelector('#img_icon').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
        document.querySelector('#text01').innerHTML = `${json.tempMax.toString().replace('.', ',')}<sup>C°</sup>`;
        document.querySelector('#text02').innerHTML = `${json.tempMin.toString().replace('.', ',')}<sup>C°</sup>`;
        document.querySelector('#text04').innerHTML = `${json.windSpeed.toString().replace('.', ',')}km/h`;
        document.querySelector('#text03').innerHTML = `${json.humidity}%`;

    }
