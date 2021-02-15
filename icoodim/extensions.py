from flask_assets import Environment  # type: ignore
from flask_caching import Cache  # type: ignore
from flask_compress import Compress  # type: ignore


assets = Environment()
cache = Cache()
compress = Compress()
