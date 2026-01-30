import * as React from "react"
import { graphql, PageProps, HeadFC } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

interface PageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const GuestbookPage: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <article className="guestbook-page">
        <h1>방명록</h1>

        <section className="guestbook-intro">
          <p>
            블로그를 방문해주셔서 감사합니다!
            <br />
            여기에 댓글을 남겨주시면 더욱 좋아할 것 같습니다.
          </p>
        </section>

        <section className="guestbook-content">
          <h2>방명록 남기기</h2>
          <div className="guestbook-placeholder">
            <p>
              현재 댓글 시스템 준비 중입니다.
              <br />곧 멋진 기능을 추가할 예정이니 기대해주세요!
            </p>
            <p>
              그 때까지는{" "}
              <a
                href="https://github.com/yeonny0723"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              이나 <a href="mailto:kkjuyeon@gmail.com">이메일</a>로 연락주세요.
            </p>
          </div>
        </section>

        <section className="guestbook-content">
          <h2>최근 방명록</h2>
          <div className="guestbook-placeholder">
            <p>첫 번째 방명록을 남겨주는 분을 기다리고 있습니다! 👋</p>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export const Head: HeadFC<PageData> = () => <Seo title="방명록" />

export default GuestbookPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
