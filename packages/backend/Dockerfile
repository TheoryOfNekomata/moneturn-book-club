FROM guergeiro/pnpm:22-8-alpine AS base
ENV NODE_ENV=production
COPY . .
RUN pnpm install
RUN pnpm dlx pridepack build
EXPOSE 8080
CMD ["pnpm", "start"]
