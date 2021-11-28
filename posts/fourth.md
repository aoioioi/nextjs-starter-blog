---
title: "Fourth Next.js Blog Post"
excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit accusamus, explicabo eligendi necessitatibus soluta!"
date: "2021-11-22"
author:
  name: Admin
coverImage: ""
tags: ['code']
---

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eaque dolorum beatae reiciendis, veniam ex similique hic repellat necessitatibus. Alias labore libero molestiae. Voluptas eos harum, non provident fugit eveniet animi error, velit inventore maxime quos tempore nesciunt perspiciatis porro!

      export async function getStaticProps() {
        const allPosts = getAllPosts([
          'title',
          'date',
          'slug',
          'author',
          'coverImage',
          'excerpt',
        ]);

        return {
          props: { allPosts },
        };
      }

Alias labore libero molestiae. Voluptas eos harum, non provident fugit eveniet animi error, velit inventore maxime quos tempore nesciunt perspiciatis porro!

```javascript
export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
```
