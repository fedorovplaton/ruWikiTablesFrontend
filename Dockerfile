FROM node:12.18.1 as build
ENV NODE_ENV production
RUN mkdir /ru_wiki_tables
WORKDIR /ru_wiki_tables
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build"]
FROM nginx:1.21.6
COPY --from=build /ru_wiki_tables/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
