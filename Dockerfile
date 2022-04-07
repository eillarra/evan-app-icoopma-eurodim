FROM python:3.10-slim

EXPOSE 5000

WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -q -r requirements.txt

COPY . /app
