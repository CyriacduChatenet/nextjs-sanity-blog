export default {
    "name": "articleCategory",
    "type": "object",
    "fields": [
      {
        "name": "article",
        "type": "reference",
        "to": [
          {
            "type": "article"
          }
        ]
      },
      {
        "name": "category",
        "type": "reference",
        "to": [
          {
            "type": "category"
          }
        ]
      }
    ]
  }