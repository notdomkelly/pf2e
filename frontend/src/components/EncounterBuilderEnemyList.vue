<template>
  <div class="q-pa-md">
    <q-table
      title="Enemies"
      :rows="selectedActors"
      :columns="columns"
      row-key="id"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      virtual-scroll-sticky-size-start="48"
      table-colspan="3"
      no-data-label="Add creatures from the list on the left"
      flat hide-pagination
    >
      <template v-slot:body="props">
        <q-tr :props="props" class="SelectedEncounter__Row">
          <q-td key="count" :props="props">
            <div class="row SelectedEncounter__Row__Count">
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="arrow_left"
                padding="none"
                size="10px"
                class="SelectedEncounter__Row__Count_btn"
                @click="() => updateCount(props.row.id, props.row.count - 1)"
              />
              <q-badge rounded color="primary" outline>x{{ props.row.count }}</q-badge>
              <q-btn
                flat
                round
                dense
                color="primary"
                icon="arrow_right"
                padding="none"
                size="10px"
                class="SelectedEncounter__Row__Count_btn"
                @click="() => updateCount(props.row.id, props.row.count + 1)"
              />
            </div>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="level" :props="props">
            {{ props.row.level}}
          </q-td>
          <q-td key="xp" :props="props">
            {{ props.row.xp}} ({{ props.row.xpTotal }})
            <q-btn
              flat
              round
              color="red"
              icon="clear"
              padding="none"
              size="10px"
              class="SelectedEncounter__Row__Delete_btn"
              @click="() => removeActor(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Column } from './models';
import { useStore } from 'src/store';

const columns: Column[] = [
  { name: 'count', label: '', field: 'count', sortable: true, style: 'width: 100px' },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'level', label: 'Level', field: 'level', sortable: true },
  { name: 'xp', label: 'XP', field: 'xp', sortable: true },
]


export default defineComponent({
  name: 'EncounterBuilderEnemyList',
  setup() {
    const store = useStore();

    const updateCount = (actorId: string, newCount: number) => {
      if (newCount < 1) {
        return;
      }
      store.commit('encounterBuilder/updateCount', { actorId, newCount });
    }

    const removeActor = (actorId: string) => {
      store.commit('encounterBuilder/removeActor', { actorId });
    }

    return {
      columns,
      selectedActors: computed(() => store.getters['encounterBuilder/enemiesWithBudget']),
      pagination: ref({
        rowsPerPage: 0
      }),
      updateCount,
      removeActor,
    };
  },
});
</script>

<style lang="scss">
.SelectedEncounter__Row {
  &__Count {
    align-items: center;
    flex-wrap: nowrap;
  }

  &__Delete_btn {
    display: none;
    position: absolute;
    top: 0px;
    right: 1px;
  }

  &:hover .SelectedEncounter__Row__Delete_btn {
    display: unset;
  }
}

</style>
