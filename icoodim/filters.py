from commonmark import commonmark as marked


def markdown_filter(text):
    return marked(text)
