# Kubernetes Networking Explained: Services & Ingress

This guide explains how `Services` and `Ingress` provide stable network endpoints for your ephemeral Pods. It builds on the concepts from our previous guides on [Kubernetes Objects](./kubernetes-objects-overview.md) and [Workloads](./kubernetes-workloads-explained.md).

## 1. Title & One-Line Summary

- **What it is:** `Service` and `Ingress` are Kubernetes objects that define a stable, abstract way to expose an application running in a set of Pods, both within the cluster and to the outside world.
- **Why it matters:** They are the key to building resilient applications, providing a single, durable endpoint to talk to your Pods, even as those Pods are created and destroyed.

## 2. The Problem: Volatile Pods

A [`Pod`](./kubernetes-objects-overview.md) in Kubernetes is not durable. It can crash, be terminated during a node failure, or be replaced during an update. Every time a new `Pod` is created, it gets a **new IP address**.

If you have a "frontend" application that needs to talk to a "backend" application, you can't hardcode the backend Pod's IP address. You need an address that stays the same.

- **Analogy:** In our restaurant, you have three cooks (`Pods`) making the "Stateless Soup." They work at different stations and might change stations throughout the day. The waiters (`frontend`) can't be expected to know which cook is at which station at any given moment. They need a single, predictable place to pick up the soup.

## 3. The Solution: `Service`

A `Service` provides a single, stable IP address and DNS name for a set of Pods.

- **Analogy:** The `Service` is the **pass-through counter** at the front of the kitchen, specifically for the "Stateless Soup." It has a fixed location (`ClusterIP`) and a clear label (`soup-counter`). The waiters always go to the `soup-counter`. Meanwhile, behind the scenes, the kitchen staff ensures that any cook who finishes a bowl of soup places it at that counter.

### How does it work? Selectors!

This is where the magic of labels and selectors comes in.
1. Your `Pods` are given a label (e.g., `app: soup-backend`).
2. Your `Service` is configured with a **selector** that looks for that label (`selector: { app: soup-backend }`).
3. Kubernetes continuously scans for Pods matching that selector and automatically wires them up to the `Service`.

The `Service` isn't a Pod. It's a **logical abstraction**. It's a set of forwarding rules in `kube-proxy` (a process that runs on every Node) that says, "any traffic sent to this Service IP should be load-balanced and forwarded to one of these healthy backend Pod IPs."

## 4. `Service` Types Explained

You asked about the different types. This determines *where* the service is exposed.

### a) `ClusterIP` (Default)

- **What it is:** Exposes the `Service` on an internal IP address *within the cluster*.
- **When to use:** For internal communication between different parts of your application (e.g., your frontend `Service` talking to your backend `Service`). This `Service` is not reachable from outside the cluster.
- **Analogy:** The `soup-counter` is located *inside* the kitchen. Only waiters and other kitchen staff can access it. Customers can't walk up to it.

### b) `NodePort`

- **What it is:** Exposes the `Service` on a static port on the IP address of *every Node* in the cluster.
- **When to use:** For quick, temporary access to your application from the outside world, or for applications that need to handle their own load balancing. You can access it via `<NodeIP>:<NodePort>`.
- **Analogy:** In addition to the internal counter, a small service window (`NodePort`) is opened on the outside wall of *every kitchen area* (`Node`). A customer could walk up to any of these windows to get soup. It's a bit clunky, and they have to know the specific window number (a port between 30000-32767), but it works.

### c) `LoadBalancer`

- **What it is:** The most common way to expose an application to the internet. It provisions an external load balancer from your cloud provider (e.g., an AWS Elastic Load Balancer, a GCP Cloud Load Balancer) and points it to your `Service`.
- **When to use:** For production applications that need to be accessible from the internet.
- **Analogy:** The restaurant opens a dedicated, public-facing **take-out counter** (`LoadBalancer`) at the front of the building. This is the official, well-known address for customers. The take-out staff routes orders from this counter to the internal `soup-counter` (`ClusterIP` Service), which then distributes the request to one of the cooks. This is the most professional setup. A `LoadBalancer` service automatically creates a `NodePort` and `ClusterIP` service to route traffic through.

### d) `ExternalName`

- **What it is:** A special case. It doesn't point to Pods. It creates a DNS CNAME record, mapping the `Service` name to an external domain name.
- **When to use:** To give a `Service` inside your cluster a stable name that points to an external service, like a database managed by a third party (e.g., `rds.amazonaws.com`). This allows your internal applications to use the name `my-database-service` instead of a hardcoded external name.

## 5. Ingress: The Smart Router for HTTP

A `LoadBalancer` `Service` is great, but it's "dumb." It works at Layer 4 (TCP/UDP) and typically requires one public IP per service. This can be expensive and inflexible if you have many services.

An `Ingress` is a "smart" Layer 7 (HTTP/HTTPS) router. It lets you define complex routing rules for multiple services, all running behind a single load balancer and IP address.

- **Analogy:** The `Ingress` is the restaurant's **Maître d'** or host. They stand at the main entrance (the single IP address).
  - When a customer says, "I have a reservation for the **sushi bar**" (`Host: sushi.example.com`), the Maître d' directs them to the sushi service.
  - When a customer says, "I'm here for the **pasta place**" (`Host: pasta.example.com`), they are sent to the pasta service.
  - When a customer says they want to see the menu (`Path: /menu`), they might be sent to a different service than if they wanted to place a take-out order (`Path: /order`).

An `Ingress` is not a `Service` type. It's a separate object that works *with* Services. You need an **Ingress Controller** (like NGINX, Traefik, or HAProxy) running in your cluster to actually implement the routing rules you define in your `Ingress` object.

### `Ingress` Example
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
spec:
  rules:
  - host: "myapp.example.com"
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: my-api-service # Send /api requests to this Service
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-frontend-service # Send all other requests to this Service
            port:
              number: 80
```

## 15. Short TL;DR

- **Service:** Provides a stable IP and DNS name for a group of `Pods`, selected using labels. It's a durable endpoint for ephemeral Pods.
  - **`ClusterIP`:** Internal-only access.
  - **`NodePort`:** Exposes on each Node's IP at a high port.
  - **`LoadBalancer`:** Provisions a cloud load balancer for internet access.
- **Ingress:** An API object that manages external access to the services in a cluster, typically HTTP. It acts as a smart router, allowing you to expose multiple services under a single IP address using host and path-based routing.

This completes the core picture of how Kubernetes objects work together! You have workloads ([`Deployment`](./kubernetes-workloads-explained.md)) running your code in [`Pods`](./kubernetes-objects-overview.md), and you have networking (`Service`, `Ingress`) providing stable access to them.
