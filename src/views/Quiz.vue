<template>
  <div class="quiz-container">
    <div class="header">
      <router-link to="/" class="back-button">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
      <h1>{{ quizTitle }}</h1>
    </div>
    <button :class="{ 'on': randomMode }" class="random-mode-button" @click="toggleRandomMode">
      Random <i class="fas" :class="{ 'fa-toggle-on': randomMode, 'fa-toggle-off': !randomMode }"></i>
    </button>
    <div class="controls">
      <select v-if="quizType === 'src-egzamin'" v-model="selectedSection" class="section-select">
        <option value="gmdss">GMDSS (1-{{ sectionSizes.gmdss }})</option>
        <option value="regulamnin">Regulamin (1-{{ sectionSizes.regulamnin }})</option>
      </select>
      <input
        type="number"
        v-model="inputQuestionNumber"
        @keyup.enter="loadSpecificQuestion"
        :placeholder="getPlaceholder()"
      />
      <button @click="loadSpecificQuestion">Load</button>
      <span class="question-info">Question {{ currentIndex + 1 }} / {{ questions.length }}</span>
    </div>
    <QuestionComponent 
      :question="currentQuestion" 
      @answer="checkAnswer"
      :key="currentIndex"
    />
  </div>
</template>

<script>
import QuestionComponent from '../components/QuestionComponent.vue';
import srcQuestionsData from '../src_questions.json';
import zaglarzQuestionsData from '../questions.json';

export default {
  name: 'Quiz',
  props: {
    quizType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      questions: [],
      currentQuestion: {},
      currentIndex: 0,
      inputQuestionNumber: null,
      randomMode: true,
      quizTitle: '',
      selectedSection: 'gmdss',
      sectionSizes: {
        gmdss: 0,
        regulamnin: 0
      }
    };
  },
  components: {
    QuestionComponent,
  },
  created() {
    this.loadQuestions();
    this.nextQuestion();
  },
  watch: {
    quizType() {
      this.loadQuestions();
      this.currentIndex = 0;
      this.nextQuestion();
    }
  },
  methods: {
    loadQuestions() {
      if (this.quizType === 'src-egzamin') {
        // Load ALL questions from both sections in src_questions.json
        const gmdssSection = srcQuestionsData.find(section => section.name === 'gmdss');
        const regulaminSection = srcQuestionsData.find(section => section.name === 'regulamnin');
        
        const gmdssQuestions = gmdssSection ? gmdssSection.questions.map(q => ({ ...q, section: 'gmdss' })) : [];
        const regulaminQuestions = regulaminSection ? regulaminSection.questions.map(q => ({ ...q, section: 'regulamnin' })) : [];
        
        this.sectionSizes.gmdss = gmdssQuestions.length;
        this.sectionSizes.regulamnin = regulaminQuestions.length;
        
        // Combine all questions from both sections
        this.questions = [...gmdssQuestions, ...regulaminQuestions];
        this.quizTitle = 'SRC Egzamin - GMDSS & Regulamin';
      } else if (this.quizType === 'zaglarz-jachtowy') {
        // Load directly from questions.json (flat array)
        this.questions = zaglarzQuestionsData;
        this.quizTitle = 'Żeglarz Jachtowy - Znaki i Przepisy';
      } else {
        this.questions = [];
        this.quizTitle = 'Quiz not found';
      }
    },
    nextQuestion() {
      if (this.randomMode) {
        this.loadRandomQuestion();
      } else {
        // Sequential mode: move to next question
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
          this.currentQuestion = this.questions[this.currentIndex];
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
      const questionNumber = parseInt(this.inputQuestionNumber, 10);
      
      if (this.quizType === 'src-egzamin') {
        // For SRC exam, load by section + number
        const sectionQuestions = this.questions.filter(q => q.section === this.selectedSection);
        const maxNumber = sectionQuestions.length;
        
        if (questionNumber >= 1 && questionNumber <= maxNumber) {
          const targetQuestion = sectionQuestions[questionNumber - 1];
          this.currentIndex = this.questions.findIndex(q => q === targetQuestion);
          this.currentQuestion = this.questions[this.currentIndex];
          this.inputQuestionNumber = null;
        } else {
          alert(`Please enter a number between 1 and ${maxNumber} for ${this.selectedSection}`);
        }
      } else {
        // For Zaglarz Jachtowy, use simple indexing
        if (questionNumber >= 1 && questionNumber <= this.questions.length) {
          this.currentIndex = questionNumber - 1;
          this.currentQuestion = this.questions[this.currentIndex];
          this.inputQuestionNumber = null;
        } else {
          alert(`Please enter a number between 1 and ${this.questions.length}`);
        }
      }
    },
    getPlaceholder() {
      if (this.quizType === 'src-egzamin') {
        return `1-${this.sectionSizes[this.selectedSection]}`;
      }
      return `1-${this.questions.length}`;
    },
    toggleRandomMode() {
      this.randomMode = !this.randomMode;
    }
  }
};
</script>

<style scoped>
.quiz-container {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
}

.header {
  position: relative;
  margin-bottom: 30px;
}

.back-button {
  position: absolute;
  left: 20px;
  top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #369970;
}

h1 {
  font-size: 1.8em;
  color: #2c3e50;
  margin: 0;
  padding: 10px 150px;
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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.controls {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.section-select {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #42b983;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.controls input { 
  max-width: 60px; 
}

.controls button, .controls input {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
}

.controls .fas {
  margin-right: 5px;
}

.question-info {
  display: inline-block;
  margin-left: 15px;
  font-weight: bold;
  color: #42b983;
}
</style>
