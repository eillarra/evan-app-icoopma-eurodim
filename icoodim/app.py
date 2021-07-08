import os

from flask import Flask
from flask_assets import Bundle  # type: ignore
from werkzeug.middleware.proxy_fix import ProxyFix

from .core.views import core
from .commands import clear_cache
from .extensions import assets, cache, compress, htmlmin
from .filters import markdown_filter


def create_app(config_object="icoodim.settings") -> Flask:
    """Create application factory, as explained here: http://flask.pocoo.org/docs/patterns/appfactories/.
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__, static_folder="static")
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)  # type: ignore
    app.config.from_object(config_object)

    register_extensions(app)
    register_blueprints(app)
    register_commands(app)
    register_jinjas(app)

    return app


def register_blueprints(app) -> None:
    """Register Flask blueprints."""
    app.register_blueprint(core)


def register_commands(app):
    """Register Click commands."""
    app.cli.add_command(clear_cache)


def register_extensions(app):
    """Register Flask extensions."""

    if "REDIS_URL" in os.environ:
        cache_config = {
            "CACHE_TYPE": "redis",
            "CACHE_REDIS_URL": os.environ.get("REDIS_URL"),
            "CACHE_DEFAULT_TIMEOUT": 60 * 60 * 6,  # 6 hours
        }
    else:
        cache_config = {"CACHE_TYPE": "null"}

    assets.init_app(app)
    assets.register("base_css", Bundle("scss/base.scss", filters="pyscss", output="css/base.css"))
    cache.init_app(app, config=cache_config)
    compress.init_app(app)
    htmlmin.init_app(app)


def register_jinjas(app):
    """Jinja globals and filters."""

    app.jinja_env.filters["marked"] = markdown_filter
