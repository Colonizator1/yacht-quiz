<template>
    <button :class="{ 'on': randomMode }" class="random-mode-button" @click="toggleRandomMode">
      Random <i class="fas" :class="{ 'fa-toggle-on': randomMode, 'fa-toggle-off': !randomMode }"></i>
    </button>
    <div class="controls">
      <input
        type="number"
        v-model="inputQuestionNumber"
        @keyup.enter="loadSpecificQuestion"
        placeholder="Num"
      />
      <button @click="loadSpecificQuestion">Load</button>
    </div>
    <QuestionComponent 
      :question="currentQuestion" 
      @answer="checkAnswer"
      :key="currentIndex"
    />
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
      inputQuestionNumber: null,
      randomMode: true,
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
      if (this.randomMode) {
        this.loadRandomQuestion();
      } else {
        if (this.currentIndex < this.questions.length) {
          this.currentQuestion = this.questions[this.currentIndex];
          this.currentIndex++;
        } else {
          alert('Quiz completed!');
        }
      }
    },
    checkAnswer(isCorrect) {
      if (isCorrect) {
        this.nextQuestion();
      }
    },
    loadRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentQuestion = this.questions[randomIndex];
      this.currentIndex = randomIndex;
    },
    loadSpecificQuestion() {
      const questionNumber = parseInt(this.inputQuestionNumber, 10) - 1;
      if (questionNumber >= 0 && questionNumber < this.questions.length) {
        this.currentQuestion = this.questions[questionNumber];
        this.currentIndex = questionNumber;
      } else {
        alert('Invalid question number');
      }
    },
    toggleRandomMode() {
      this.randomMode = !this.randomMode;
    }
  }
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
.random-mode-button.on {
  background-color: green;
  color: white;
}
.random-mode-button {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 10px;
  font-size: 16px;
}
.controls {
  margin-bottom: 30px;
}
.controls input { max-width: 35px; }
.controls button, .controls input {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}
.controls .fas {
  margin-right: 5px;
}

</style>
