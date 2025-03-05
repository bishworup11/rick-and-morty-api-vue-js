<script setup>
import dev from "../assets/dev.png";
</script>

<template>
  <div class="about-container">
    <div class="content-wrapper">
      <section class="about-section">
        <h1>About Rick and Morty Explorer</h1>
        <p>
          Welcome to the Rick and Morty Character Explorer! This application
          allows you to browse and filter characters from the popular animated
          series "Rick and Morty".
        </p>
      </section>

      <section class="api-section">
        <h2>API Acknowledgment</h2>
        <p>
          This project is powered by the
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rick and Morty API </a
          >, a free RESTful API providing data about characters, locations, and
          episodes from the show.
        </p>
        <p>
          Special thanks to Axel Fuhrmann and the team behind the API for making
          this resource available to the community.
        </p>

        <p>
          Authentication for this project is handled using the
          <a
            href="https://dummyjson.com/docs/auth"
            target="_blank"
            rel="noopener noreferrer"
          >
            DummyJSON Auth API </a
          >. This API provides user authentication, authorization, and token
          management for secure access.
        </p>
      </section>

      <section class="developer-section">
        <h2>About the Developer</h2>
        <div class="developer-info">
          <div class="avatar">
            <!-- Using a public placeholder service instead -->
            <img :src="dev" alt="Developer Avatar" />
          </div>
          <div class="bio">
            <p>
              I'm a passionate front-end developer with a love for Vue.js and
              creative web applications. My focus is on building intuitive,
              responsive user interfaces that provide exceptional user
              experiences.
            </p>
            <p>
              This project was created to showcase my skills in Vue 3,
              TypeScript, and state management with Vuex, while having fun with
              a show I enjoy.
            </p>
          </div>
        </div>
      </section>

      <section class="tech-section">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>Vue.js 3</strong> - Progressive JavaScript framework</li>
          <li>
            <strong>TypeScript</strong> - Strongly typed programming language
          </li>
          <li><strong>Vuex</strong> - State management pattern and library</li>
          <li><strong>Naive UI</strong> - Vue component library</li>
          <li><strong>Axios</strong> - Promise-based HTTP client</li>
          <li><strong>Vue Router</strong> - Official router for Vue.js</li>
          <li>
            <strong>Vue Authentication</strong> - Token-based authentication
            system
          </li>
          <li>
            <strong>Navigation Guard</strong> - Route protection mechanism for
            authentication
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  background: linear-gradient(135deg, #19232e 0%, #0e1420 100%);
  color: #e4e4e4;
  min-height: 100vh;
  padding: 2rem 1rem;
  margin-bottom: -2rem;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

img {
  width: 15rem;
}
section {
  margin-bottom: 3rem;
}

h1 {
  color: #97ce4c;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #44b1e8;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #44b1e8;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

a {
  color: #ff9800;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #ffca28;
  text-decoration: underline;
}

/* Developer section */
.developer-info {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.avatar img {
  border-radius: 50%;
  border: 3px solid #44b1e8;
}

.bio {
  flex: 1;
}

/* Tech section */
.tech-section ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-section li {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Contact section */
.contact-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(151, 206, 76, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.contact-link:hover {
  background-color: rgba(151, 206, 76, 0.2);
  transform: translateY(-2px);
  text-decoration: none;
}

.github-icon {
  color: #ffffff;
}

.linkedin-icon {
  color: #0077b5;
}

.email-icon {
  color: #ff9800;
}

/* Responsive design */
@media (max-width: 768px) {
  .developer-info {
    flex-direction: column;
    text-align: center;
  }

  .contact-links {
    justify-content: center;
  }
}
</style>
