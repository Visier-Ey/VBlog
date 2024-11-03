<template>
  <div>
    <LifeChipPhoto v-if="props.chip.type==='photo'"
                   :chipPhoto="props.chip"
    />
    <!--<LifeChipTXT></LifeChipTXT>-->
    <LifeChipVideo v-if="props.chip.type==='video'"
                   :chipVideo="props.chip"
    />
    <LifeChipTXT v-if="props.chip.type==='TXT'"
                 :chipTXT="props.chip"
    />
  </div>

</template>

<script lang="ts" setup>
import LifeChipPhoto from "./components/LifeChipPhoto.vue";
import LifeChipVideo from "./components/LifeChipVideo.vue";
import {Chip} from "./interfaces";
import LifeChipTXT from "./components/LifeChipTXT.vue";

// define the interface of properties
interface Props {
  chip: Chip;
}

// define the properties
const props = defineProps<Props>();
</script>

<style scoped>
div{
  margin: 20px;
}
</style>