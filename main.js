var api = 'http://worldcup.sfg.io/matches/today/?by_date=DESC',
    table = document.querySelector('.table')

function addGame(status, homeTeam, homeGoal, awayGoal, awayTeam) {
    var statusTd = document.createElement('td'),
        statusValue = statusTd.textContent = status

    var homeTeamTd = document.createElement('td'),
        homeTeamValue = homeTeamTd.textContent = homeTeam
    var homeGoalTd = document.createElement('td'),
        homeGoalValue = homeGoalTd.textContent = homeGoal
    
    var versusTd = document.createElement('td'),
        versusValue = versusTd.textContent = '-'

    var awayGoalTd = document.createElement('td'),
    awayGoalValue = awayGoalTd.textContent = awayGoal
    var awayTeamTd = document.createElement('td'),
        awayTeamValue = awayTeamTd.textContent = awayTeam

    var line = document.createElement('tr')

    line.classList.add('jogo')

    line.appendChild(statusTd)
    line.appendChild(homeTeamTd)
    line.appendChild(homeGoalTd)
    line.appendChild(versusTd)
    line.appendChild(awayGoalTd)
    line.appendChild(awayTeamTd)


    table.appendChild(line)
}

function clearTable() {
    document.querySelectorAll('.jogo').forEach(function(game) {
        game.remove()
    })
}

function fillTable() {
    fetch(api)
    .then(function(response) {
      response.json().then(function(games) {
          games.forEach(function(game){
                var status = game.status,
                    homeTeam = game.home_team.country,
                    homeGoals = game.home_team.goals,
                    awayTeam = game.away_team.country,
                    awayGoals = game.away_team.goals

                    if (status == 'in progress') {
                        var status = game.time
                    }

                    console.log(status)
                    addGame(status, homeTeam, homeGoals, awayGoals, awayTeam)
          })
      })
    })
    console.log('working..')
}

fillTable();
setInterval(clearTable, 29500)
setInterval(fillTable, 30000)