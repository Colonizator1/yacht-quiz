<template>
<div id="app">
  <QuestionComponent 
    :question="currentQuestion" 
    @answer="checkAnswer"
    :key="currentIndex"
  />
</div>
</template>

<script>
import QuestionComponent from './components/QuestionComponent.vue';
import questions from './questions.json';

export default {
data() {
  return {
    questions,
    currentQuestion: {},
    currentIndex: 0,
  };
},
components: {
  QuestionComponent,
},
created() {
  this.nextQuestion();
},
methods: {
  nextQuestion() {
    if (this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex];
      this.currentIndex++;
    } else {
      alert('Quiz completed!');
    }
  },
  checkAnswer(isCorrect) {
    if (isCorrect) {
      this.nextQuestion();
    }
  }
}
};
</script>

<style>
#app {
text-align: center;
margin-top: 60px;
}
</style>
