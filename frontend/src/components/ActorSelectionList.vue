<template>
  <div class="q-pa-md">
    <q-table
      style="height: 75vh"
      title="Creatures"
      :rows="rows"
      :columns="columns"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Column } from './models';

import rows from '../../public/actors.json';

const columns: Column[] = [
  { name: 'name', required: true, label: 'Name', field: 'name', sortable: true },
  { name: 'family', label: 'Family', field: 'family', sortable: true },
  { name: 'rarity', label: 'Rarity', field: 'rarity', sortable: true },
  { name: 'size', label: 'Size', field: 'size', sortable: true },
  { name: 'type', label: 'Type', field: 'type', sortable: true },
  { name: 'traits', label: 'Traits', field: 'traits', format: (valArr: string[]) => valArr.join(', ') },
  { name: 'level', label: 'Level', field: 'level', sortable: true, },
]


export default defineComponent({
  name: 'ActorSelectionList',
  setup() {
    return {
      columns,
      rows: rows.actors,

      pagination: ref({
        rowsPerPage: 0
      }),
    };
  },
});

</script>
