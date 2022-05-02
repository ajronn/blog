import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import styles from '../styles/Home.module.css'

type PROPS = {
  posts: {
    slug: string;
    title: string;
  }[]
}

const Home: NextPage<PROPS> = (props: PROPS) => {
  return (
    <div className={styles.container}>
      <h1>Blog</h1>
      {props.posts.map((post, index) => {
        return <Link href={`/post/${post.slug}`} passHref key={index}>
          <div className={styles.card} >
            <p>{post.title}</p>
          </div>
        </Link>
      })}
    </div>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync('posts')

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const read = fs.readFileSync(`posts/${fileName}`, 'utf-8')
    const { data: frontmatter } = matter(read)

    return {
      slug,
      title: frontmatter.title
    }
  })

  return {
    props: {
      posts
    }
  }
}

export default Home
