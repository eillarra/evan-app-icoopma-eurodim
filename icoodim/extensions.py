from flask_assets import Environment  # type: ignore
from flask_caching import Cache  # type: ignore
from flask_compress import Compress  # type: ignore
from flask_htmlmin import HTMLMIN  # type: ignore


assets = Environment()
cache = Cache()
compress = Compress()
htmlmin = HTMLMIN()
