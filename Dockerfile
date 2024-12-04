# 基础阶段安装 pnpm
FROM node:20-alpine AS base
RUN npm config set registry https://registry.npmmirror.com \
    && npm i -g pnpm

# 开发阶段
FROM base AS development
ARG APP
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY . .



# 确保所有依赖（包括开发依赖）正常安装
RUN pnpm install

RUN pnpm run build

# 生产阶段
# FROM base AS production
# ARG APP
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /app

# 复制构建后的文件
# COPY --from=development /app/dist/apps/${APP} /app

# COPY package.json .
# COPY --from=development /app/package.json /app/package.json


# 确保仅生产依赖被安装
# RUN pnpm install 

EXPOSE 1996
ENV APP_MAIN_FILE=/app/dist/apps/${APP}/main.js
CMD node ${APP_MAIN_FILE}
# 添加启动命令

