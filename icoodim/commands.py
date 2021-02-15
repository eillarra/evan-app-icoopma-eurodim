import click

from icoodim.extensions import cache


@click.command("clear_cache")
def clear_cache():
    """Empties application’s cache."""
    cache.clear()
