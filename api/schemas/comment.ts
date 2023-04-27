export default {
    "name": "comment",
    "type": "document",
    "fields": [
      {
        "name": "content",
        "type": "text"
      },
      {
        "name": "author",
        "type": "string"
      },
      {
        "name": "article",
        "type": "reference",
        "to": [
            {
                "type": "article"
            }
        ]
      },
    ]
  }