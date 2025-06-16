// Store buzzwords and their counts
let buzzwords = [];

// DOM Elements
const buzzwordInput = document.getElementById('buzzwordInput');
const buzzwordList = document.getElementById('buzzwordList');
const addBuzzwordButton = document.getElementById('addBuzzwordButton');
const clearBuzzwordsButton = document.getElementById('clearBuzzwordsButton');
const meetingSummaryButton = document.getElementById('meetingSummaryButton');
const meetingSummaryList = document.getElementById('meetingSummaryList');
const summaryContainer = document.getElementById('summaryContainer');

// Add a buzzword
function addBuzzword() {
    const buzzwordText = buzzwordInput.value.trim();
    
    if (buzzwordText === '') {
        alert('Please enter a buzzword');
        return;
    }
    
    // Check if buzzword already exists
    const existingIndex = buzzwords.findIndex(item => item.text.toLowerCase() === buzzwordText.toLowerCase());
    
    if (existingIndex !== -1) {
        // Don't increment here, just alert that it already exists
        alert('This buzzword already exists. Click on it in the list to increment its count.');
    } else {
        // Add new buzzword
        buzzwords.push({ text: buzzwordText, count: 0 });
    }
    
    // Render the updated list
    renderBuzzwordList();
    
    // Clear input
    buzzwordInput.value = '';
    buzzwordInput.focus();
}

// Increment buzzword count when clicked
function incrementBuzzword(index) {
    buzzwords[index].count++;
    renderBuzzwordList();
}

// Remove a buzzword from the list
function removeBuzzword(index, event) {
    // Stop the click event from bubbling up to the parent li element
    event.stopPropagation();
    
    // Remove the buzzword at the given index
    buzzwords.splice(index, 1);
    
    // Re-render the list
    renderBuzzwordList();
}

// Render the buzzword list
function renderBuzzwordList() {
    // Clear existing list
    buzzwordList.innerHTML = '';
    
    // Create list items (no sorting)
    if (buzzwords.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No buzzwords yet. Add some!';
        li.style.fontStyle = 'italic';
        li.style.borderLeft = 'none';
        buzzwordList.appendChild(li);
    } else {
        buzzwords.forEach((buzzword, index) => {
            const li = document.createElement('li');
            
            // Create the container for buzzword text and count
            const textContainer = document.createElement('div');
            textContainer.className = 'text-container';
            textContainer.innerHTML = `<p>${buzzword.text}</p> <span class="count">${buzzword.count}</span>`;
            
            // Create the delete button
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '✕';
            deleteBtn.title = 'Remove this buzzword';
            deleteBtn.addEventListener('click', (e) => removeBuzzword(index, e));
            
            // Add elements to the list item
            li.appendChild(textContainer);
            li.appendChild(deleteBtn);
            
            // Make the text area clickable to increment count
            li.classList.add('clickable');
            textContainer.addEventListener('click', () => incrementBuzzword(index));
            
            buzzwordList.appendChild(li);
        });
    }
}

// Clear all buzzwords
function clearBuzzwords() {
    if (buzzwords.length === 0) {
        return;
    }
    
    if (confirm('Are you sure you want to clear all buzzwords?')) {
        buzzwords = [];
        renderBuzzwordList();
    }
}

// Generate a meeting summary
function generateMeetingSummary() {
    if (buzzwords.length === 0) {
        alert('No buzzwords to summarize.');
        return;
    }
    
    let sortedBuzzwords = [...buzzwords].sort((a, b) => b.count - a.count);
    let topThreeBuzzwords = sortedBuzzwords.slice(0, 3);

    topThreeBuzzwords.forEach((buzzword, index) => {
        const li = document.createElement('li');
        
        // Create the container for buzzword text and count
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        textContainer.innerHTML = `<p>${buzzword.text}</p> <span class="count">${buzzword.count}</span>`;
        
        // Add elements to the list item
        li.appendChild(textContainer);
        
        // Make the text area clickable to increment count
        li.classList.add('clickable');
        textContainer.addEventListener('click', () => incrementBuzzword(index));
        
        meetingSummaryList.appendChild(li);
        summaryContainer.style.display = 'block';
    })
}


// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for hitting Enter in the input field
    buzzwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBuzzword();
        }
    });
    
    // Initialize the list
    renderBuzzwordList();
});



