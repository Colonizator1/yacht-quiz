<template>
  <div class="home">
    <h1>Yacht Quiz</h1>
    <p>Wybierz typ testu:</p>
    <div class="quiz-options">
      <router-link to="/src-egzamin" class="quiz-card">
        <i class="fas fa-ship"></i>
        <h2>SRC Egzamin</h2>
        <p>REGULAMINY I PODSTAWOWE TERMINY ANGLOJĘZYCZNE STOSOWANE W SŁUŻBIE RADIOKOMUNIKACYJNEJ MORSKIEJ</p>
      </router-link>
      <router-link to="/zaglarz-jachtowy" class="quiz-card">
        <i class="fas fa-satellite-dish"></i>
        <h2>Żeglarz Jachtowy</h2>
        <p>OGÓLNA WIEDZA O SYSTEMIE, PODSYSTEMACH I URZĄDZENIACH RADIOWYCH GMDSS</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: clamp(2em, 5vw, 3em);
  margin-bottom: 20px;
  color: #2c3e50;
}

@media (prefers-color-scheme: dark) {
  h1 {
    color: #e0e0e0;
  }
  
  .home p {
    color: #e0e0e0;
  }
}

.quiz-options {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
  padding: 0 10px;
}

.quiz-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 20px;
  border-radius: 15px;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.quiz-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.quiz-card:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.quiz-card i {
  font-size: clamp(3em, 8vw, 4em);
  margin-bottom: 20px;
}

.quiz-card h2 {
  font-size: clamp(1.3em, 4vw, 1.8em);
  margin-bottom: 15px;
}

.quiz-card p {
  font-size: clamp(0.85em, 2.5vw, 0.95em);
  line-height: 1.5;
  opacity: 0.95;
}

@media (max-width: 768px) {
  .home {
    padding: 20px 10px;
  }
  
  .quiz-options {
    gap: 15px;
    margin-top: 20px;
  }
  
  .quiz-card {
    padding: 25px 15px;
  }
}
</style>
