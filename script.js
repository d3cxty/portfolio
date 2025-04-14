// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Blog Management
const blogForm = document.getElementById("blog-form");
const blogPostsContainer = document.getElementById("blog-posts");
const dashboardPostsContainer = document.getElementById("dashboard-posts");
const editIndexInput = document.getElementById("edit-index");
const submitBlogButton = document.getElementById("submit-blog");

// Load blogs from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function renderBlogs() {
  // Clear containers
  blogPostsContainer.innerHTML = "";
  dashboardPostsContainer.innerHTML = "";

  // Render public blog posts
  blogs.forEach((blog, index) => {
    const post = document.createElement("div");
    post.className = "blog-post";
    post.innerHTML = `
            <h3>${blog.title}</h3>
            <p><strong>${blog.date}</strong></p>
            <p>${blog.content.substring(0, 100)}...</p>
        `;
    blogPostsContainer.appendChild(post);

    // Render dashboard posts
    const dashPost = document.createElement("div");
    dashPost.className = "blog-post";
    dashPost.innerHTML = `
            <h3>${blog.title}</h3>
            <p><strong>${blog.date}</strong></p>
            <p>${blog.content.substring(0, 100)}...</p>
            <button onclick="editBlog(${index})">Edit</button>
        `;
    dashboardPostsContainer.appendChild(dashPost);
  });
}

// Handle blog form submission
blogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("blog-title").value;
  const date = document.getElementById("blog-date").value;
  const content = document.getElementById("blog-content").value;
  const editIndex = editIndexInput.value;

  if (editIndex === "") {
    // Add new blog
    blogs.push({ title, date, content });
  } else {
    // Update existing blog
    blogs[parseInt(editIndex)] = { title, date, content };
  }

  // Save to localStorage
  localStorage.setItem("blogs", JSON.stringify(blogs));

  // Reset form
  blogForm.reset();
  editIndexInput.value = "";
  submitBlogButton.textContent = "Add Post";

  // Re-render blogs
  renderBlogs();
});

// Edit blog
function editBlog(index) {
  const blog = blogs[index];
  document.getElementById("blog-title").value = blog.title;
  document.getElementById("blog-date").value = blog.date;
  document.getElementById("blog-content").value = blog.content;
  editIndexInput.value = index;
  submitBlogButton.textContent = "Update Post";
}

// Initial render
renderBlogs();

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
const contactMessage = document.getElementById("contact-message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Basic validation
  if (name.length < 2) {
    contactMessage.textContent = "Name must be at least 2 characters.";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    contactMessage.textContent = "Please enter a valid email.";
    return;
  }
  if (message.length < 10) {
    contactMessage.textContent = "Message must be at least 10 characters.";
    return;
  }

  // Success message
  contactMessage.textContent = "Message sent successfully!";
  contactForm.reset();

  // Clear message after 3 seconds
  setTimeout(() => {
    contactMessage.textContent = "";
  }, 3000);
});
