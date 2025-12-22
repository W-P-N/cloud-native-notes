# A Study Plan for Understanding DevOps Tools

This document provides a strategic approach to learning the vast landscape of DevOps tools. You do not need to learn every tool. The goal is to develop a strong foundational understanding of the *concepts* and then gain deep, hands-on expertise with a few key, popular tools in each category.

## The Core Strategy: "T-Shaped" Knowledge

Instead of trying to learn all 30+ tools, aim for a "T-shaped" skill set:

*   **Broad, shallow knowledge (the top of the "T"):** Understand what each category of tool does and why it's important (e.g., "What is CI/CD and why do I need it?").
*   **Deep, narrow knowledge (the vertical bar of the "T"):** For each category, pick **one or two** popular, industry-standard tools and learn them well. This hands-on experience is what will make you effective.

---

## How to Study: A Step-by-Step Plan

### Phase 1: Understand the "Why" (1-2 Weeks)

Before you touch any tool, understand the problems they solve.

1.  **Read the concepts:** For each of the six categories you listed (Version Control, CI/CD, Configuration Management, etc.), spend a day understanding its purpose.
    *   What problem does it solve? (e.g., Config Management tools solve the problem of "server drift" and manual server setup).
    *   What are the core principles? (e.g., CI/CD is about automating builds and tests to ship faster).
2.  **Watch introductory videos:** Look for high-level talks on YouTube about "What is CI/CD?", "What is Infrastructure as Code?", etc.

### Phase 2: Foundational Hands-On Skills (4-6 Weeks)

This is where you build your deep knowledge. Focus on the most impactful and widely used tools. If you learn these, you can learn others more easily.

#### 1. Version Control: **Git**
*   **Priority:** **Highest.** This is non-negotiable. Every developer and operations person must know Git.
*   **How to learn:**
    1.  Complete the [Git tutorial](https://git-scm.com/docs/gittutorial).
    2.  Create a GitHub account.
    3.  Practice the daily workflow: `git clone`, `git add`, `git commit`, `git push`, `git pull`.
    4.  Learn branching and merging: `git branch`, `git checkout`, `git merge`.
    5.  Understand how to view history: `git log`, `git diff`.
*   **Which to learn?** **Just Git.** The others are for niche or legacy systems. Bitbucket is just a hosting platform for Git.

#### 2. CI/CD: **Jenkins** or **GitLab CI/CD**
*   **Priority:** High. Automation is the core of DevOps.
*   **How to learn:**
    1.  **Pick one:** GitLab CI/CD is easier to start with if you're already using GitLab. Jenkins is a classic, powerful, and very widely used tool.
    2.  **Set up a simple pipeline:**
        *   Create a simple "Hello World" application in a language you know.
        *   Create a CI/CD pipeline that automatically runs `tests` for your application whenever you push a change with Git.
        *   (Advanced) Add a "deploy" step that simulates deploying your application.
*   **Which to use when?** If your project is on GitLab, use its integrated CI/CD. For more complex, cross-platform, or customized pipelines, Jenkins is a powerful choice.

#### 3. Configuration Management & IaC: **Terraform** and **Ansible**
*   **Priority:** High. This is how you manage infrastructure repeatably.
*   **How to learn:**
    1.  **Start with Terraform:** Use it to provision a simple piece of cloud infrastructure (e.g., an AWS S3 bucket or a DigitalOcean droplet). Understand the `plan`/`apply` lifecycle. This is for *provisioning* infrastructure (creating servers, databases, networks).
    2.  **Then learn Ansible:** Use it to configure the server you provisioned with Terraform. For example, write an Ansible "playbook" that installs a web server (like Nginx) on the server. Ansible is for *configuring* things that are already running.
*   **Which to use when?**
    *   **Terraform:** For building, changing, and versioning infrastructure. Use this to create your cloud resources.
    *   **Ansible/Puppet/Chef:** For configuring software and managing the state of existing servers. Ansible is generally considered the easiest to start with.

#### 4. Containerization: **Docker** and **Kubernetes (K8s)**
*   **Priority:** Very High. This is the modern standard for deploying applications.
*   **How to learn:**
    1.  **Master Docker first:**
        *   Learn to write a `Dockerfile` for your "Hello World" application.
        *   Build an image and run it as a container (`docker build`, `docker run`).
        *   Understand ports, volumes, and basic networking.
    2.  **Then, approach Kubernetes:**
        *   K8s is complex. Start with a managed K8s service from a cloud provider (e.g., GKE, EKS, AKS) or a simple local one like `minikube`.
        *   Learn the basic objects: `Pod`, `Deployment`, `Service`.
        *   Take your Docker image and deploy it to your K8s cluster. Learn how to expose it to the internet with a `Service`.
*   **Which to use when?** Use **Docker** to package your application. Use **Kubernetes** to run and manage your containerized applications at scale.

#### 5. Monitoring & Logging: **Prometheus** and **Grafana**
*   **Priority:** Medium-High. If you can't see what's happening, you can't fix it.
*   **How to learn:**
    1.  Instrument your "Hello World" application to expose some simple metrics (e.g., a counter for requests).
    2.  Install Prometheus and configure it to scrape the metrics from your application.
    3.  Install Grafana, connect it to Prometheus as a data source, and build a simple dashboard to visualize your metrics.
*   **Which to use when?** **Prometheus** is excellent for collecting time-series metrics. **Grafana** is the standard for visualizing them. The ELK stack is more focused on deep log analysis.

#### 6. Collaboration: **Jira** or **Trello**
*   **Priority:** Medium. You'll learn this on the job.
*   **How to learn:**
    *   These are project management tools. You don't need to "study" them deeply in advance.
    *   Create a personal project on Trello to organize a task. Or, if you have access to Jira, create a ticket and move it through the `To Do -> In Progress -> Done` lifecycle.
    *   Understand the *purpose*: tracking work. The tool itself is secondary.

---

## Do I Need to Learn Them All?

**No. Absolutely not.**

*   Focus on the **bolded** tools in the plan above. They are the market leaders and the concepts you learn with them are transferable.
*   The IBM tools, Perforce, SVN, Mercurial, TeamCity, etc., are often found in large enterprises or older, legacy environments. You will learn them if a job requires them, but they are not the place to start for building a modern DevOps skill set.
*   Cloud-specific tools (like AWS ECS, IBM Cloud Kubernetes Service) are variations of the open-source standards. If you learn Kubernetes, you will understand the concepts behind EKS, GKE, and the IBM offerings. Learn the open standard first.

## Summary

1.  **Don't panic.** You don't need to know everything.
2.  **Focus on concepts first.** What problem does this tool category solve?
3.  **Learn one key tool from each category well.** Start with Git, Docker, Terraform, and a CI/CD tool.
4.  **Practice.** Build small, simple projects that use these tools together. The hands-on experience is what matters.
5.  **Specialize later.** Once you are comfortable with the basics, you can explore other tools as needed for a specific job or project.
