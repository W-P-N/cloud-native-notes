document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const content = document.getElementById('content');
    let activeLink = null;

    const files = [
        "app-modernization-patterns.md",
        "cloud-deployment-models.md",
        "cloud-native-stack.md",
        "cncf-overview.md",
        "devops-tools-study-plan.md",
        "kubernetes-networking-explained.md",
        "kubernetes-objects-overview.md",
        "kubernetes-pod.md",
        "kubernetes-services.md",
        "kubernetes-workloads-explained.md",
        "kubernetes-workloads.md",
        "modern-dev-practices.md",
        "monolithic-vs-cloud-native.md",
        "README.md",
        "test-driven-development.md"
    ];

    const ul = document.createElement('ul');
    files.sort().forEach(file => {
        if (file.endsWith('.md')) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = file;
            // Prettify the name
            a.textContent = file
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
