<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="social-links">
        <a
          href="https://github.com/bishworup11"
          target="_blank"
          aria-label="GitHub"
        >
          <i class="fab fa-github"></i>
        </a>
        <a
          href="https://linkedin.com/in/bishworup11"
          target="_blank"
          aria-label="LinkedIn"
        >
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:bishworupmolllik@gmail.com" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
      </div>

      <!-- Copyright -->
      <p class="copyright">
        © {{ new Date().getFullYear() }}| Bishworup Mollik | All Rights
        Reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1e1e1e, #3a3a3a);
  color: white;
  padding: 20px 0;
  text-align: center;
  font-size: 1rem;
  margin-top: 2rem;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.social-links {
  display: flex;
  gap: 15px;
  width: 10rem;
}

.social-links a {
  color: white;
  font-size: 1.5rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-links a:hover {
  color: #ff9800;
  transform: scale(1.2);
}

/* Copyright Text */
.copyright {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    font-size: 0.9rem;
  }

  .social-links a {
    font-size: 1.3rem;
  }
}
</style>
