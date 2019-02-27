<template>
  <div class="clock">
    <div class="clock__hours" v-text="hours"></div>
    <div class="clock__minutes" v-text="minutes"></div>
    <div class="clock__seconds" v-text="seconds"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    },
    mounted () {
      this.$options.interval = setInterval(this.updateDateTime, 1000);
    },
    beforeDestroy () {
      clearInterval(this.$options.interval);
    },
    methods: {
      updateDateTime () {
        let now = new Date();
        this.hours = this.getZeroPad(now.getHours());
        this.minutes = this.getZeroPad(now.getMinutes());
        this.seconds = this.getZeroPad(now.getSeconds());
      },
      getZeroPad (n) {
        return (parseInt(n, 10) >= 10 ? '' : '0') + n;
      }
    }
  }
</script>

<style scoped>
.clock {
  display: inline-block;
  margin-bottom: 1em;
  user-select: none;
}
.clock__hours,
.clock__minutes,
.clock__seconds {
  background-color: rgba(0 , 0, 0, 0.75);
  display: inline-block;
  color: #2F0;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.1rem 0.7rem;
  text-align: center;
  position: relative;
}
.clock__hours {
  border-right: .1rem solid #ddd;
}
.clock__minutes {
  border-right: .1rem solid #ddd;
}
</style>
