FROM node:18-alpine

WORKDIR /app

# Instalar dependencias necesarias incluyendo openssl
RUN apk add --no-cache openssl python3 make g++

COPY package*.json ./

# Instalar react-hot-toast explícitamente
RUN npm install && npm install react-hot-toast

COPY . .

EXPOSE 5173

# Configurar variables de entorno para Node
ENV NODE_ENV=development
ENV NODE_OPTIONS=--openssl-legacy-provider

# Agregar --force para asegurar que inicie incluso con warnings
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--force"]