FROM node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true


WORKDIR /usr/src/app
RUN mkdir generatedHTML generatedPDF




COPY package*.json ./

RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*


RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm","run", "start"]
