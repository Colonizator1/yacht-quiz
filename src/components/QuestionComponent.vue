<template>
  <div>
    <h2>{{ question.id }} - {{ question.text }}</h2>
    <img
      v-if="question.image"
      :src="`/${question.image}`"
      alt="question image"
    />
    <div v-for="(answer, index) in question.answers" :key="index">
      <button
        @click="selectAnswer(answer)"
        :style="{
          backgroundColor:
            selectedAnswer === answer ? (answer.correct ? 'green' : 'red') : '',
          color: selectedAnswer === answer ? 'white' : 'black',
        }"
      >
        {{ answer.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  data() {
    return {
      selectedAnswer: null,
    };
  },
  watch: {
    question() {
      this.selectedAnswer = null;
    },
  },
  methods: {
    selectAnswer(answer) {
      this.selectedAnswer = answer;
      if (answer.correct) {
        setTimeout(() => {
          this.$emit('answer', true);
        }, 1000); // Delay to show the correct answer highlight before moving to the next question
      } else {
        this.$emit('answer', false);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}
img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}
</style>
