FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /server
COPY . /server

RUN pip install --upgrade pip && pip install -r requirements.txt uvicorn


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]