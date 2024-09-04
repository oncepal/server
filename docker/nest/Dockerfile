# 基础阶段安装 pnpm
FROM node:20-alpine AS base 
RUN npm i -g pnpm 

# 开发阶段
FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}
WORKDIR /apps/${APP}
COPY package.json pnpm-lock.yaml ./ 
RUN pnpm install 
COPY . . 
RUN pnpm run build ${APP}  

# 生产阶段
FROM base AS production 
ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /apps/${APP}
COPY package.json pnpm-lock.yaml ./ 
RUN pnpm install --prod 
COPY --from=development /usr/src/app/dist ./dist 
 
# 添加要保存的环境 ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}