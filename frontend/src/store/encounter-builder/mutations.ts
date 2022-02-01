import { MutationTree } from 'vuex';
import { EncounterBuilderStateInterface } from './state';
import { Actor, Filters, PartyMember, SelectedActor } from 'components/models';

interface SetActorsPayload {
  actors: Actor[];
}

interface SetFilterOptionsPayload {
  options: Partial<Filters>
}

interface UpdateFilterPayload {
  filterKey: keyof Filters;
  newValue: never;
}

interface AddActorPayload {
  newActor: SelectedActor
}

interface RemoveActorPayload {
  actorId: string
}

interface UpdateCountPayload {
  actorId: string,
  newCount: number,
}

interface AddMemberPayload {
  newMember: PartyMember;
}

interface RemoveMemberPayload {
  memberId: string;
}

interface UpdateMemberPayload {
  memberId: string;
  key: keyof PartyMember;
  value: never;
}

const mutation: MutationTree<EncounterBuilderStateInterface> = {
  setActors (state: EncounterBuilderStateInterface, { actors }: SetActorsPayload) {
    state.actors = actors;
  },

  setFilterOptions (state: EncounterBuilderStateInterface, { options }: SetFilterOptionsPayload) {
    state.filter.options = options;
  },

  setDefaultFilter (state: EncounterBuilderStateInterface) {
    state.filter.current = {
      'name': '',
      'family': [],
      'rarity': [],
      'size': [],
      'type': [],
      'traits': [],
      'level': state.filter.options.level ?? { min: -1, max: 20 },
    };
  },

  updateFilter (state: EncounterBuilderStateInterface, { filterKey, newValue }: UpdateFilterPayload) {
    if (state.filter.current === undefined) {
      return;
    }
    state.filter.current[filterKey] = newValue;
  },

  addActor (state: EncounterBuilderStateInterface, { newActor }: AddActorPayload) {
    state.selectedActors.push(newActor)
  },

  removeActor(state: EncounterBuilderStateInterface, { actorId }: RemoveActorPayload) {
    state.selectedActors = state.selectedActors.filter(actor => actor.id !== actorId);
  },

  updateCount(state: EncounterBuilderStateInterface, { actorId, newCount }: UpdateCountPayload) {
    const actor = state.selectedActors.find(actor => actor.id === actorId);
    if (actor === undefined) {
      return;
    }

    actor.count = newCount;
  },

  addPartyMember (state: EncounterBuilderStateInterface, { newMember }: AddMemberPayload) {
    state.party.push(newMember)
  },

  removePartyMember(state: EncounterBuilderStateInterface, { memberId }: RemoveMemberPayload) {
    state.party = state.party.filter(actor => actor.id !== memberId);
  },

  updatePartyMember(state: EncounterBuilderStateInterface, { memberId, key, value }: UpdateMemberPayload) {
    const member = state.party.find(actor => actor.id === memberId);
    if (member === undefined) {
      return;
    }

    member[key] = value;
  }
};

export default mutation;
