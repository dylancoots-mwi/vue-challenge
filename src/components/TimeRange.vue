<template>
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

<script>
export default {
  name: 'TimeRange',
  data: () => ({
    startTime: new Date(),
    endTime: new Date()
  })
}
</script>

<style scoped>

</style>
