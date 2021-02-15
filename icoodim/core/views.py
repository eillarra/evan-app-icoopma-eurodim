import os
import requests

from flask import Blueprint, jsonify, render_template, request, send_from_directory
from itertools import groupby

from icoodim.extensions import cache
from icoodim.settings import EVAN_ID


core: Blueprint = Blueprint("core", __name__, static_folder="static", template_folder="templates")


def get_evan_response():
    evan_url = os.environ.get("EVAN_URL", f"https://evan.ugent.be/api/v1/events/{EVAN_ID}/")
    contents_url = f"{evan_url}contents/"

    print(evan_url, contents_url)

    res = requests.get(evan_url).json()
    res["tracks"] = {track["id"]: track for track in res["tracks"]}

    return {
        "sessions": groupby(res.pop("sessions", []), lambda x: x["date"]),
        "contents": {content["key"]: content for content in requests.get(contents_url).json()},
        "event": res,
    }


@core.route("/")
@cache.cached()
def homepage():
    return render_template("core/onepage.html", **get_evan_response())


@core.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(core.root_path, "static"), "favicon.ico")


@core.route("/hooks/cc/", methods=["POST"])
def clear_cache():
    if request.headers.get("SpaceX") != "test":
        res = {"status": 403}
    else:
        try:
            res = {"status": 200}
            cache.clear()
        except Exception as e:
            res = {"status": 500, "error": str(e)}

    return jsonify(res), res["status"]
