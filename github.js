const container = document.getElementById('github-calendar');

// Replace 'YourUsername' with your actual GitHub username
const username = 'shubhambhargav10';

// GitHub API URL to fetch contributions data
const githubApiUrl = `https://api.github.com/users/${username}/events`;

fetch(githubApiUrl)
    .then(response => response.json())
    .then(data => {
        // Filter events to only include PushEvent (repository contributions)
        const pushEvents = data.filter(event => event.type === 'PushEvent');

        // Create an object to store contribution data for each day
        const contributionsData = {};

        // Process push events and count contributions for each day
        pushEvents.forEach(event => {
            const date = event.created_at.split('T')[0];
            contributionsData[date] = (contributionsData[date] || 0) + 1;
        });

        // Create a table to display the contribution data
        const table = document.createElement('table');
        table.classList.add('github-calendar');

        for (const date in contributionsData) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.style.backgroundColor = contributionsData[date] > 0 ? 'green' : 'white';
            tr.appendChild(td);
            table.appendChild(tr);
        }

        container.appendChild(table);
    })
    .catch(error => {
        console.error('Error fetching GitHub data:', error);
    });
