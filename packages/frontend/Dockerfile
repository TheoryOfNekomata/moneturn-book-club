FROM guergeiro/pnpm:22-8-alpine AS base
ENV NODE_ENV=production
COPY . .
RUN pnpm install
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
