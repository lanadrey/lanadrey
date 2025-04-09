document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const closeModal = document.getElementById('closeModal');
    const postForm = document.getElementById('postForm');
    const postContainer = document.getElementById('postContainer');
    const postCreatedMessage = document.getElementById('postCreatedMessage');
    const clearPostsBtn = document.getElementById('clearPostsBtn');

    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.forEach(post => {
        addPostToDOM(post);
    });

    clearPostsBtn.addEventListener('click', function () {
        // Clear posts from localStorage
        localStorage.removeItem('posts');
        // Clear posts from the DOM
        postContainer.innerHTML = '';
    });

    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        createPostModal.style.display = 'none';
    });

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validation
        const postCategory = document.getElementById('postCategory').value;
        const postTitle = document.getElementById('postTitle').value;
        const postDescription = document.getElementById('postDescription').value;

        if (postCategory.trim() === '' || postTitle.trim() === '' || postDescription.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Get the current date
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const year = currentDate.getFullYear();
        const formattedDate = day + ' ' + month + ' ' + year;

        // Create a new post object
        const newPost = {
            postCategory,
            postTitle,
            postDescription,
            formattedDate
        };

        // Save the post to localStorage
        savedPosts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(savedPosts));

        // Add the post to the DOM
        addPostToDOM(newPost);

        // Show post created message
        postCreatedMessage.style.display = 'block';

        // Close the modal
        createPostModal.style.display = 'none';

        // Reset the form
        postForm.reset();

        setTimeout(() => {
            postCreatedMessage.style.display = 'none';
        }, 3000);
    });

    function addPostToDOM(post) {
        const newPostElement = document.createElement('div');
        newPostElement.className = 'post-box';
        newPostElement.innerHTML = `
            <h1 class="post-title" data-title="${post.postTitle}">${post.postTitle}</h1>
            <h2 class="category">${post.postCategory}</h2>
            <span class="post-date">${post.formattedDate}</span>
            <p class="post-description">${post.postDescription}</p>
            <button class="delete-post" data-title="${post.postTitle}">Delete</button>
        `;
        postContainer.appendChild(newPostElement);
    }

    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-post')) {
            const postTitle = event.target.getAttribute('data-title');

            // Remove the post from localStorage
            const updatedPosts = savedPosts.filter(post => post.postTitle !== postTitle);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            // Remove the post from the DOM
            event.target.closest('.post-box').remove();
            // Update savedPosts variable to current state 
            savedPosts.length = 0; //
