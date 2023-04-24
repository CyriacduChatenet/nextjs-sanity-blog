export default {
    name: 'article',
    type: 'document',
      title: 'Article',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'slug',
        type: 'string',
        options: {
            source: 'title',
            maxLength: 96
          },
      },
      {
        name: 'content',
        type: 'text',
        title: 'Content',
      }
    ]
  }