<template>
  <div class="col q-gutter-md row">
    <q-input
      v-model="filters.name"
      label="Name"
      clearable
    />
    <q-select
      v-model="filters.family"
      :options="filterOptions.family"
      label="Family"
      clearable
      multiple
      use-chips
    />
    <q-select
      v-model="filters.rarity"
      :options="filterOptions.rarity"
      label="Rarity"
      clearable
      multiple
      use-chips
    />
    <q-select
      v-model="filters.size"
      :options="filterOptions.size"
      label="Size"
      clearable
      multiple
      use-chips
    />
    <q-select
      v-model="filters.type"
      :options="filterOptions.type"
      label="Type"
      clearable
      multiple
      use-chips
    />
    <q-select
      v-model="filters.traits"
      :options="filterOptions.traits"
      label="Traits"
      clearable
      multiple
      use-chips
    />
    <div class="col" style="min-width: 100px;">
      <q-range
        v-model="filters.level"
        :min="filterOptions.level.min"
        :max="filterOptions.level.max"
        :step="1"
        drag-range
        label
        markers
        snap
     />
      <div class="q-field__label no-pointer-events ellipsis" style="text-align: center">Level</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '../store';
import { Filters } from 'components/models';


function useFilters() {
  const store = useStore();

  const updateFilter = (filterKey: string, newValue: unknown) => store.commit('encounterBuilder/updateFilter', { filterKey, newValue});

  const getComputed = (key: keyof Filters) => computed({
    get(): unknown { return store.state.encounterBuilder.filter.current?.[key] ?? null },
    set(newValue: unknown) { updateFilter(key, newValue) },
  });

  return {
    filters: ref({
      name: getComputed('name'),
      family: getComputed('family'),
      rarity: getComputed('rarity'),
      size: getComputed('size'),
      type: getComputed('type'),
      traits: getComputed('traits'),
      level: getComputed('level'),
    })
  }
}


export default defineComponent({
  name: 'EncounterBuilderSelectionFilters',
  setup() {
    const store = useStore();
    return {
      filterOptions: computed(() => store.state.encounterBuilder.filter.options),
      ...useFilters(),
    };
  },
});
</script>
