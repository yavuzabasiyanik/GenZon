# --- Stage 1: build the React frontend
# react-scripts 4 needs Node 16 (newer Node breaks its webpack 4 build)
FROM node:16-bullseye AS frontend
WORKDIR /react-app
COPY react-app/package.json react-app/package-lock.json ./
RUN npm install --no-audit --no-fund
COPY react-app/ ./
RUN npm run build

# --- Stage 2: Flask backend that serves the API and the built frontend
FROM python:3.9

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=false

WORKDIR /var/www

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt psycopg2==2.9.10

COPY . .
# The wildcard flattens build/static/{js,css,media} into app/static/ so the
# files line up with Flask's /static/ URL (build/ alone would nest them)
COPY --from=frontend /react-app/build/* app/static/

# Render (and most hosts) tell the app which port to listen on via $PORT.
# Migrate, seed an empty database, then start the server.
CMD flask db upgrade && flask seed if-empty && gunicorn app:app --bind 0.0.0.0:${PORT:-8000}
