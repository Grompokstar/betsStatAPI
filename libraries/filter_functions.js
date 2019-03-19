
function totalGoals(item) {
  let totalGoals;

  if (item.view.scores) {
    totalGoals = parseInt(item.view.scores['2'].home) - parseInt(item.view.scores['2'].away);
    return totalGoals <= 2
  } else {
    return false
  }

}

function goalsDraw(item) {
  return parseInt(item.view.scores['2'].home) === parseInt(item.view.scores['2'].away);
}

function startTB(item) {
  if (item.odds.startTbOdd) {
    let startTotalOdd = item.odds.startTbOdd;


    //let handicaps_1_8 = ['2.5, 3.0', '3.0, 3,5'];
    //let handicaps_1_9 = ['3.5', '3.5, 4.0', '4.0, 4.5', '4.5', '4.5, 5.0', '5.0, 5.5', '5,5', '5.5, 6.0', '6.0, 6.5', '6.5', '6.5, 7.0', '7.0, 7.5', '7.5', '7.5, 8.0', '8.0, 8.5', '8.5'];

    if (startTotalOdd) {
      //let overOd = parseFloat(startTotalOdd.over_od);
      //let handicap = (startTotalOdd.handicap + '').trim();
      let handicapArray = startTotalOdd.handicap.split(',');

      return parseFloat(startTotalOdd.over_od) <= 1.65 && parseFloat(handicapArray[0]) <= 2.5
        || parseFloat(startTotalOdd.over_od) <= 1.875 && parseInt(handicapArray[0]) === 3
        || parseFloat(startTotalOdd.over_od) <= 2 && parseFloat(handicapArray[0]) >= 3.5
    } else {
      return false
    }
  }
}

function startResultOdd(item) {
  if (item.odds['1_1'] && item.scores ) {
    let resultOdds = item.odds['1_1'];
    let startResultOdd = resultOdds[resultOdds.length - 1];

    if (startResultOdd) {
      if (parseFloat(startResultOdd.home_od) < 2 || parseFloat(startResultOdd.away_od) < 2) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

function leagueName(item) {
  if (item.league && item.league.name) {
    let leagueNameFilter = ['50', '60', '70', '80', 'England'];

    return item.league.name.indexOf(leagueNameFilter[0]) === -1
      && item.league.name.indexOf(leagueNameFilter[1]) === -1
      && item.league.name.indexOf(leagueNameFilter[2]) === -1
      && item.league.name.indexOf(leagueNameFilter[3]) === -1
      && item.league.name.indexOf(leagueNameFilter[4]) === -1
      && item.league.name.indexOf(leagueNameFilter[5]) === -1
      && item.league.name.indexOf(leagueNameFilter[6]) === -1
      && item.league.name.indexOf(leagueNameFilter[7]) === -1
  }
}

function attacksBot4(item) {
  if (item.view && item.view.stats && item.view.stats.on_target  && item.view.stats.off_target && item.view.stats.corners && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let goalsOffTargetDiff = 0;

    if (parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]) >= 0) {
      goalsOffTargetDiff = parseInt(item.view.stats.off_target[0]) - parseInt(item.view.stats.off_target[1])
    } else {
      goalsOffTargetDiff = parseInt(item.view.stats.off_target[1]) - parseInt(item.view.stats.off_target[0])
    }

    /*let corners = 0;
    corners = parseInt(item.view.stats.corners[0]) + parseInt(item.view.stats.corners[1]);*/

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let dangerAttacksDiff = 0;
    dangerAttacksDiff = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    return dangerAttacksDiff >= 12 && dangerAttacksSumm >= 21 && (goalsOnTarget >= 3 && goalsOnTargetDiff >= 2  || goalsOnTarget >= 5 && goalsOnTargetDiff >= 1) && goalsOffTargetDiff >= 1 && goalsOffTarget >= 2
  } else {
    return false
  }
}

function attacksBot3(item) {
  if (item.view && item.view.stats && item.view.stats.on_target  && item.view.stats.off_target && item.view.stats.corners && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    /*let corners = 0;
    corners = parseInt(item.view.stats.corners[0]) + parseInt(item.view.stats.corners[1]);*/

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    return (goalsOnTarget >= 3 && goalsOnTargetDiff >= 2  || goalsOnTarget >= 5) && goalsOffTarget >= 1 && attacksSumm >= 38
      && dangerAttacksSumm/attacksSumm >= 0.5
  } else {
    return false
  }
}

function attacksBot3New(item) {
  if (item.view && item.view.stats && item.view.stats.on_target  && item.view.stats.off_target && item.view.stats.corners && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let allGoals = 0;
    allGoals = goalsOnTarget + goalsOffTarget;

    /*let corners = 0;
    corners = parseInt(item.view.stats.corners[0]) + parseInt(item.view.stats.corners[1]);*/

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    return goalsOnTarget >= 3 && goalsOffTarget >= 1 && allGoals >= 5 && attacksSumm >= 32
      && dangerAttacksSumm/attacksSumm >= 0.48 && dangerAttacksSumm/attacksSumm <= 0.68
  } else {
    return false
  }
}

function attacksBot2(item) {
  if (item.view && item.view.stats && item.view.stats.on_target  && item.view.stats.off_target && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let allGoals = 0;
    allGoals = goalsOnTarget + parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let dangerAttacksDiff = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let dangerAttacksKef;
    if (parseInt(item.view.stats.dangerous_attacks[0]) >= parseInt(item.view.stats.dangerous_attacks[1])) {
      dangerAttacksKef = parseInt(item.view.stats.attacks[0])/parseInt(item.view.stats.dangerous_attacks[0])
    } else {
      dangerAttacksKef = parseInt(item.view.stats.attacks[1])/parseInt(item.view.stats.dangerous_attacks[1])
    }

    let favoriteDangerAttacksKef;
    if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      favoriteDangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
    } else {
      favoriteDangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
    }

    return (goalsOnTarget >= 3 && goalsOnTargetDiff >= 2  || goalsOnTarget >= 5) && goalsOffTarget >= 2
      && (item.view.stats.dangerous_attacks[0] <= 10 || item.view.stats.dangerous_attacks[1] <= 10)
      && favoriteDangerAttacksKef >= 2.9
  } else {
    return false
  }
}

function attacksBot1(item) {
  if (item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let dangerAttacksKef;

    if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
    } else {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
    }

    return dangerAttacksDif >= 11 && (goalsOnTarget >= 3 && goalsOnTargetDiff >= 2 ||  goalsOnTarget >= 5 && goalsOnTargetDiff >= 1) && goalsOffTarget >= 1
  } else {
    return false
  }
}

function attacksBotTM(item) {
  if (item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let dangerAttacksKef;

    if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
    } else {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
    }

    return dangerAttacksKef >= 2.3
  } else {
    return false
  }
}

function attacksBotCorporation(item) {
  if (item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);
    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = Math.abs(parseInt(item.view.stats.on_target[0]) - parseInt(item.view.stats.on_target[1]));

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let dangerAttacksKef;

    if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
    } else {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
    }

    return goalsOnTarget >= 3 && goalsOnTargetDiff >= 2 && (goalsOffTarget + goalsOnTarget) >= 5 && dangerAttacksDif >= 9;
  } else {
    return false
  }
}

function attacks(item) {
  //return item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks
  if (item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks) {
    let goalsOnTarget = 0;
    goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

    let goalsOnTargetDiff = 0;
    goalsOnTargetDiff = parseInt(item.view.stats.on_target[1]) - parseInt(item.view.stats.on_target[0]);

    let goalsOffTargetDiff = 0;
    goalsOffTargetDiff = parseInt(item.view.stats.off_target[1]) - parseInt(item.view.stats.off_target[0]);

    let goalsOffTarget = 0;
    goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

    let allGoals = goalsOnTarget + goalsOffTarget;

    let team1AllGoals = 0;
    team1AllGoals = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.off_target[0]);

    let team2AllGoals = 0;
    team2AllGoals = parseInt(item.view.stats.on_target[1]) + parseInt(item.view.stats.off_target[1]);

    let attacksSumm = 0;
    attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

    let dangerAttacksSumm = 0;
    dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

    let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

    let attacksKef = attacksSumm/dangerAttacksSumm;


    let dangerAttacksKef;
    let advantageTeam = '';
    let dangerAttacksDiff = parseInt(item.view.stats.dangerous_attacks[1]) - parseInt(item.view.stats.dangerous_attacks[0]);
    let attacksDiff;


    if (parseInt(item.view.stats.dangerous_attacks[0]) >= parseInt(item.view.stats.dangerous_attacks[1])) {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
      attacksDiff = parseInt(item.view.stats.attacks[0]) - parseInt(item.view.stats.attacks[1]);
      advantageTeam = 'home'
    } else {
      dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
      attacksDiff = parseInt(item.view.stats.attacks[1]) - parseInt(item.view.stats.attacks[0]);
      advantageTeam = 'away'
    }

    let attacksRatioKefHome;
    let attacksRatioKefAway;

    if (parseInt(item.view.stats.attacks[0]) > parseInt(item.view.stats.attacks[1])) {
      attacksRatioKefHome = parseInt(item.view.stats.attacks[0])/parseInt(item.view.stats.attacks[1]);
    } else {
      attacksRatioKefAway = parseInt(item.view.stats.attacks[1])/parseInt(item.view.stats.attacks[0]);
    }

    return (dangerAttacksDiff >= 2 && dangerAttacksSumm >= 17 && attacksSumm >= 27 && allGoals >= 4)
  } else {
    return false
  }
}

function trendAttacks(item) {
  //return item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks
  if (item.trends && item.trends.dangerous_attacks) {

    let homeDangerAttacks;
    let awayDangerAttacks;

    let home45 = _.find(item.trends.dangerous_attacks.home, function(item) {
      return item.time_str === '65'
    })

    let home64 = _.find(item.trends.dangerous_attacks.home, function(item) {
      return item.time_str === '79'
    })

    let away45 = _.find(item.trends.dangerous_attacks.away, function(item) {
      return item.time_str === '65'
    })

    let away64 = _.find(item.trends.dangerous_attacks.away, function(item) {
      return item.time_str === '79'
    })

    if (home45 && home64 && away45 && away64) {
      homeDangerAttacks = home64.val - home45.val;
      awayDangerAttacks = away64.val - away45.val;

      let dangerAttacksKef;

      if (homeDangerAttacks > awayDangerAttacks) {
        dangerAttacksKef = homeDangerAttacks/awayDangerAttacks
      } else {
        dangerAttacksKef = awayDangerAttacks/homeDangerAttacks
      }

      return (dangerAttacksKef >= 1.5)

    } else {
      return false
    }

  } else {
    return false
  }
}

function mapTrendAttacks(item) {
  //return item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks
  if (item.trends && item.trends.dangerous_attacks) {

    let homeDangerAttacks;
    let awayDangerAttacks;

    let home45 = _.find(item.trends.dangerous_attacks.home, function(item) {
      return item.time_str === '65'
    })

    let home64 = _.find(item.trends.dangerous_attacks.home, function(item) {
      return item.time_str === '79'
    })

    let away45 = _.find(item.trends.dangerous_attacks.away, function(item) {
      return item.time_str === '65'
    })

    let away64 = _.find(item.trends.dangerous_attacks.away, function(item) {
      return item.time_str === '79'
    })

    if (home45 && home64 && away45 && away64) {
      homeDangerAttacks = home64.val - home45.val;
      awayDangerAttacks = away64.val - away45.val;

      item.homeDangerAttacks = homeDangerAttacks;
      item.awayDangerAttacks = awayDangerAttacks;

      return item

    } else {
      return false
    }

  } else {
    return false
  }
}

function currentWinner(item) {
  if (item.odds.currentResultOdd) {
    let currentWinnerOdd = item.odds.currentResultOdd;

    if (parseFloat(currentWinnerOdd.away_od) >= 4.25 && parseFloat(currentWinnerOdd.away_od) <= 13) {
      return true
    } else {
      return false
    }

    /*if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      if (parseFloat(currentWinnerOdd.home_od) >= 1.8 && parseFloat(currentWinnerOdd.home_od) <= 2.8) {
        return true
      } else {
        return false
      }
    } else {
      if (parseFloat(currentWinnerOdd.away_od) >= 1.8 && parseFloat(currentWinnerOdd.away_od) <= 2.8) {
        return true
      } else {
        return false
      }
    }*/
  }
}

function startWinnerKef(item) {
  if (item.odds['1_1']) {
    let winnerOdds = item.odds['1_1'];
    let startWinnerOdd = winnerOdds[winnerOdds.length -1];
    //let dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);

    if (parseFloat(startWinnerOdd.home_od) < 1.65 || parseFloat(startWinnerOdd.home_od) < 1.65) {
      return true
    } else {
      return false
    }
  }
}

function halfTimeWinnerOdds(item) {
  //return true
  if (item.odds['1_8'] && item.odds['1_8'][0] && parseFloat(item.odds['1_8'][0].draw_od) > 1) {
    //return true
    let winnerOdds = item.odds['1_8'];
    let currentWinnerOdd = winnerOdds[0];

    if (parseFloat(currentWinnerOdd.draw_od) >= 1.75) {
      return true
    } else {
      return false
    }

    /*if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
      if (parseFloat(currentWinnerOdd.home_od) >= 1.8 && parseFloat(currentWinnerOdd.home_od) <= 2.8) {
        return true
      } else {
        return false
      }
    } else {
      if (parseFloat(currentWinnerOdd.away_od) >= 1.8 && parseFloat(currentWinnerOdd.away_od) <= 2.8) {
        return true
      } else {
        return false
      }
    }*/
  }
}

function favoriteLoses(item) {
  if (item.view.scores && item.view.scores['2'] && item.odds['1_1'] && parseFloat(item.odds['1_1'][0].home_od) > 1) {
    if (parseFloat(item.odds['1_1'][0].home_od) < 2 && item.view.scores['2'].home < item.view.scores['2'].away) {
      return true
    } else if (parseFloat(item.odds['1_1'][0].away_od) < 2 && item.view.scores['2'].home > item.view.scores['2'].away) {
      return true
    }
  } else {
    return false
  }
}


function currentTB1stHalf(item) {
  if (item.odds && item.odds['1_6'] && item.odds['1_6']['0']) {
    if (item.odds['1_6']['0'].over_od <= 1.95) {
      return true;
    } else {
      return false
    }

  } else {
    return false
  }
}


module.exports =  {
  startTB: startTB,
  leagueName: leagueName,
  attacksBot1: attacksBot1,
  attacksBot2: attacksBot2,
  attacksBot3: attacksBot3,
  attacksBot3New: attacksBot3New,
  attacksBot4: attacksBot4,
  attacksBotCorporation: attacksBotCorporation,
  totalGoals: totalGoals,
  attacks: attacks,
  currentWinner: currentWinner,
  startResultOdd: startResultOdd,
  halfTimeWinnerOdds: halfTimeWinnerOdds,
  favoriteLoses: favoriteLoses,
  currentTB1stHalf: currentTB1stHalf,
  goalsDraw: goalsDraw,
  trendAttacks: trendAttacks,
  mapTrendAttacks: mapTrendAttacks,
  attacksBotTM: attacksBotTM,
  startWinnerKef: startWinnerKef

}