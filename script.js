document.addEventListener('DOMContentLoaded', async () => {
    const navMenu = document.getElementById('nav-menu');
    const content = document.getElementById('content');
    let activeLink = null;

    const files = await fetch('./articles.json').then((resp) => resp.json());

    const ul = document.createElement('ul');
    files.sort().forEach(file => {
        if (file.link.endsWith('.md')) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = file.link;
            // Prettify the name
            a.textContent = file.title
                .replace('.md', '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            li.appendChild(a);
            ul.appendChild(li);
        }
    });
    navMenu.appendChild(ul);

    async function loadContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            content.innerHTML = marked.parse(markdown);
        } catch (error) {
            content.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        }
    }

    navMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetLink = event.target;
            
            if (activeLink) {
                activeLink.classList.remove('active');
            }
            targetLink.classList.add('active');
            activeLink = targetLink;
            
            loadContent(targetLink.getAttribute('href'));
        }
    });

    // Load README.md by default
    const readmeLink = navMenu.querySelector('a[href="README.md"]');
    if (readmeLink) {
        readmeLink.click();
    }
});
