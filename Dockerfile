FROM node:25-alpine3.22

# 2. Directorio de trabajo (Crea la carpeta y se mete en ella)
WORKDIR /home/app

# 3. Copiamos los archivos de dependencias primero para proteger la caché
# Usamos el asterisco para agarrar el package.json y el package-lock.json
COPY package*.json ./

# 4. Instalamos las dependencias DENTRO del contenedor
# Nota: Como es Alpine, esto generará los binarios correctos para este Linux
RUN npm install

# 5. Copiamos el resto del código (index.js y demás)
# Gracias al .dockerignore, NO se copiará el node_modules de tu Debian
COPY . .

# 6. Comando de arranque
CMD ["node", "index.js"]