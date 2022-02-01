import { Actor, Filters, PartyMember, SelectedActor } from 'components/models';

export interface EncounterBuilderStateInterface {
  actors: Actor[];
  selectedActors: SelectedActor[];
  party: PartyMember[];
  filter: {
    options: Partial<Filters>;
    current?: Filters;
  };
}

function state(): EncounterBuilderStateInterface {
  return {
    actors: [],
    selectedActors: [],
    party: [
      { id: '1', name: 'Hero 1', level: 1, },
      { id: '2', name: 'Hero 2', level: 1, },
      { id: '3', name: 'Hero 3', level: 1, },
      { id: '4', name: 'Hero 4', level: 1, },
    ],
    filter: {
      options: {
        'family': [],
        'rarity': [],
        'size': [],
        'type': [],
        'traits': [],
        'level': {
          min:  -1,
          max: 20,
        },
      },
      current: undefined,
    },
  }
}

export default state;
