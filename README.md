This website uses [Flask](http://flask.pocoo.org/).

Application dependencies
------------------------
The application uses [Pipenv](https://docs.pipenv.org/) to manage Python packages:

    $ pipenv install --dev
    $ pipenv shell

Update dependencies (and manually update `requirements.txt`):

    $ pipenv update --dev && pipenv lock -r

Running the server
------------------
    $ flask run

Style guide
-----------
Tab size is 4 **spaces**. Maximum line length is 120. All changes should pass `flake8`.
