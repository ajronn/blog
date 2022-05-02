import type { NextPage } from 'next'
import fs from 'fs'
import matter from 'gray-matter'
import styles from '../../styles/Home.module.css'

type PROPS = {
  title: string;
  content: string;
}

const Slug: NextPage<PROPS> = (props) => {

  return (
    <div className={styles.container}>
      <a href="/" >Back</a>
      <h1>{props.title}</h1>
      {props.content}
    </div>
  )
}

type PARAMS = {
    params: {
        slug: string;
    }
}

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
          slug: fileName.replace('.md', ''),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }:  PARAMS) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        title: frontmatter.title,
        content,
      },
    };
  }

export default Slug