<template>
  <q-table
    class="ActorTable"
    title="Creatures"
    :rows="filteredRows"
    :columns="columns"
    row-key="name"
    virtual-scroll
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    virtual-scroll-sticky-size-start="150"
    @row-click="(evt, row) => clickRow(row)"
    table-colspan="7"
    flat bordered hide-pagination
  >
    <template v-slot:top>
      <div class="row" style="width: 100%">
        <div class="col-2 q-table__title">Creatures</div>
        <EncounterBuilderSelectionFilters />
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '../store';
import { Actor, Column } from './models';
import EncounterBuilderSelectionFilters from 'components/EncounterBuilderSelectionFilters.vue';

const columns: Column[] = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'family', align: 'left', label: 'Family', field: 'family', sortable: true},
  { name: 'rarity', align: 'left', label: 'Rarity', field: 'rarity', sortable: true },
  { name: 'size', align: 'left', label: 'Size', field: 'size', sortable: true },
  { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: true },
  { name: 'traits', align: 'left', label: 'Traits', field: 'traits', format: (valArr: string[]) => valArr.join(', ') },
  { name: 'level', label: 'Level', field: 'level', sortable: true },
]


export default defineComponent({
  name: 'EncounterBuilderSelectionList',
  components: { EncounterBuilderSelectionFilters },
  setup() {
    const store = useStore();
    void store.dispatch('encounterBuilder/fetchActors');

    const clickRow = (actor: Actor) => store.dispatch('encounterBuilder/selectActor', actor);

    return {
      columns,
      filteredRows: computed(() => store.getters['encounterBuilder/filteredActors']),
      clickRow,
      pagination: ref({
        rowsPerPage: 0
      }),
    };
  },
});

</script>

<style lang="scss">
.ActorTable {
  max-height: 87vh;
  width: 100%;

  table {
    table-layout: fixed;

    td {
      white-space: break-spaces;
    }
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    /* bg color is important for th; just specify one */
    background-color: #fff;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0
  }

    /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 150px
  }

  .q-select {
    .q-field__native {
      min-width: 50px;
    }
  }
}
</style>
