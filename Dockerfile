# ---- Build & verify stage: run checks + compile the frontend ----
# Building this stage in CI validates lint + tests + the production build
# inside a reproducible container (the same artifact that ships to runtime).
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm lint && pnpm test && pnpm build

# ---- Runtime stage: nginx serves the built SPA ----
# The Movie App is a pure client-side app (TMDB is called from the browser),
# so nginx is all it needs — with a fallback for client-side routes.
FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
