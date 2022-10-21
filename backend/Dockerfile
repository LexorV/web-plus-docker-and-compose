FROM node:16-alpine AS builder

# создание директории приложения
WORKDIR /app
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./ 
RUN npm i 
COPY . .
RUN npm run build
FROM node:16-alpine as production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i pm2 -g \
&& npm i ---omit=dev \
&& npm i @nestjs/config
COPY --from=builder /app/dist ./dist/ 
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js



# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

# копируем исходный код
EXPOSE 4000
CMD [ "pm2-runtime", "start", "ecosystem.config.js"]