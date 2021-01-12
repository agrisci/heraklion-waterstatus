FROM tiangolo/uwsgi-nginx-flask:python3.7

ENV UWSGI_CHEAPER 0

ENV UWSGI_PROCESSES 1

COPY api /app

COPY ui/dist/waterstatus /app/waterstatus/static

WORKDIR /app

RUN pip3 install pipenv

RUN pipenv lock --requirements > requirements.txt

RUN pip3 install -r requirements.txt
