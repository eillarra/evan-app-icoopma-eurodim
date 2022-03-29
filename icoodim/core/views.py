import os

from flask import Blueprint, render_template, send_from_directory

from icoodim.extensions import cache


core: Blueprint = Blueprint("core", __name__, static_folder="static", template_folder="templates")


@core.route("/")
@cache.cached()
def conference():
    return render_template("core/conference.html")


@core.route("/doctoral-school/")
@cache.cached()
def school():
    return render_template("core/school.html")


@core.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(core.root_path, "static"), "favicon.ico")
