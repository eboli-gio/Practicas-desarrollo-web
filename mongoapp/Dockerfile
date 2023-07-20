FROM node:18

RUN mkdir -p /home/app

COPY package.json .
COPY package-lock.json . 

COPY . /home/gebolic1500/mongoapp

EXPOSE 3000

CMD ["node", "/home/gebolic1500/mongoapp/index.js"]

