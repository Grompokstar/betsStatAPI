//import { filterFunctions } from '../../libraries/filter_functions';
const filterFunctions = require('../../libraries/filter_functions');
const _ = require('lodash');
let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/notes', (req, res, next) => {
    console.log('/notes');
    let dateAt = +new Date(2018, 6, 1)/1000;
    let dateTo = +new Date(2018, 8, 1)/1000;
    db.collection('notes').find({"timer.tm": 20, time: {$gte: dateAt}}, {limit:20000}).toArray(function(e, results){
      if (e) return next(e);
      let filterData = results;
      filterData = _.filter(filterData, filterFunctions.attacksBot3New);
      filterData = _.filter(filterData, filterFunctions.startTB);
      filterData = _.filter(filterData, filterFunctions.leagueName);
      filterData = _.filter(filterData, filterFunctions.currentWinner);
      //filterData = _.filter(filterData, filterFunctions.currentTB1stHalf);
      //filterData = _.filter(filterData, filterFunctions.currentTB1stHalf);
      //filterData = _.filter(filterData, filterFunctions.startWinnerKef);

      res.send(filterData)
    })
  });

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = req.body;
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ 'error': 'An error has occurred' });
      } else {
        console.log(result.ops[0])
        res.send(result.ops[0]);
      }
    });
  });

  function attacks(item) {
    if (item.view && item.view.stats && item.view.stats.on_target && item.view.stats.attacks && item.view.stats.dangerous_attacks && item.odds['1_1'] && parseFloat(item.odds['1_1'][0].home_od) > 1) {
      /*let goalsOnTarget = 0;
      goalsOnTarget = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.on_target[1]);

      let goalsOffTarget = 0;
      goalsOffTarget = parseInt(item.view.stats.off_target[0]) + parseInt(item.view.stats.off_target[1]);

      let team1AllGoals = 0;
      team1AllGoals = parseInt(item.view.stats.on_target[0]) + parseInt(item.view.stats.off_target[0]);

      let team2AllGoals = 0;
      team2AllGoals = parseInt(item.view.stats.on_target[1]) + parseInt(item.view.stats.off_target[1]);

      let attacksSumm = 0;
      attacksSumm = parseInt(item.view.stats.attacks[0]) + parseInt(item.view.stats.attacks[1]);

      let dangerAttacksSumm = 0
      dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

      let dangerAttacksDif = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));

      let attacksKef = attacksSumm/dangerAttacksSumm;*/

      let dangerAttacksSumm = 0;
      dangerAttacksSumm = parseInt(item.view.stats.dangerous_attacks[0]) + parseInt(item.view.stats.dangerous_attacks[1]);

      let dangerAttacksKef;
      let advantageTeam = '';
      let dangerAttacksDiff = Math.abs(parseInt(item.view.stats.dangerous_attacks[0]) - parseInt(item.view.stats.dangerous_attacks[1]));
      let attacksDiff;


      if (parseInt(item.view.stats.dangerous_attacks[0]) > parseInt(item.view.stats.dangerous_attacks[1])) {
        dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[0])/parseInt(item.view.stats.dangerous_attacks[1]);
        attacksDiff = parseInt(item.view.stats.attacks[0]) - parseInt(item.view.stats.attacks[1]);
        advantageTeam = 'home'
      } else {
        dangerAttacksKef = parseInt(item.view.stats.dangerous_attacks[1])/parseInt(item.view.stats.dangerous_attacks[0]);
        attacksDiff = parseInt(item.view.stats.attacks[1]) - parseInt(item.view.stats.attacks[0]);
        advantageTeam = 'away'
      }

      let resultOdds = item.odds['1_1'];
      let startResultOdd = resultOdds[resultOdds.length - 1];
      let oddsKef = parseFloat(startResultOdd.home_od)/parseFloat(startResultOdd.away_od);

      let attacksRatioKefHome;
      let attacksRatioKefAway;

      if (parseInt(item.view.stats.attacks[0]) > parseInt(item.view.stats.attacks[1])) {
        attacksRatioKefHome = parseInt(item.view.stats.attacks[0])/parseInt(item.view.stats.attacks[1]);
      } else {
        attacksRatioKefAway = parseInt(item.view.stats.attacks[1])/parseInt(item.view.stats.attacks[0]);
      }

      //Супер бот
      //return ((dangerAttacksKef >= 3.2 && advantageTeam === 'home' || dangerAttacksKef >= 1.2 && dangerAttacksKef <= 1.5 && advantageTeam === 'away') && dangerAttacksDiff >= 3 && oddsKef >= 0.5 && oddsKef <= 1.2)

      //тедди
      return (advantageTeam === 'away' && dangerAttacksDiff >= 3 && attacksRatioKefAway >= 1.2 && oddsKef >= 0.3 && oddsKef <= 1.2 && dangerAttacksSumm >= 18)
    } else {
      return false
    }
  }
};