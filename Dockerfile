# Usa un'immagine di base contenente un sistema operativo Linux, ad esempio Ubuntu
FROM ubuntu:latest

# Imposta l'area geografica predefinita per non richiedere input interattivi durante l'installazione dei pacchetti
ENV DEBIAN_FRONTEND=noninteractive

# Aggiorna il sistema e installa le dipendenze necessarie
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    php-gd \
    php-mbstring \
    php-xml \
    php-curl \   
    composer \
    unzip \
    mysql-server \
    && curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y \
    nodejs \
    yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Imposta la password di root per il database MySQL (sostituisci "password" con la tua password desiderata)
RUN echo "mysql-server mysql-server/root_password password password" | debconf-set-selections \
    && echo "mysql-server mysql-server/root_password_again password password" | debconf-set-selections

# Copia tutti i file del tuo progetto nella directory di lavoro del container
WORKDIR /app
COPY . .

# Avvia il servizio MySQL e configura il database
RUN service mysql start \
    && mysql -u root -ppassword -e "CREATE DATABASE laravel_challenge; GRANT ALL PRIVILEGES ON laravel_challenge.* TO 'root'@'localhost'; FLUSH PRIVILEGES;"

# Installa le dipendenze del frontend
WORKDIR /app/frontend
RUN yarn install --non-interactive

# Installa le dipendenze del backend e genera la chiave dell'app Laravel
WORKDIR /app/backend
RUN mv -f .env.example .env
RUN composer update --no-interaction --ignore-platform-req=ext-curl --optimize-autoloader 
RUN composer install --no-interaction --ignore-platform-req=ext-curl --optimize-autoloader \
    && php artisan key:generate \
    && php artisan migrate:fresh --seed \
    && php artisan jwt:secret
# Espone la porta 3000 per il frontend
EXPOSE 3000

# Avvia i servizi backend e frontend
CMD php artisan serve & cd /app/frontend && yarn dev