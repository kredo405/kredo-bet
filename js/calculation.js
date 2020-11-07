function remooveSpinner() {
    $('.spinner-grow').remove();
}

setTimeout(remooveSpinner, 15000);




var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://free-football-prediction.p.rapidapi.com/free_tips",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-football-prediction.p.rapidapi.com",
		"x-rapidapi-key": "f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0"
	}
}

$.ajax(settings).done(function (response) {
    console.log(response);
  

 
let newArray = response.data.filter(el => el.competition_cluster == 'FRANCE' || el.competition_cluster == 'SPAIN' || el.competition_cluster == 'AUSTRIA' ||
el.competition_cluster == 'BELARUS' || el.competition_cluster == 'BELGIUM' || el.competition_cluster == 'CROATIA' || el.competition_cluster == 'CZECHIA' || el.competition_cluster == 'DENMARK' ||
el.competition_cluster == 'GERMANY' || el.competition_cluster == 'GREECE' || el.competition_cluster == 'ITALY' || el.competition_cluster == 'POLAND' ||
el.competition_cluster == 'PORTUGAL' || el.competition_cluster == 'RUSSIA' || el.competition_cluster == 'SERBIA' || el.competition_cluster == 'SPAIN' ||
el.competition_cluster == 'SWEDEN' || el.competition_cluster == 'ENGLAND' || el.competition_cluster == 'NETHERLANDS');



newArray.forEach(element => {
      
       let random = Math.random();

        let dom = `
        <div>
        <div class = 'forecast_item'><p>${element.start_date.slice(11, 16)} + 7</p>  <p class = 'forecast_item_bold'>${element.home_team}</p> - <p class = 'forecast_item_bold'>${element.away_team}</p> <button class="btn btn-light" type="button" data-toggle="collapse" data-target="#collapseExample${element.X}" aria-expanded="false" aria-controls="collapseExample${element.X}">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>
    </button></div> 
        
    <div class="collapse" id="collapseExample${element.X}">
      <div class="card card-body">
       <div class = 'forecast_country'>
            <p>Страна:</p> <h5 >${element.competition_cluster}</h5> <p>Лига:</p> <h5>${element.competition_name}</h5>
       </div>
       <div class = 'fore'>
       <div class = 'fore_item'><h5>Победа 1:</h5><p>${element[1]}%</p></div>
       <div class = 'fore_item'><h5>Ничья:</h5><p>${element.X}%</p></div>
       <div class = 'fore_item'><h5>Победа 2:</h5><p>${element[2]}%</p></div>
       <div class = 'fore_item'><h5>Тотал больше 1.5:</h5><p>${element["1.5"]}%</p></div>
       <div class = 'fore_item'><h5>Тотал больше 2.5:</h5><p>${element["2.5"]}%</p></div>
       <div class = 'fore_item'><h5>Тотал больше 3.5:</h5><p>${element["3.5"]}%</p></div>
       <div class = 'fore_item'><h5>Обе забьют: ДА:</h5><p>${element.BTS}%</p></div>
       <div class = 'fore_item'><h5>Обе забьют: Нет:</h5><p>${element.OTS}%</p></div>
       <div class = 'fore_item'><h5>1-й тайм П1:</h5><p>${element.HT1}%</p></div>
       <div class = 'fore_item'><h5>1-й тайм Х:</h5><p>${element.HTX}%</p></div>
       <div class = 'fore_item'><h5>1-й тайм П2:</h5><p>${element.HT2}%</p></div>
       <div class = 'fore_item'><h5>Прогноз:</h5><p>${element.prediction}</p></div>
      
       </div>
      </div>
    </div>  
        </div>
        
        `;
$('.forecastItems').append(dom);




    });
});