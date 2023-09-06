<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Vuetify</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col>
          <div class="text-center">
            <p>{{ output }}</p>
          </div>
          <hr class="mt-5"/>
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-start">
        <v-col cols="3">
          <v-select v-model="frequency" :items="frequencies" variant="outlined" label="select frequency"/>
        </v-col>
        <v-col>
          <v-date-time-picker
            v-model="startDate"
            auto-apply
            :close-on-auto-apply="false"
            :clearable="false"
            :enable-time-picker="false"/>
        </v-col>
        <v-col>
          <v-date-time-picker
            v-model="endDate"
            auto-apply
            :close-on-auto-apply="false"
            :clearable="false"
            :enable-time-picker="false"/>
        </v-col>
      </v-row>
      <v-row v-if="frequency === 'weekly'">
        <v-col>
          <v-select
            v-model="weeklyOn"
            :items="days"
            variant="outlined"
            label="on days"
            multiple/>
        </v-col>
        <v-col>
          <div>
            <v-text-field
              v-model="numOfWeeks"
              label="every number of weeks"
              min="1"
              type="number"
              variant="outlined"/>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="frequency !== 'never'" class="d-flex align-center justify-start">
        <v-col cols="auto">
          <v-select
            v-model="timeType"
            :items="timeTypes"
            variant="outlined"
            label="time selection type"/>
        </v-col>
        <v-col cols="auto">
          <v-text-field
            v-if="timeType === 'incremental'"
            v-model="increment"
            label="increment (minutes)"
            step="5"
            type="number"
            variant="outlined"/>
        </v-col>
        <template v-if="timeType === 'incremental'">
          <v-col>
            <v-date-time-picker
              v-model="startTime"
              auto-apply
              :close-on-auto-apply="false"
              :clearable="false"
              time-picker
              :is-24="false"
            />
          </v-col>
          <v-col>
            <v-date-time-picker
              v-model="endTime"
              auto-apply
              :close-on-auto-apply="false"
              :clearable="false"
              time-picker
              :is-24="false"
            />
          </v-col>
        </template>
      </v-row>
      <template v-if="timeType === 'specific'">
        <hr class="mb-5"/>
        <v-row>
          <v-col cols="12">
            <v-btn variant="outlined" text="add time" @click="addSpecificTimeRange" color="green"/>
          </v-col>
        </v-row>
        <v-row v-for="(range, index) in specificTimeRanges">
          <v-time-range/>
          <v-col cols="auto">
            <v-btn variant="tonal" @click="() => removeSpecificTimeRange(index)">
              <v-icon icon="mdi-minus-circle" color="red"/>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-responsive>
  </v-container>
</template>

<script setup>
  import {computed, ref} from 'vue'

  const frequencies = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const months = ['january','february','march','april','may','june','july','august','september','october','november', 'december'];
  const timeTypes = ['incremental', 'specific'];
  // reactive state
  const frequency = ref(frequencies[0]);
  const timeType = ref(timeTypes[0]);
  const startDate = ref(new Date());
  const startTime = ref(new Date());
  const endDate = ref(new Date());
  const endTime = ref(new Date());
  const increment = ref(0);
  const weeklyOn = ref(days[0]);
  const numOfWeeks = ref(1);
  const specificTimeRanges = ref([{ start: '00:00', end: '00:00' }]);


  const output = computed(() => {
    if (frequency.value === 'never') {
      return 'no events';
    }

    const diffHours = (start, end) =>
      (new Date(`1970-01-01T${end}Z`).getTime() -
        new Date(`1970-01-01T${start}Z`).getTime()) /
      (1000 * 60 * 60);

    const getNumEvents = () => {
      let events = 0;
      let diffDays =
        (endDate.value.getTime() - startDate.value.getTime()) /
        (1000 * 60 * 60 * 24);
      if (timeType.value === 'incremental') {
        let incDiffHours = diffHours(startDate.value, endDate.value);
        let eventsPerDay = Math.floor(incDiffHours / (increment.value / 60));
        events = eventsPerDay * diffDays;
      } else {
        for (const range of specificTimeRanges.value) {
          let rangeDiffHours = diffHours(range.start, range.end);
          events += rangeDiffHours * diffDays;
        }
      }
      return events || 0;
    };

    return `${frequency.value} events, starting on ${startDate.value.toLocaleDateString()}, ending on ${endDate.value.toLocaleDateString()} (${getNumEvents()} events would be created)`;
  });

  const addSpecificTimeRange = () => specificTimeRanges.value.push({ start: '00:00', end: '00:00' });
  const removeSpecificTimeRange = (index) => specificTimeRanges.value.splice(index, 1);

</script>
