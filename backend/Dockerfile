FROM python:3.4-alpine

# Install the requirements
# NOTE: Do this before the general adding of files so that you don't have to
# reinstall the Python packages every time any file changes
Add requirements.txt .
RUN pip install -r requirements.txt

# Put the backend code in /srv/
ADD . /srv/
WORKDIR /srv/

# Run the app
CMD ./main.py
