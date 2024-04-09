# Usa un'immagine di base contenente un sistema operativo Linux, ad esempio Ubuntu
FROM ubuntu:latest

# Aggiorna il sistema e installa le dipendenze necessarie
RUN apt-get update && apt-get install -y curl gnupg2 && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y curl gnupg2 && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn &&  \
    apt-get install -y \
    apache2 \
    php \
    libapache2-mod-php \
    php-mysql \
    php-gd \
    php-mbstring \
    php-xml \
    composer \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \

# Aggiorna il sistema e installa MySQL Server
RUN apt-get update && apt-get install -y mysql-server

# Imposta la password di root per il database MySQL (sostituisci "password" con la tua password desiderata)
RUN echo "mysql-server mysql-server/root_password password password" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password password" | debconf-set-selections

# Copia tutti i file del tuo progetto nella directory di lavoro del container
WORKDIR /app

COPY . .

RUN service mysql start && mysql -u root -ppassword -e "CREATE DATABASE laravel; CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON laravel.* TO 'user'@'localhost'; FLUSH PRIVILEGES;"

RUN cd frontend && yarn install --non-interactive

RUN cd backend  && composer install --no-interaction --optimize-autoloader

RUN cd backend  && php artisan key:generate
RUN cd backend  && php artisan migrate
RUN cd backend  && php artisan db:seed --class=DatabaseSeeder

EXPOSE 3000

CMD ["mysqld"]

WORKDIR /backend

CMD ["php", "artisan", "serve"]

WORKDIR /frontend

CMD ["yarn", "dev"]

