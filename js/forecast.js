let getDate = document.querySelector('.date');
let getProg = document.querySelector('.getProg');
let list = document.querySelector('.list_item');
let checkPremierLeagueEngland = document.querySelector('.check_premierLeagueEngland');
let checkPrimeraDivisionSpain = document.querySelector('.check_primeraDivisionSpain');
let checkSerieAItaly = document.querySelector('.chek_seriaAItaly');
let checkBundesleagueGermany = document.querySelector('.chek_bundesleagueGermany');
let chekLigue1France = document.querySelector('.chek_ligue1France');
let checkPremierRussia = document.querySelector('.chek_PremierRussia');
let checkPrimeiraPortugal = document.querySelector('.chek_PrimeiraPortugal');
let checkVysshayaLigaBelarus = document.querySelector('.chek_VysshayaLigaBelarus');
let checkEredivisieNetherlands = document.querySelector('.chek_EredivisieNetherlands');
let checkEuropeLeague = document.querySelector('.chek_UEFAEuropeLeague');
let checkChampionsLeague = document.querySelector('.chek_UEFAChampionsLeague');

// Скрываем блоки с лигами
$('.England').hide();
$('.france').hide();
$('.italy').hide();
$('.germany').hide();
$('.spain').hide();
$('.russia').hide();
$('.belarus').hide();
$('.portugal').hide();
$('.netherlands').hide();
$('.worldChampions').hide();
$('.worldEuropa').hide();

async function getAllMatchesOfDate() {
  const options = {
    method: 'GET',
    url: `https://rapidapi.p.rapidapi.com/v2/fixtures/date/${getDate.value}`,
    params: { timezone: 'Europe/London' },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0'
    }
  };

  await axios.request(options).then(function (response) {
    console.log(response.data);
    getFixtures = response.data.api.fixtures.filter(el => el.league.name == "Premier League" &&
      el.league.country == "England" && checkPremierLeagueEngland.checked == true ||
      el.league.name == "Primera Division" && el.league.country == "Spain" && checkPrimeraDivisionSpain.checked == true ||
      el.league.name == "Serie A" && el.league.country == "Italy" && checkSerieAItaly.checked == true ||
      el.league.name == "Bundesliga 1" && el.league.country == "Germany" && checkBundesleagueGermany.checked == true ||
      el.league.name == "Ligue 1" && el.league.country == "France" && chekLigue1France.checked == true ||
      el.league.name == "Premier League" && el.league.country == "Russia" && checkPremierRussia.checked == true ||
      el.league.name == "Primeira Liga" && el.league.country == "Portugal" && checkPrimeiraPortugal.checked == true ||
      el.league.name == "Vysshaya Liga" && el.league.country == "Belarus" && checkVysshayaLigaBelarus.checked == true ||
      el.league.name == "Eredivisie" && el.league.country == "Netherlands" && checkEredivisieNetherlands.checked == true ||
      el.league.name == "UEFA Champions League" && el.league.country == "World" && checkChampionsLeague.checked == true ||
      el.league.name == "UEFA Europa League" && el.league.country == "World" && checkEuropeLeague.checked == true
    )

    getFixtures.forEach(function (el) {
      getPredirection(el.fixture_id, el.awayTeam.logo, el.homeTeam.logo,
        el.awayTeam.team_name, el.homeTeam.team_name);
    });

    async function getPredirection(el, logoAway, logoHome, nameAway, nameHome) {
      const optionsApi = {
        method: 'GET',
        url: `https://rapidapi.p.rapidapi.com/v2/predictions/${el}`,
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0'
        }
      };

      await axios.request(optionsApi).then(function (response) {
        console.log(response.data);

        let countryName = response.data.api.predictions[0].h2h[0].league.country;
        let leagueName = response.data.api.predictions[0].h2h[0].league.name;
        let leagueLogo = response.data.api.predictions[0].h2h[0].league.logo;
        let teamAwayName = nameAway;
        let teamAwayLogo = logoAway;
        let teamHomeName = nameHome;
        let teamHomeLogo = logoHome;
        let teamIdAway = response.data.api.predictions[0].teams.away.team_id;

        // Переменные для примерного счета
        let azd = response.data.api.predictions[0].teams.home.all_last_matches.goalsAvg.goalsFor.home;
        let bpg = response.data.api.predictions[0].teams.away.all_last_matches.goalsAvg.goalsAgainst.away;
        let apd = response.data.api.predictions[0].teams.home.all_last_matches.goalsAvg.goalsAgainst.home;
        let bzg = response.data.api.predictions[0].teams.away.all_last_matches.goalsAvg.goalsFor.away;
        let azd5 = response.data.api.predictions[0].teams.home.last_5_matches.goals_avg;
        let bpg5 = response.data.api.predictions[0].teams.away.last_5_matches.goals_against_avg;
        let apd5 = response.data.api.predictions[0].teams.home.last_5_matches.goals_against_avg;
        let bzg5 = response.data.api.predictions[0].teams.away.last_5_matches.goals_avg;

        let scoreHome = 0;
        let scoreAway = 0;
        let scoreSumHome = (Number(azd) + Number(bpg) + azd5 + bpg5) / 4;
        let scoreSumAway = (Number(apd) + Number(bzg) + apd5 + bzg5) / 4;

        // Проверяем условия счета

        if (scoreSumHome >= 1.2 && scoreSumHome <= 1.65) {
          scoreHome = 1;
        }
        if (scoreSumAway >= 1.2 && scoreSumAway <= 1.65) {
          scoreAway = 1;
        }
        if (scoreSumHome <= 1.2) {
          scoreHome = 0;
        }
        if (scoreSumAway <= 1.2) {
          scoreAway = 0;
        }
        if (scoreSumHome >= 1.65 && scoreSumHome <= 2) {
          scoreHome = 2;
        }
        if (scoreSumAway >= 1.65 && scoreSumAway <= 2) {
          scoreAway = 2;
        }
        if (scoreSumHome >= 2 && scoreSumHome <= 2.5) {
          scoreHome = 3;
        }
        if (scoreSumAway >= 2 && scoreSumAway <= 2.5) {
          scoreAway = 3;
        }
        if (scoreSumHome >= 2.4) {
          scoreHome = 4;
        }
        if (scoreSumAway >= 2.4) {
          scoreAway = 4;
        }

        // Переменные для прогноза
        let forecastRobot = response.data.api.predictions[0].advice;
        // Переменные для сравнения команд
        let attHome = response.data.api.predictions[0].comparison.att.home;
        let attAway = response.data.api.predictions[0].comparison.att.away;
        let defHome = response.data.api.predictions[0].comparison.def.home;
        let defAway = response.data.api.predictions[0].comparison.def.away;
        let fishLowHome = response.data.api.predictions[0].comparison.fish_law.home;
        let fishLowAway = response.data.api.predictions[0].comparison.fish_law.away;
        let formeHome = response.data.api.predictions[0].comparison.forme.home;
        let formeAway = response.data.api.predictions[0].comparison.forme.away;
        let goalsH2hHome = response.data.api.predictions[0].comparison.goals_h2h.home;
        let goalsH2hAway = response.data.api.predictions[0].comparison.goals_h2h.away;
        let h2hHome = response.data.api.predictions[0].comparison.h2h.home;
        let h2hAway = response.data.api.predictions[0].comparison.h2h.away;

        // Процент побед и ничьих для команд
        let percentHome = response.data.api.predictions[0].winning_percent.home;
        let percentAway = response.data.api.predictions[0].winning_percent.away;
        let percentDraw = response.data.api.predictions[0].winning_percent.draws;

        // Статистика за последних 5 матчей
        // Домашняя командa
        let last5AttHome = response.data.api.predictions[0].teams.home.last_5_matches.att;
        let last5DefHome = response.data.api.predictions[0].teams.home.last_5_matches.def;
        let last5FormeHome = response.data.api.predictions[0].teams.home.last_5_matches.forme;
        let last5GoalsHome = response.data.api.predictions[0].teams.home.last_5_matches.goals;
        let last5GoalsAgainstHome = response.data.api.predictions[0].teams.home.last_5_matches.goals_against;
        let last5GoalsAgainstAvgHome = response.data.api.predictions[0].teams.home.last_5_matches.goals_against_avg;
        let last5GoalsAvgHome = response.data.api.predictions[0].teams.home.last_5_matches.goals_avg;
        // команда в гостях 
        let last5FormeAway = response.data.api.predictions[0].teams.away.last_5_matches.forme;
        let last5GoalsAway = response.data.api.predictions[0].teams.away.last_5_matches.goals;
        let last5GoalsAgainstAway = response.data.api.predictions[0].teams.away.last_5_matches.goals_against;
        let last5GoalsAgainstAvgAway = response.data.api.predictions[0].teams.away.last_5_matches.goals_against_avg;
        let last5GoalsAvgAway = response.data.api.predictions[0].teams.away.last_5_matches.goals_avg;
        let matchWinner = response.data.api.predictions[0].match_winner;

        // // Расччитыаем вероятность н2н

        // let arrayTB15H2h = response.data.api.predictions[0].h2h.filter(el => el.goalsHomeTeam == 0 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 5 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 0 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 3 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 2 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 1 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 4 ||
        //   el.goalsHomeTeam == 4 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 4 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 2 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 5 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 5 ||
        //   el.goalsHomeTeam == 0 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 1)

        // let arrayTB25H2h = response.data.api.predictions[0].h2h.filter(el => el.goalsHomeTeam == 0 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 5 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 0 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 3 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 2 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 1 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 4 ||
        //   el.goalsHomeTeam == 4 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 4 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 2 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 3 || el.goalsHomeTeam == 3 & el.goalsAwayTeam == 5 ||
        //   el.goalsHomeTeam == 5 & el.goalsAwayTeam == 4 || el.goalsHomeTeam == 4 & el.goalsAwayTeam == 5 || el.goalsHomeTeam == 5 & el.goalsAwayTeam == 5);

        // let arrayTM35H2h = response.data.api.predictions[0].h2h.filter(el => el.goalsHomeTeam == 0 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 0 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 2 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 2 ||
        //   el.goalsHomeTeam == 3 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 3);

        // let arrayTM25H2h = response.data.api.predictions[0].h2h.filter(el => el.goalsHomeTeam == 0 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 1 & el.goalsAwayTeam == 0 ||
        //   el.goalsHomeTeam == 1 & el.goalsAwayTeam == 1 || el.goalsHomeTeam == 2 & el.goalsAwayTeam == 0 || el.goalsHomeTeam == 0 & el.goalsAwayTeam == 2);
        //   let ArrayoZH2h = response.data.api.predictions[0].h2h.filter(el => el.goalsHomeTeam >= 1 & el.goalsAwayTeam >= 1); 

        // let tB15H2h = arrayTB15H2h.length * 100 / response.data.api.predictions[0].h2h.length;
        // let tB25H2h = arrayTB25H2h.length * 100 / response.data.api.predictions[0].h2h.length;
        // let tM35H2h = arrayTM35H2h.length * 100 / response.data.api.predictions[0].h2h.length;
        // let tM25H2h = arrayTM25H2h.length * 100 / response.data.api.predictions[0].h2h.length;
        // let oZH2h = ArrayoZH2h.length * 100 / response.data.api.predictions[0].h2h.length;
// Условия для рекомендованных ставок
        let favorit;
        let itogP1;
        let itogP2;
        let itogTB15;
        let itogTB25;
        let itogTM35;
        let itogTM25;
        let itog1x;
        let itog2x;
        let itogIT1B1;
        let itogIT2B1;
        let itogOZ;
        let fora_1Home;
        let fora_0Home;
        let fora_1Away;
        let fora_0Away;
        let WinAndHome;
        let winAndAway;
        let sumAzd = (Number(azd) + azd5) / 2;
        let sumBzg = (Number(bzg) + bzg5) / 2;
        let sumApd = (Number(apd) + apd5) / 2;
        let sumBpg = (Number(bpg) + bpg5) / 2;


        if (Number(formeHome.slice(0, -1)) > Number(formeAway.slice(0, -1)) && Number(fishLowHome.slice(0, -1)) > Number(fishLowAway.slice(0, -1)) && Number(h2hHome.slice(0, -1)) > Number(h2hAway.slice(0, -1)) && matchWinner == '1 N' || matchWinner == '1') {
          favorit = `<img class = 'logo' src = '${teamHomeLogo}'/><p>${teamHomeName} - фаворит матча</p>`;
        } else if (Number(formeAway.slice(0, -1)) > Number(formeHome.slice(0, -1)) && Number(fishLowAway.slice(0, -1)) > Number(fishLowHome.slice(0, -1)) && Number(h2hAway.slice(0, -1)) > Number(h2hHome.slice(0, -1)) && matchWinner == '2 N' || matchWinner == '2') {
          favorit = `<img class = 'logo' src = '${teamAwayLogo}'/><p>${teamAwayName} - фаворит матча</p>`;
        } else {
          favorit = `<p>Явного фаворита в матче нет</p> `;
        }

        if (Number(formeHome.slice(0, -1)) >= Number(formeAway.slice(0, -1)) && Number(fishLowHome.slice(0, -1)) > Number(fishLowAway.slice(0, -1)) && Number(azd) + azd5 > Number(bzg) + bzg5 && Number(apd) + apd5 <= Number(bpg) + bpg5 && Number(h2hHome.slice(0, -1)) >= Number(h2hAway.slice(0, -1)) && Number(percentHome.slice(0, -1)) >= 35 && matchWinner == '1 N' || matchWinner == '1') {
          itogP1 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogP1 = `<p class = 'colorRed'>Нет</p>` }

        if (Number(formeHome.slice(0, -1)) >= 30 && Number(formeAway.slice(0, -1)) <= 70 && (Number(azd) + azd5) / 2 >= (Number(bzg) + bzg5) / 2 && Number(percentHome.slice(0, -1)) >= 30 && matchWinner == '1 N' || matchWinner == '1') {
          itog1x = `<p class = 'colorGreen'>ДА</p>`
        } else { itog1x = `<p class = 'colorRed'>Нет</p>` }

        if (Number(formeAway.slice(0, -1)) >= 30 && Number(formeHome.slice(0, -1)) <= 70 && (Number(bzg) + bzg5) / 2 >= (Number(azd) + azd5) / 2 && Number(percentAway.slice(0, -1)) > 30 && matchWinner == '2 N' || matchWinner == '2') {
          itog2x = `<p class = 'colorGreen'>ДА</p>`
        } else { itog2x = `<p class = 'colorRed'>Нет</p>` }

        if (Number(formeAway.slice(0, -1)) > Number(formeHome.slice(0, -1)) && Number(fishLowAway.slice(0, -1)) > Number(fishLowHome.slice(0, -1)) && Number(bzg) + bzg5 > Number(azd) + azd5 && Number(bpg) + bpg5 <= Number(apd) + apd5 && Number(h2hAway.slice(0, -1)) >= Number(h2hHome.slice(0, -1)) && Number(percentAway.slice(0, -1)) > 30 && matchWinner == '2 N' || matchWinner == '2') {
          itogP2 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogP2 = `<p class = 'colorRed'>Нет</p>` }

        if ((sumAzd + sumBpg)/2 >= 1.7 && (sumApd + sumBzg)/2 >= 1 || (sumBzg + sumApd)/2 >= 1.7 && (sumAzd + sumBpg)/2 >= 1 || (sumAzd + sumBpg)/2 >= 1.4 && (sumApd + sumBzg)/2 >= 1.4) {
          itogTB15 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogTB15 = `<p class = 'colorRed'>Нет</p>` }

        if ((sumAzd + sumBpg)/2 >= 1.85 && (sumApd + sumBzg)/2 >= 1.4 || (sumBzg + sumApd)/2 >= 1.85 && (sumAzd + sumBpg)/2 >= 1.4 || (sumAzd + sumBpg)/2 >= 1.7 && (sumApd + sumBzg)/2 >= 1.7) {
          itogTB25 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogTB25 = `<p class = 'colorRed'>Нет</p>` }

        if ((sumAzd + sumBpg)/2 <= 1.8 && (sumApd + sumBzg)/2 <= 1.5 || (sumBzg + sumApd)/2 <= 1.8 && (sumAzd + sumBpg)/2 <= 1.5 || (sumAzd + sumBpg)/2 <= 1.65 && (sumApd + sumBzg)/2 <= 1.65) {
          itogTM35 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogTM35 = `<p class = 'colorRed'>Нет</p>` }

        if ((sumAzd + sumBpg)/2 <= 1.45 && (sumApd + sumBzg)/2 <= 1.25 || (sumBzg + sumApd)/2 <= 1.45 && (sumAzd + sumBpg)/2 <= 1.25 || (sumAzd + sumBpg)/2 <= 1.35 && (sumApd + sumBzg)/2 <= 1.35) {
          itogTM25 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogTM25 = `<p class = 'colorRed'>Нет</p>` }

        if (sumBpg >= 1.5 && sumAzd >= 1.5 && Number(goalsH2hHome.slice(0, -1)) >= 50 && Number(formeHome.slice(0, -1)) >= 35) {
          itogIT1B1 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogIT1B1 = `<p class = 'colorRed'>Нет</p>` }

        if (sumApd >= 1.5 && sumBzg >= 1.5 && Number(goalsH2hAway.slice(0, -1)) >= 50 && Number(formeAway.slice(0, -1)) >= 35) {
          itogIT2B1 = `<p class = 'colorGreen'>ДА</p>`
        } else { itogIT2B1 = `<p class = 'colorRed'>Нет</p>` }

        if (sumAzd >= 1.65 && sumBzg >= 1.65) {
          itogOZ = `<p class = 'colorGreen'>ДА</p>`
        } else {
          itogOZ = `<p class = 'colorRed'>Нет</p>`
        }

        if (Number(formeHome.slice(0, -1)) > Number(formeAway.slice(0, -1)) && Number(fishLowHome.slice(0, -1)) > Number(fishLowAway.slice(0, -1)) && (((Number(azd) + azd5) / 2) - ((Number(bpg) + bpg5) / 2)) <= -0.6 && Number(h2hHome.slice(0, -1)) > Number(h2hAway.slice(0, -1)) && Number(goalsH2hHome.slice(0, -1)) >= 65 && matchWinner == '1 N' || matchWinner == '1') {
          fora_1Home = `<p class = 'colorGreen'>ДА</p>`
        } else {
          fora_1Home = `<p class = 'colorRed'>Нет</p>`
        }

        if (Number(formeHome.slice(0, -1)) > Number(formeAway.slice(0, -1)) && Number(azd) + azd5 > Number(bpg) + bpg5 && Number(percentHome.slice(0, -1)) >= 35 && matchWinner == '1 N' || matchWinner == '1') {
          fora_0Home = `<p class = 'colorGreen'>ДА</p>`
        } else { fora_0Home = `<p class = 'colorRed'>Нет</p>` }

        if (Number(formeAway.slice(0, -1)) > Number(formeHome.slice(0, -1)) && Number(bzg) + bzg5 > Number(azd) + azd5 && Number(percentAway.slice(0, -1)) >= 35 && matchWinner == '2 N' || matchWinner == '2') {
          fora_0Away = `<p class = 'colorGreen'>ДА</p>`
        } else { fora_0Away = `<p class = 'colorRed'>Нет</p>` }

        if (Number(formeAway.slice(0, -1)) > Number(formeHome.slice(0, -1)) && Number(fishLowAway.slice(0, -1)) > Number(fishLowHome.slice(0, -1)) && (((Number(bzg) + bzg5) / 2) - ((Number(apd) + apd5) / 2)) <= -0.6 && Number(h2hAway.slice(0, -1)) > Number(h2hHome.slice(0, -1)) && Number(goalsH2hAway.slice(0, -1)) >= 65 && matchWinner == '2 N' || matchWinner == '2') {
          fora_1Away = `<p class = 'colorGreen'>ДА</p>`
        } else {
          fora_1Away = `<p class = 'colorRed'>Нет</p>`
        }

        if (Number(formeHome.slice(0, -1)) > Number(formeAway.slice(0, -1)) && Number(fishLowHome.slice(0, -1)) > Number(fishLowAway.slice(0, -1)) && (Number(apd) + apd5) / 2 <= 1.3 && (Number(bzg) + bzg5) / 2 <= 1.3 && Number(goalsH2hHome.slice(0, -1)) >= 65 && Number(percentHome.slice(0, -1)) >= 40) {
          WinAndHome = `<p class = 'colorGreen'>ДА</p>`
        } else {
          WinAndHome = `<p class = 'colorRed'>Нет</p>`
        }

        if (Number(formeAway.slice(0, -1)) > Number(formeHome.slice(0, -1)) && Number(fishLowAway.slice(0, -1)) > Number(fishLowHome.slice(0, -1)) && (Number(bpg) + bpg5) / 2 <= 1.3 && (Number(azd) + azd5) / 2 <= 1.3 && Number(goalsH2hAway.slice(0, -1)) >= 65 && Number(percentAway.slice(0, -1)) >= 40) {
          winAndAway = `<p class = 'colorGreen'>ДА</p>`
        } else {
          winAndAway = `<p class = 'colorRed'>Нет</p>`
        }



        // Переменные для Н2Н и цикл переберающий массив h2h
        let arrayItemsh2h = response.data.api.predictions[0].h2h;
        let col15 = 0;
        let col25 = 0;
        let colU35 = 0;
        let colU25 = 0;
        let colP1 = 0;
        let colP2 = 0;
        let colOz = 0;
        let colX = 0;


        arrayItemsh2h.forEach((el) => {
          if (el.goalsAwayTeam + el.goalsHomeTeam > 1.5) {
            col15++;
          }
          if (el.goalsAwayTeam + el.goalsHomeTeam > 2.5) {
            col25++;
          }
          if (el.goalsAwayTeam + el.goalsHomeTeam < 3.5) {
            colU35++;
          }
          if (el.goalsAwayTeam + el.goalsHomeTeam < 2.5) {
            colU25++;
          }
          if (el.goalsHomeTeam > el.goalsAwayTeam) {
            colP1++;
          }
          if (el.goalsHomeTeam < el.goalsAwayTeam) {
            colP2++;
          }
          if (el.goalsHomeTeam == el.goalsAwayTeam) {
            colX++;
          }
          if (el.goalsHomeTeam > 0 && el.goalsAwayTeam > 0) {
            colOz++;
          }

        })



        let league_dom = `
              
                <div class="item_elem_league">
            <img class = 'logo' src = '${teamHomeLogo}'/> <h3 class = 'name_team'>${teamHomeName}</h3><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>  <h3 class = 'name_team'>${teamAwayName}</h3> <img class = 'logo' src = '${teamAwayLogo}'/>
            <button class="btn item_roll" type="button" data-toggle="collapse"
            data-target="#collapseExample${el}" aria-expanded="false" aria-controls="collapseExample${el}">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
        </button>  
        </div>
        <div class="collapse" id="collapseExample${el}">

            <div class="card card-body team_league">
           
       
       
        <div class="comparison_teams">
        <h4>Сравнение команд:</h4>
        <div class="team_comparison_teams">
            <img class = 'logo' src = '${teamHomeLogo}'/><h5>${teamHomeName}</h5>  <img class = 'logo' src = '${teamAwayLogo}'/><h5>${teamAwayName}</h5>
        </div>
        <p>Aтакa</p>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: ${attHome}" aria-valuenow="${attHome}" aria-valuemin="0" aria-valuemax="100">${attHome}</div>
            <div class="progress-bar bg-info" role="progressbar" style="width: ${attAway}" aria-valuenow=" ${attAway}" aria-valuemin="0" aria-valuemax="100"> ${attAway}</div>
          </div>
          <p>Защита</p>
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${defHome}" aria-valuenow=" ${defHome}" aria-valuemin="0" aria-valuemax="100"> ${defHome}</div>
              <div class="progress-bar bg-info" role="progressbar" style="width: ${defAway}" aria-valuenow="${defAway}" aria-valuemin="0" aria-valuemax="100">${defAway}</div>
            </div>
            <p>Форма</p>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${formeHome}" aria-valuenow="${formeHome}" aria-valuemin="0" aria-valuemax="100">${formeHome}</div>
                  <div class="progress-bar bg-info" role="progressbar" style="width: ${formeAway}" aria-valuenow="${formeAway}" aria-valuemin="0" aria-valuemax="100">${formeAway}</div>
                </div>
                <p>Победа либо ничья H2H</p>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${h2hHome}" aria-valuenow=" ${h2hHome}" aria-valuemin="0" aria-valuemax="100"> ${h2hHome}</div>
                      <div class="progress-bar bg-info" role="progressbar" style="width: ${h2hAway}" aria-valuenow="${h2hAway}" aria-valuemin="0" aria-valuemax="100">${h2hAway}</div>
                    </div>
                    <p>Распределение Пуасона</p>
                    <div class="progress">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${fishLowHome}" aria-valuenow=" ${fishLowHome}" aria-valuemin="0" aria-valuemax="100"> ${fishLowHome}</div>
                          <div class="progress-bar bg-info" role="progressbar" style="width: ${fishLowAway}" aria-valuenow="${fishLowAway}" aria-valuemin="0" aria-valuemax="100">${fishLowAway}</div>
                        </div>
                        <p>Голы H2H</p>
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${goalsH2hHome}" aria-valuenow=" ${goalsH2hHome}" aria-valuemin="0" aria-valuemax="100"> ${goalsH2hHome}</div>
                              <div class="progress-bar bg-info" role="progressbar" style="width: ${goalsH2hAway}" aria-valuenow="${goalsH2hAway}" aria-valuemin="0" aria-valuemax="100">${goalsH2hAway}</div>
                            </div>
       </div>
       <div class = 'winning_percent'>
       <h5 class = 'winning_percent_header'>Процент исхода:</h5>
       <div class = 'homeDrawsAway'>
      <h5>Победа 1</h5> <h5>Ничья</h5> <h5>Победа 2</h5>
       </div>
       <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: ${percentHome}" aria-valuenow=" ${percentHome}" aria-valuemin="0" aria-valuemax="100"> ${percentHome}</div>
        <div class="progress-bar bg-warning" role="progressbar" style="width: ${percentDraw}" aria-valuenow="${percentDraw}" aria-valuemin="0" aria-valuemax="100">${percentDraw}</div>
        <div class="progress-bar bg-danger" role="progressbar" style="width: ${percentAway}" aria-valuenow="${percentAway}" aria-valuemin="0" aria-valuemax="100">${percentAway}</div>
        </div>
        </div>

        <div class = 'statisic20Matches'>
              <h5>Статистика:</h5>
        <div class = 'statistic20Home'> <img class = 'logo' src = '${teamHomeLogo}'/><p style = 'font-weight: bold;'>${teamHomeName}</p> </div>
        <div class = 'statistic20Data'>Среднее кол-во забитых мячей: <p>${azd}</p></div>
        <div class = 'statistic20Data'>Среднее кол-во пропущенных мячей: <p>${apd}</p></div>
        <div class = 'statistic20Home'> <img class = 'logo' src = '${teamAwayLogo}'/><p style = 'font-weight: bold;'>${teamAwayName}</p> </div>
        <div class = 'statistic20Data'>Среднее кол-во забитых мячей: <p>${bzg}</p></div>
        <div class = 'statistic20Data'>Среднее кол-во пропущенных мячей: <p>${bpg}</p></div>
        </div>

        <div class = 'statistic statistic_last5'>
        <h5>Статистика (5 матчей):</h5>
        <div class = 'statistic_home'>
        <div class = 'statisticHeader'><img class = 'logo' src = '${teamHomeLogo}'/><p style = 'font-weight: bold;'>${teamHomeName}</p> </div>
      
        <div class = 'statisticData'>Форма: <p> ${last5FormeHome}</p></div>
        <div class = 'statisticData'>Среднее кол-во забитых голов: <p>${last5GoalsAvgHome}</p></div>
        <div class = 'statisticData'>Среднее kол-во пропущеных голов: <p>${last5GoalsAgainstAvgHome}</p></div>
        <div class = 'statisticData'>Всего забито голов: <p>${last5GoalsHome}</p></div>
        <div class = 'statisticData'>Всего пропущенно голов: <p>${last5GoalsAgainstHome}</p></div>
        
        </div>

        <div class = 'statistic statistic_away'>
     <div class = 'statisticHeader'><img class = 'logo' src = '${teamAwayLogo}'/><p style = 'font-weight: bold;'>${teamAwayName}</p> </div>
      
        <div class = 'statisticData'>Форма:</li><p> ${last5FormeAway}</p></div>
        <div class = 'statisticData'>Среднее кол-во забитых голов: <p>${last5GoalsAvgAway}</p></div>
        <div class = 'statisticData'>Среднее kол-во пропущеных голов: <p>${last5GoalsAgainstAvgAway}</p></div>
        <div class = 'statisticData'>Всего забито голов: <p>${last5GoalsAway}</p></div>
        <div class = 'statisticData'>Всего пропущенно голов: <p>${last5GoalsAgainstAway}</p></div>
       
        </div>
        </div>
        <div class = 'h2h'>
<h5>Статистика Н2Н:</h5>
<div class = 'addItemH2h'>
<p>В <span  style = 'font-weight: bold;'>${col15}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей тотал ТБ 1.5</p> 
<p>В <span  style = 'font-weight: bold;'>${col25}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей тотал ТБ 2.5</p>
<p>В <span  style = 'font-weight: bold;'>${colU35}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей тотал ТМ 3.5</p>
<p>В <span  style = 'font-weight: bold;'>${colU25}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей тотал ТМ 2.5</p>
<p>В <span  style = 'font-weight: bold;'>${colP1}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей ${nameHome} победил</p>
<p>В <span  style = 'font-weight: bold;'>${colX}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей была ничья</p>
<p>В <span  style = 'font-weight: bold;'>${colP2}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей ${nameAway} победил</p>
<p>В <span  style = 'font-weight: bold;'>${colOz}</span> из <span style = 'font-weight: bold;'>${arrayItemsh2h.length}</span> матчей обе команды забили</p>
</div>
</div>

<div class="text_forecast">
<h5>Прогноз:</h5>
<p  style = 'color: blue; font-weight: bold;'>${forecastRobot}</p>
<div class = 'forecastTranslate'>
<p>Double chance - двойной исход</p>
<p>Or draws - или ничья</p>
<p>And +1.5 goals - и тотал больше 1.5</p>
<p>And -1.5 goals - и тотал меньше 1.5</p>
<p>Winner - победитель</p>
</div>
</div>

<div class="approximate_score">
<h5 class = 'score_header'>Примерный счет матча:</h5>
<div class = 'score_text'><h3>${scoreHome}:</h3><h3>${scoreAway}</h3></div>
</div>

<div class = 'outcome'>
<h5>Рекомендованные ставки</h5>
<div class = 'favorit favoritMatch'>${favorit}</div>
<div class = 'recommended_bets'>
<div class = 'itemBetItog'><p class = 'P1'>Победа 1:</p>${itogP1}</div>
<div class = 'itemBetItog'><p class = 'P2'>Победа 2:  </p>${itogP2}</div>
<div class = 'itemBetItog'><p class = '1X'>Первая не проиграет:   </p>${itog1x}</div>
<div class = 'itemBetItog'><p class = '2X'>Вторая не проиграет:  </p> ${itog2x}</div>
<div class = 'itemBetItog'><p class = 'tb15'>Тотал больше 1.5:   </p>${itogTB15}</div>
<div class = 'itemBetItog'><p class = 'tb25'>Тотал больше 2.5:   </p>${itogTB25}</div>
<div class = 'itemBetItog'><p class = 'tm35'>Тотал меньше 3.5:   </p>${itogTM35}</div>
<div class = 'itemBetItog'><p class = 'tm25'>Тотал меньше 2.5:   </p>${itogTM25}</div>
<div class = 'itemBetItog'><p class = 'it1b1'>ИТ1 больше 1:  </p>${itogIT1B1}</div>
<div class = 'itemBetItog'><p class = 'it2b1'>ИТ2 больше 1: </p> ${itogIT2B1}</div>
<div class = 'itemBetItog'><p class = 'oz'>Обе забьют:   </p>${itogOZ}</div>
<div class = 'itemBetItog'><p class = 'f1_-1'>Фора 1 -1:  </p>${fora_1Home}</div>
<div class = 'itemBetItog'><p class = 'f2_-1'>Фора 2 -1:  </p>${fora_1Away}</div>
<div class = 'itemBetItog'><p class = 'f1_0'>Фора 1 0:  </p>${fora_0Home}</div>
<div class = 'itemBetItog'><p class = 'f2_0'>Фора 2 0:  </p>${fora_0Away}</div>
<div class = 'itemBetItog'><p class = ' win_and'>Победит и не пропустит 1:</p>${WinAndHome}</div>
<div class = 'itemBetItog'><p class = 'win_and'>Победит и не пропустит 2:  </p>${winAndAway}</div>
</div>
</div>


        </div>
            `;


        // Добавляем Английскую примьер лигу в дом

        if (countryName == 'England' && leagueName == 'Premier League') {
          $('.England').show();
          $('.logo_EngPrem').attr('src', leagueLogo);
          $('.name_league_EngPrem').html(leagueName);
          $('.team_league_engPrem').append(league_dom);
          $('.EnglandPremierLeague').attr('class', 'item_league');
          $('.btnLeagueEngPrem').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`);
        }

        if (countryName == 'Spain' && leagueName == 'Primera Division') {
          $('.spain').show();
        $('.logo_SpainPrim').attr('src', leagueLogo);
         $('.name_league_SpainPrim').html(leagueName);
          $('.team_league_spain_la-liga').append(league_dom);
          $('.SpainPrimeraDivision').attr('class', 'item_league');
        $('.btnLeagueSpainPrim').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)
        }

        if (countryName == 'Italy' && leagueName == 'Serie A') {
          $('.italy').show();
          $('.logo_italySeriaA').attr('src', leagueLogo);
          $('.name_league_italySeriaA').html(leagueName);
          $('.team_league_italySeriaA').append(league_dom);
          $('.italySeriaA').attr('class', 'item_league');
          $('.btnLeagueitalySeriaA').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)
        }

        if (countryName == 'Germany' && leagueName == 'Bundesliga 1') {
          $('.germany').show();
         $('.logo_GermanyBundesliga1').attr('src', leagueLogo);
          $('.name_league_GermanyBundesliga1').html(leagueName);
          $('.team_league_GermanyBundesliga1').append(league_dom);
          $('.GermanyBundesliga1').attr('class', 'item_league');
         $('.btnLeagueitalyGermanyBundesliga1').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)

        }

        if (countryName == 'France' && leagueName == 'Ligue 1') {
          $('.france').show();
          $('.logo_france').attr('src', leagueLogo);
          $('.name_league_france').html(leagueName);
          $('.team_league_france').append(league_dom);
          $('.franceLigue1').attr('class', 'item_league');
          $('.btnLeaguefrance').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)

        }

        if (countryName == 'Russia' && leagueName == 'Premier League') {
          $('.russia').show();
          $('.logo_RussiaPrem').attr('src', leagueLogo);
          $('.name_league_RussiaPrem').html(leagueName);
          $('.team_league_RussiaPrem').append(league_dom);
          $('.russiaPremierLeague').attr('class', 'item_league');
          $('.btnLeagueRussiaPrem').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)

        }


        if (countryName == 'Belarus' && leagueName == 'Vysshaya Liga') {
          $('.belarus').show();
          $('.logo_VyshayaLIgaBelarus').attr('src', leagueLogo);
          $('.name_league_VyshayaLIgaBelarus').html(leagueName);
          $('.team_league_VyshayaLIgaBelarus').append(league_dom);
          $('.VyshayaLIgaBelarus').attr('class', 'item_league');
          $('.btnLeagueVyshayaLIgaBelarus').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)
        }

        if (countryName == 'Portugal' && leagueName == 'Primeira Liga') {
          $('.portugal').show();
          $('.logo_portugalPrimeira').attr('src', leagueLogo);
          $('.name_league_portugalPrimeira').html(leagueName);
          $('.team_league_portugalPrimeira').append(league_dom);
          $('.portugalPrimeira').attr('class', 'item_league');
          $('.btnLeagueportugalPrimeira').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)

        }


        if (countryName == 'Netherlands' && leagueName == 'Eredivisie') {
          $('.netherlands').show();
          $('.logo_EersteDivisie').attr('src', leagueLogo);
          $('.name_league_EersteDivisie').html(leagueName);
          $('.team_league_EersteDivisie').append(league_dom);
          $('.EersteDivisie').attr('class', 'item_league');
          $('.btnLeagueEersteDivisie').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)
        }



        if (leagueName == 'UEFA Champions League') {
          $('.worldChampions').show();
          $('.logo_ChampionsLeague').attr('src', leagueLogo);
          $('.name_league_ChampionsLeague').html(leagueName);
          $('.team_league_ChampionsLeague').append(league_dom);
          $('.UEFAChampionsLeague').attr('class', 'item_league');
          $('.btnLeagueChampionsLeague').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)


        }

        if (leagueName == 'UEFA Europa League') {
          $('.worldEuropa').show();
          $('.logo_EuropeLeague').attr('src', leagueLogo);
          $('.name_league_EuropeLeague').html(leagueName);
          $('.team_league_EuropeLeague').append(league_dom);
          $('.UEFAEuropeLeague').attr('class', 'item_league');
          $('.btnLeagueEuropeLeague').html(` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>`)

        }



      }).catch(function (error) {
        console.error(error);
      });
    }
  }).catch(function (error) {
    console.error(error);
  });
}


getProg.addEventListener('click', getAllMatchesOfDate);