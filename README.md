# Authentic Development Website

This BlitzJS app is the home of Authentic Development which serves a portfolio website for Authentic Development LLC and me, Elvis Hernandez.

This app was built using BlitzJS which is a wrapper around NextJS that includes a few more things out of the box like Prisma ORM, tRPC, and authentication. Its the closest thing to Ruby on Rails in the Typescript community. I highly recommend it for anyone looking for a full-stack solution to building apps with Typescript.

The entire front-end of the website was a custom design inspired by other designs found on Dribbble and randoms images found on Unsplash.


![Hero section of Authentic Development Website](/public/authentic-development-blog.png)

There's also a custom built admin section that uses AWS S3 (image storage), and SQLite (post storage) to manage/create blog posts with a custom markdown editor.

![Authentic Development Blog Admin Panel](/public/adb-admin.png)

Lastly, the blog is deployed to Digital Ocean via Terraform and has CI/CD via Github Actions.