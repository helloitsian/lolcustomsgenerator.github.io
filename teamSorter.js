const BRONZE = "BRONZE";
const SILVER = "SILVER";
const GOLD = "GOLD";
const PLAT = "PLAT";
const DIAMOND = "DIAMOND";
const MASTERS = "MASTERS";
const GRAND_MASTERS = "GRAND_MASTERS";
const CHALLENGER = "CHALLENGER";

const TOP = "TOP";
const JUNGLE = "JUNGLE";
const MID = "MID";
const BOT = "BOT";
const SUPPORT = "SUPPORT";
const FILL = "FILL";

const RANK_VALUES = {
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
  PLAT: 4,
  DIAMOND: 5,
  MASTERS: 6,
  GRAND_MASTERS: 7,
  CHALLENGER: 8,
};

// let players = [
//   { name: "sean", rank: PLAT, primaryRole: BOT, secondaryRole: MID },
//   { name: "garrett", rank: PLAT, primaryRole: TOP, secondaryRole: SUPPORT },
//   { name: "tyler", rank: DIAMOND, primaryRole: FILL, secondaryRole: TOP },
//   { name: "ian", rank: GOLD, primaryRole: BOT, secondaryRole: MID },
//   { name: "tori", rank: PLAT, primaryRole: SUPPORT, secondaryRole: BOT },
//   { name: "dark", rank: GOLD, primaryRole: MID, secondaryRole: TOP },
//   { name: "martine", rank: PLAT, primaryRole: FILL, secondaryRole: MID },
//   { name: "xavier", rank: PLAT, primaryRole: BOT, secondaryRole: MID },
//   { name: "toilet", rank: SILVER, primaryRole: TOP, secondaryRole: MID },
//   { name: "seabass", rank: BRONZE, primaryRole: BOT, secondaryRole: MID },
// ];

const assignPlayerRankValues = (players) => {
  return players.map((player) => {
    player.rankValue = RANK_VALUES[player.rank];
    return player;
  });
}

const sortPlayersByRankValue = () => {
  return players.sort((a, b) => {
    return a.rankValue - b.rankValue;
  });
}

const seperatePlayersByRole = (players) => {
  let topPlayers = [];
  let junglePlayers = [];
  let midPlayers = [];
  let botPlayers = [];
  let supportPlayers = [];
  let fillPlayers = [];

  let topSecondaryPlayers = [];
  let jungleSecondaryPlayers = [];
  let midSecondaryPlayers = [];
  let botSecondaryPlayers = [];
  let supportSecondaryPlayers = [];

  players.forEach((player) => {
    switch (player.primaryRole) {
      case TOP:
        topPlayers.push(player);
        break;
      case JUNGLE:
        junglePlayers.push(player);
        break;
      case MID:
        midPlayers.push(player);
        break;
      case BOT:
        botPlayers.push(player);
        break;
      case SUPPORT:
        supportPlayers.push(player);
        break;
      case FILL:
        fillPlayers.push(player);
        break;
    }
    switch (player.secondaryRole) {
      case TOP:
        topSecondaryPlayers.push(player);
        break;
      case JUNGLE:
        jungleSecondaryPlayers.push(player);
        break;
      case MID:
        midSecondaryPlayers.push(player);
        break;
      case BOT:
        botSecondaryPlayers.push(player);
        break;
      case SUPPORT:
        supportSecondaryPlayers.push(player);
        break;
    }
  });

  return {
    topPlayers,
    junglePlayers,
    midPlayers,
    botPlayers,
    supportPlayers,
    fillPlayers,
    topSecondaryPlayers,
    jungleSecondaryPlayers,
    midSecondaryPlayers,
    botSecondaryPlayers,
    supportSecondaryPlayers,
  };
};

const rollForRole = (rolePlayers) => {
  let diceRolls = [];

  diceRolls = rolePlayers.map((player) => {
    return {
      player,
      roll: Math.random(),
    };
  });

  diceRolls = diceRolls.sort((a, b) => {
    return a.roll - b.roll;
  });

  const finalPlayers = {
    chosen: [],
    notChosen: [],
  };

  diceRolls.forEach((roll, index) => {
    if (index <= 1) {
      finalPlayers.chosen.push(roll.player);
    } else {
      finalPlayers.notChosen.push(roll.player);
    }
  });

  return finalPlayers;
};

const fillTeamSlotsByRole = (chosenPlayers, notChosenPlayers, fillPlayers) => {
  let teamOne = {
    top: null,
    jungle: null,
    mid: null,
    bot: null,
    support: null,
  };

  let teamTwo = {
    top: null,
    jungle: null,
    mid: null,
    bot: null,
    support: null,
  };
  // handle chosen players for primary role
  chosenPlayers.forEach((player) => {
    switch (player.primaryRole) {
      case TOP:
        if (!teamOne.top) teamOne.top = player;
        else teamTwo.top = player;
        break;
      case JUNGLE:
        if (!teamOne.jungle) teamOne.jungle = player;
        else teamTwo.jungle = player;
        break;
      case MID:
        if (!teamOne.mid) teamOne.mid = player;
        else teamTwo.mid = player;
        break;
      case BOT:
        if (!teamOne.bot) teamOne.bot = player;
        else teamTwo.bot = player;
        break;
      case SUPPORT:
        if (!teamOne.support) teamOne.support = player;
        else teamTwo.support = player;
        break;
    }
  });

  // handle secondary roles
  notChosenPlayers.forEach((player) => {
    switch (player.secondaryRole) {
      case TOP:
        if (!teamOne.top) teamOne.top = player;
        else if (!teamTwo.top) teamTwo.top = player;
        // auto fill player
        else fillPlayers.push(player);
        break;
      case JUNGLE:
        if (!teamOne.jungle) teamOne.jungle = player;
        else if (!teamTwo.top) teamTwo.jungle = player;
        // auto fill player
        else fillPlayers.push(player);
        break;
      case MID:
        if (!teamOne.mid) teamOne.mid = player;
        else if (!teamTwo.mid) teamTwo.mid = player;
        // auto fill player
        else fillPlayers.push(player);
        break;
      case BOT:
        if (!teamOne.bot) teamOne.bot = player;
        else if (!teamTwo.bot) teamTwo.bot = player;
        // auto fill player
        else fillPlayers.push(player);
        break;
      case SUPPORT:
        if (!teamOne.support) teamOne.support = player;
        else if (!teamTwo.support) teamTwo.support = player;
        // auto fill player
        else fillPlayers.push(player);
        break;
    }
  });

  // handle fill players
  Object.entries(teamOne).forEach(([role, value], index) => {
    if (!value) teamOne[role] = fillPlayers.shift();
  });

  Object.entries(teamTwo).forEach(([role, value]) => {
    if (!value) teamTwo[role] = fillPlayers.shift();
  });

  return {
    teamOne,
    teamTwo,
  };
};

const generateTeamsByRole = (players) => {
  let {
    topPlayers,
    junglePlayers,
    midPlayers,
    botPlayers,
    supportPlayers,
    fillPlayers,
  } = seperatePlayersByRole(players);

  let chosenTopPlayers = rollForRole(topPlayers);
  let chosenJunglePlayers = rollForRole(junglePlayers);
  let chosenMidPlayers = rollForRole(midPlayers);
  let chosenBotPlayers = rollForRole(botPlayers);
  let chosenSupportPlayers = rollForRole(supportPlayers);

  let chosenPlayers = [
    ...chosenTopPlayers.chosen,
    ...chosenJunglePlayers.chosen,
    ...chosenMidPlayers.chosen,
    ...chosenBotPlayers.chosen,
    ...chosenSupportPlayers.chosen,
  ];

  let notChosenPlayers = [
    ...chosenTopPlayers.notChosen,
    ...chosenJunglePlayers.notChosen,
    ...chosenMidPlayers.notChosen,
    ...chosenBotPlayers.notChosen,
    ...chosenSupportPlayers.notChosen,
  ];

  const { teamOne, teamTwo } = fillTeamSlotsByRole(
    chosenPlayers,
    notChosenPlayers,
    fillPlayers
  );

  return {
    teamOne,
    teamTwo,
  };
};

const calcTeamValue = (team) => {
  return Object.values(team).reduce((teamValue, player) => {
    return teamValue + player.rankValue;
  }, 0);
};

const teamToPlayerArray = (team) => {
  return Object.entries(team).map(([role, player]) => {
    player.assignedRole = role;
    return player;
  });
};

const balanceTeamsByRank = (teamOne, teamTwo) => {
  let balancedTeamOne = {
    top: null,
    jungle: null,
    mid: null,
    bot: null,
    support: null,
  };
  let balancedTeamTwo = {
    top: null,
    jungle: null,
    mid: null,
    bot: null,
    support: null,
  };
  const teamOnePlayers = teamToPlayerArray(teamOne);
  const teamTwoPlayers = teamToPlayerArray(teamTwo);
  const mergedPlayers = [...teamOnePlayers, ...teamTwoPlayers];

  let alternate = false;
  let secondAlternate = false;
  let thirdAlternate = false;
  let clonedMergedPlayers = [...mergedPlayers].sort(
    (a, b) => a.rankValue - b.rankValue
  );

  while (clonedMergedPlayers.length) {
    let player = null;
    if (alternate) {
      if (secondAlternate) {
        player = clonedMergedPlayers.pop();

        if (!balancedTeamOne[player.assignedRole])
          balancedTeamOne[player.assignedRole] = player;
        else if (!balancedTeamTwo[player.assignedRole])
          balancedTeamTwo[player.assignedRole] = player;

        secondAlternate = false;
      } else {
        player = clonedMergedPlayers.shift();

        if (!balancedTeamOne[player.assignedRole])
          balancedTeamOne[player.assignedRole] = player;
        else if (!balancedTeamTwo[player.assignedRole])
          balancedTeamTwo[player.assignedRole] = player;

        secondAlternate = true;
      }

      alternate = false;
    } else {
      if (thirdAlternate) {
        player = clonedMergedPlayers.pop();

        if (!balancedTeamTwo[player.assignedRole])
          balancedTeamTwo[player.assignedRole] = player;
        else if (!balancedTeamOne[player.assignedRole])
          balancedTeamOne[player.assignedRole] = player;

        thirdAlternate = false;
      } else {
        player = clonedMergedPlayers.shift();

        if (!balancedTeamTwo[player.assignedRole])
          balancedTeamTwo[player.assignedRole] = player;
        else if (!balancedTeamOne[player.assignedRole])
          balancedTeamOne[player.assignedRole] = player;

        thirdAlternate = true;
      }
      alternate = true;
    }
  }

  return {
    balancedTeamOne,
    balancedTeamTwo,
  };
};