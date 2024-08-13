<template>
  <div class="about-container">
    <h1><v-icon>mdi-dumbbell</v-icon> ZenFit</h1>
    <p>
      Welcome to <strong>ZenFit</strong>, your go-to fitness tracker app designed to help you
      effortlessly log and track your daily fitness activities. Whether you’re aiming to reach new
      fitness goals or simply want to monitor your progress, ZenFit provides you with the tools you
      need to stay on track.
    </p>

    <h3>Our Mission</h3>
    <p>
      At ZenFit, our mission is to empower you to take control of your fitness journey. We believe
      that tracking your activities and setting clear goals are key to achieving a healthier
      lifestyle. That’s why we’ve created an app that is both user-friendly and secure, making it
      easier than ever to stay motivated and reach your targets.
    </p>

    <h3>Features</h3>
    <ul>
      <li>
        <strong>Consolidated Dashboard:</strong> Keep all your daily fitness logs in one place, with
        a comprehensive dashboard that provides a clear overview of your progress.
      </li>
      <li>
        <strong>Manage Your Logs:</strong> Easily upload, edit, and delete your daily fitness logs
        to ensure your data is always accurate and up-to-date.
      </li>
      <li>
        <strong>Secure Authentication:</strong> Your data’s security is our priority. ZenFit uses
        Bearer tokens for authentication, ensuring that your personal information remains protected.
      </li>
    </ul>

    <h3>How It Works</h3>
    <ol>
      <li>
        <strong>Register Your Account:</strong> Sign up with your email ID to create your personal
        account.
      </li>
      <li>
        <strong>Log Your Activities:</strong> Add your daily fitness activities on the activity
        page.
      </li>
      <li>
        <strong>Track Your Progress:</strong> A dashboard will automatically generate and display a
        consolidated view of your data.
      </li>
      <li>
        <strong>Set Your Goals:</strong> Define your fitness targets on the dashboard and use Fit
        Bit to help you stay focused and motivated to achieve them.
      </li>
    </ol>
  </div>
</template>

<script setup></script>

<style scoped>
.about-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background-color: navy;
  border-radius: 10px;
  box-shadow: 10px 8px 5px rgba(0, 0, 0, 0.835);
  color: #ffffff;
  text-align: justify;
  opacity: 0;
  display: block;
  animation: fadeIn 1s both;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
h1 {
  text-align: center;
  color: #00ffea;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.5rem;
  color: #00ffea;
  margin-top: 30px;
}

ul,
ol {
  padding-left: 20px;
  font-size: 1rem;
  line-height: 1.6;
}

li {
  margin-bottom: 10px;
}

ul li {
  font-size: 1.1rem;
  list-style-type: square;
}

ol li {
  font-size: 1.1rem;
  list-style-type: decimal;
}
</style>
