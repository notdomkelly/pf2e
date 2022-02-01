import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { EncounterBuilderStateInterface } from './state';
import { Actor, SelectedActor } from 'components/models';

const getters: GetterTree<EncounterBuilderStateInterface, StateInterface> = {
  filteredActors (state) {
    if (state.filter.current === undefined) {
      return state.actors;
    }

    const filters = state.filter.current;

    const nameFilter = (row: Actor) => filters.name === null || row.name.toLowerCase().includes(filters.name.toLowerCase());
    const familyFilter = (row: Actor) => filters.family === null || filters.family.length === 0 || filters.family.includes(row.family);
    const rarityFilter = (row: Actor) => filters.rarity === null || filters.rarity.length === 0 || filters.rarity.includes(row.rarity);
    const sizeFilter = (row: Actor) => filters.size === null || filters.size.length === 0 || filters.size.includes(row.size);
    const typeFilter = (row: Actor) => filters.type === null || filters.type.length === 0 || filters.type.includes(row.type);
    const traitsFilter = (row: Actor) => filters.traits === null || filters.traits.length === 0 || filters.traits.filter(trait => row.traits.includes(trait)).length > 0;
    const levelFilter = (row: Actor) => row.level >= filters.level.min && row.level <= filters.level.max;

    return state.actors.filter(row => {
      return (
        nameFilter(row) && familyFilter(row)&& rarityFilter(row) && sizeFilter(row) && typeFilter(row) && traitsFilter(row) && levelFilter(row)
      );
    });
  },

  averagePartyLevel (state) {
    let numExcl = 0;
    const sum = state.party.reduce((acc, curr) => {
      const level = parseInt(`${curr.level}`);
      if (!level) {
        numExcl++;
        return acc;
      }
      return acc + parseInt(`${curr.level}`);
    }, 0);

    if (numExcl === state.party.length) {
      return 0;
    }

    const trueAverage = sum / (state.party.length - numExcl);

    return Math.round(trueAverage);
  },

  enemiesWithBudget (state, getters) {
    const partyLevel = getters.averagePartyLevel as number;

    const xpCalc = (actorLevel: number): number => {
      const diff = actorLevel - partyLevel;
      if (diff >= 4) { return 160 }
      else if (diff === 3) { return 120}
      else if (diff === 2) { return 80}
      else if (diff === 1) { return 60}
      else if (diff === 0) { return 40}
      else if (diff === -1) { return 30}
      else if (diff === -2) { return 20}
      else if (diff === -3) { return 15}
      else if (diff === -4) { return 10}

      return 0;
    }

    return state.selectedActors.map((actor: SelectedActor) => {
      const xp = xpCalc(actor.level);
      return {
        ...actor,
        xp,
        xpTotal: actor.count * xp,
      };
    });
  },

  xpTotal (state, getters) {
    const enemies = getters.enemiesWithBudget as SelectedActor[];

    return enemies.reduce((acc, curr) => {
      return acc + (curr.xpTotal ?? 0);
    }, 0);
  },

  encounterDifficulty (state, getters) {
    const xp = getters.xpTotal as number;
    const partyDiff = state.party.length - 4;
    const limits = {
      trivial: 40 + (10 * partyDiff),
      low: 60 + (15 * partyDiff),
      moderate: 80 + (20 * partyDiff),
      severe: 120 + (30 * partyDiff),
      extreme: 160 + (40 * partyDiff),
    };

    if (xp <= limits.trivial) { return 'Trivial'; }
    else if (xp <= limits.low) { return 'Low'; }
    else if (xp <= limits.moderate) { return 'Moderate'; }
    else if (xp <= limits.severe) { return 'Severe'; }
    else if (xp <= limits.extreme) { return 'Extreme'; }
    else { return 'NA'; }
  },
};

export default getters;
