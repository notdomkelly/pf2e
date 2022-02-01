<template>
  <q-page class="row items-start justify-evenly">
    <div class="column col-8 q-pa-md" style="height: 90vh">
      <EncounterBuilderSelectionList />
    </div>
    <div class="column col q-pa-md" style="height: 90vh">
      <q-card flat bordered class="EncounterCard">
        <q-card-section>
          <div class="text-h6">Encounter</div>
          Total XP: {{ xpTotal }}
          <br />
          Encounter Difficulty: {{ difficulty }}
        </q-card-section>
        <q-separator inset />

        <EncounterBuilderPartyList />

        <q-separator inset />

        <EncounterBuilderEnemyList />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/store';
import EncounterBuilderSelectionList from 'components/EncounterBuilderSelectionList.vue';
import EncounterBuilderEnemyList from 'components/EncounterBuilderEnemyList.vue';
import EncounterBuilderPartyList from 'components/EncounterBuilderPartyList.vue';

export default defineComponent({
  name: 'EncounterBuilderIndex',
  components: { EncounterBuilderPartyList, EncounterBuilderEnemyList, EncounterBuilderSelectionList },
  setup() {
    const store = useStore();

    return {
      xpTotal: computed(() => store.getters['encounterBuilder/xpTotal']),
      difficulty: computed(() => store.getters['encounterBuilder/encounterDifficulty']),
    };
  }
});
</script>
