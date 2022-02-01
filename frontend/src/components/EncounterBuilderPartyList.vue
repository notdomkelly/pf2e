<template>
  <div class="q-pa-md">
    <q-table
      title="Party"
      :rows="party"
      :columns="columns"
      row-key="id"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      virtual-scroll-sticky-size-start="48"
      table-colspan="3"
      no-data-label="Add party members"
      flat hide-pagination dense
    >
      <template v-slot:top>
        <div class="column">
          <div class="q-table__title">Party</div>
          Average Level: {{ averageLevel }}
        </div>
        <q-space />
        <q-btn
          flat round dense
          icon="person_add"
          @click="addPartyMember"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="PartyMember__Row">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit :model-value="props.row.name">
              <q-input
                :model-value="props.row.name" dense autofocus counter
                @update:model-value="(newValue) => updatePartyMember(props.row.id, 'name', newValue)"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="level" :props="props">
            {{ props.row.level }}
            <q-popup-edit :model-value="props.row.level" v-slot="scope">
              <q-input
                :model-value="props.row.level" dense autofocus counter
                type="number"
                @update:model-value="(newValue) => updatePartyMember(props.row.id, 'level', newValue)"
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
            <q-btn
              flat
              round
              color="red"
              icon="clear"
              padding="none"
              size="10px"
              class="PartyMember__Row__Delete_btn"
              @click="() => removePartyMember(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Column, PartyMember } from './models';
import { useStore } from 'src/store';

const columns: Column[] = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'level', label: 'Level', field: 'level', sortable: true },
]

export default defineComponent({
  name: 'EncounterBuilderPartyList',
  setup() {
    const store = useStore();

    const addPartyMember = () => { void store.dispatch('encounterBuilder/createPartyMember') };
    const removePartyMember = (id: string) => { void store.dispatch('encounterBuilder/removePartyMember', id) };
    const updatePartyMember = (id: string, key: keyof PartyMember, value: never) =>
    {
      store.commit('encounterBuilder/updatePartyMember', { memberId: id, key, value });
    };

    const party = computed(() => store.state.encounterBuilder.party);
    const averageLevel = computed(() => store.getters['encounterBuilder/averagePartyLevel']);

    return {
      columns,
      party,
      pagination: ref({
        rowsPerPage: 0
      }),
      addPartyMember,
      removePartyMember,
      updatePartyMember,
      averageLevel,
    }
  }
});
</script>

<style lang="scss">
.PartyMember__Row {
  &__Delete_btn {
    display: none;
    position: absolute;
    top: 0px;
    right: 1px;
  }

  &:hover .PartyMember__Row__Delete_btn {
    display: unset;
  }
}

</style>
