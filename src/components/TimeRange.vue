<template>
  <v-col>
    <v-date-time-picker
      v-model="startTime"
      auto-apply
      :close-on-auto-apply="false"
      :clearable="false"
      time-picker
      :is-24="false"
      @update:model-value="(value) => handleTimeChange(value, 'start')"
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
      @update:model-value="(value) => handleTimeChange(value, 'end')"
    />
  </v-col>
</template>

<script>
export default {
  name: 'TimeRange',
  emits: ['time-change'],
  data: () => ({
    startTime: {hours: 0, minutes: 0},
    endTime: {hours: 0, minutes: 0}
  }),
  methods: {
    handleTimeChange(value, type) {
      this.$emit('time-change', { value, type });
    }
  }
}
</script>

<style scoped>

</style>
