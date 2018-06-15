var api = 'http://worldcup.sfg.io/matches/today/?by_date=DESC',
    table = document.querySelector('.table')

function addGame(status, location, homeTeam, homeGoal, awayGoal, awayTeam) {
    var statusTd = document.createElement('td'),
        statusValue = statusTd.textContent = status

    var locationTd = document.createElement('td'),
    locationValue = locationTd.textContent = location

    var homeTeamTd = document.createElement('td'),
        homeTeamValue = homeTeamTd.textContent = homeTeam
    var homeGoalTd = document.createElement('td'),
        homeGoalValue = homeGoalTd.textContent = homeGoal

        homeTeamTd.classList.add('teamTd')
    
    var versusTd = document.createElement('td'),
        versusValue = versusTd.textContent = '-'

    var awayGoalTd = document.createElement('td'),
    awayGoalValue = awayGoalTd.textContent = awayGoal
    var awayTeamTd = document.createElement('td'),
        awayTeamValue = awayTeamTd.textContent = awayTeam

        awayTeamTd.classList.add('teamTd')

    var line = document.createElement('tr')

    line.classList.add('jogo')

    line.appendChild(statusTd)
    line.appendChild(locationTd)
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
              console.log(game)
                var status = game.status,
                    location = game.location,
                    homeTeam = game.home_team.country,
                    homeGoals = game.home_team.goals,
                    awayTeam = game.away_team.country,
                    awayGoals = game.away_team.goals

                    if (status == 'in progress') {
                        var status = game.time
                    }

                    addGame(status, location, homeTeam, homeGoals, awayGoals, awayTeam)

                    var winner = game.winner

                    document.querySelectorAll('.teamTd').forEach(function(td) {
                        if (td.textContent == winner) {
                            td.classList.add('winner')
                        }
                    })

          })
      })
    })
}

fillTable();
setInterval(clearTable, 30000)
setInterval(fillTable, 30000)