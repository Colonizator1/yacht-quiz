<template>
  <div class="question-container">
    <h2 class="question-text">{{ question.id }} - {{ question.text }}</h2>
    <img
      v-if="question.image"
      :src="`/${question.image}`"
      alt="question image"
      class="question-image"
    />
    <div v-for="(answer, index) in question.answers" :key="index" class="answer-wrapper">
      <button
        class="answer-button"
        @click="selectAnswer(answer)"
        :class="{
          'answer-correct': selectedAnswer === answer && answer.correct,
          'answer-incorrect': selectedAnswer === answer && !answer.correct
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
.question-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.question-text {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: clamp(1em, 4vw, 1.3em);
}

.question-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

.answer-wrapper {
  margin: 10px 0;
}

.answer-button {
  width: 100%;
  margin: 5px 0;
  padding: 15px;
  font-size: clamp(0.9em, 3vw, 1em);
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #ffffff;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.answer-button:hover {
  background-color: #f0f0f0;
  border-color: #42b983;
}

.answer-correct {
  background-color: #4caf50 !important;
  color: white !important;
  border-color: #4caf50 !important;
}

.answer-incorrect {
  background-color: #f44336 !important;
  color: white !important;
  border-color: #f44336 !important;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .question-text {
    color: #e0e0e0;
  }
  
  .answer-button {
    background-color: #2c2c2c;
    color: #e0e0e0;
    border-color: #555;
  }
  
  .answer-button:hover {
    background-color: #3a3a3a;
    border-color: #42b983;
  }
  
  .answer-correct {
    background-color: #4caf50 !important;
    color: white !important;
  }
  
  .answer-incorrect {
    background-color: #f44336 !important;
    color: white !important;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .question-container {
    padding: 10px;
  }
  
  .answer-button {
    padding: 12px;
  }
}
</style>
