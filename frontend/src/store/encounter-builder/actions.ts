import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { EncounterBuilderStateInterface } from './state';

import rows from '../../../public/actors.json';
import { flatten, maxBy, minBy, uniq, uniqBy } from 'lodash';
import { Actor, Filters, PartyMember, SelectedActor } from 'components/models';


const actions: ActionTree<EncounterBuilderStateInterface, StateInterface> = {
  fetchActors ({ commit, dispatch }) {
    const actors = rows.actors.map(actor => {
      return { ...actor, level: parseInt(actor.level) };
    });
    commit('setActors', { actors });

    void dispatch('updateFilters');
  },

  updateFilters ({ commit, state }) {
    const uniqueFamily = uniqBy(state.actors, 'family').map((row: Actor) => row.family).sort();
    const uniqueType = uniqBy(state.actors, 'type').map((row: Actor) => row.type).sort();
    const allTraits: string[] = flatten(state.actors.map((row: Actor) => row.traits));
    const uniqueTraits = uniq(allTraits).sort();

    const filterOptions: Partial<Filters> = {
      'family': uniqueFamily,
      'rarity': ['Common', 'Uncommon', 'Rare', 'Unique'],
      'size': ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'],
      'type': uniqueType,
      'traits': uniqueTraits,
      'level': {
        min: minBy(state.actors, 'level')?.level ?? -1,
        max: maxBy(state.actors, 'level')?.level ?? 20
      },
    };

    commit('setFilterOptions', { options: filterOptions });
    commit('setDefaultFilter');
  },

  selectActor ({ commit }, actor: Actor) {
    const id = actor.name.replace(/\s+/g, '').slice(0, 5) + '-' + Math.random().toString().slice(2)

    const newActor: SelectedActor = {
      ...actor,
      id,
      count: 1,
    };

    commit('addActor', { newActor });
  },

  removeActor ({ commit }, actorId: string) {
    commit('removeActor', { actorId });
  },

  createPartyMember ({ commit }) {
    const id = 'pm-' + Math.random().toString().slice(2);

    const newMember: PartyMember = {
      id,
      name: 'Hero',
      level: 1,
    };

    commit('addPartyMember', { newMember });
  },

  removePartyMember ({ commit }, memberId: string) {
    commit('removePartyMember', { memberId });
  },

};

export default actions;
