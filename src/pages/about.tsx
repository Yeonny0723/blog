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

const AboutPage: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <article className="about-page">
        <h1>소개</h1>

        <section className="about-section">
          <h2>Introduce.</h2>
          <hr />
          <p>
            새로운 매일, 할 수 있는 일이 많아짐에 가슴 뜀을 느끼고, <br />{" "}
            다양한 영역에 영향력을 확장해 나아가고 있는 개발자 김주연입니다.
          </p>
          <p>
            빠른 변화와 기술을 빠르게 받아드리면서도 여전히 사람이 해야하는 일이
            있다고 믿으며, <br /> 사용자와 개발자를 위한 더 편한 UX, DX를
            고민하고, 예외 흐름과 복잡성을 통제하여 빠르며 안정적인 제품 개발을
            위해 연구하고 있습니다.
          </p>
          <p>
            가치 있는 일이라면 언제든 기꺼이 함께하며, 맡은 업무 속에서 스스로
            성장의 기회를 찾아왔습니다. 내가 잘되어야 팀이 잘되고, 팀이 잘되야
            내가 잘된다고 생각합니다. 앞으로도 목표를 향해 팀 전체가 힘을 모아
            시너지를 낼 수 있도록, 건강하고 협력적인 조직 문화를 만드는 데
            기여하고자 합니다.
          </p>
        </section>

        <section className="about-section">
          <h2>Work Experience.</h2>
          <hr />
          <div className="work-item">
            <h3>FASOO</h3>
            <p>DRM 및 문서 보안 솔루션 기업</p>

            <div className="work-role">
              <h4>Frontend AI Engineer</h4>
              <p className="work-period">2026.01.01~</p>
              <ul>
                <li>
                  모의 훈련 서비스 내 AI 메일 템플릿 추천 및 생성 기능 개발
                </li>
                <li>멀티 모달 컨텍스트 기반 AI 퀴즈 생성 기능 개발</li>
              </ul>
            </div>

            <div className="work-role">
              <h4>Frontend Developer</h4>
              <p className="work-period">2025.01 ~ 2025.12.31</p>
              <ul>
                <li>
                  <strong>
                    모의 악성 메일 훈련 등 보안 및 교육 제품 (퀴즈, 동영상) 개발
                  </strong>
                  <ul>
                    <li>
                      SaaS 전환과 함께 OTP·MFA 등 인증 보안 기능, 교육 플레이어
                      및 퀴즈 시스템, 메일 템플릿 에디터 등 핵심 기능 개발함.
                    </li>
                    <li>
                      CSP와 DOM Sanitizing(스크립트/속성 제거, 화이트리스트)으로
                      악성 스크립트·외부 리소스 로딩을 차단해 제품 보안을
                      강화함.
                    </li>
                    <li>
                      기존 COM 클라이언트를 웹(Node.js + React)으로 재개발,
                      백엔드·프론트 아키텍처를 직접 설계·구현하여 멀티 테넌트
                      M365 웹 애드인 구축함.
                    </li>
                    <li>
                      번들링 최적화(코드 스플리팅·라이브러리 동적 로딩·컴파일러
                      규칙 개선)를 통해 레거시 시스템 로딩 속도를 75% 단축함.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>제품 공통 디자인 시스템 라이브러리 개발</strong>
                  <ul>
                    <li>
                      전략·컴파운드·팩토리 패턴 등 다양한 디자인 패턴을 적용해
                      확장성과 유연성을 갖춘 공통 디자인 시스템 라이브러리를
                      개발, 사내 3개 보안 제품군에 운영함.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="work-role">
              <h4>Software Engineer</h4>
              <p className="work-period">2023.04 ~ 2024.12</p>
              <ul>
                <li>
                  <strong>결재상신, 인사, 고객관리 사내 시스템 개발</strong>
                  <ul>
                    <li>
                      결재상신·인사·고객관리 등 사내 시스템을 웹뷰로 개발하고,
                      ERP 동기화 스케줄러를 개발함.
                    </li>
                    <li>
                      홈페이지 방문 데이터를 분석해 관심도 기반 맞춤 팝업을
                      제공하는 플러그인을 설계·구현하여 사내 제품 개선 제안
                      대회에서 수상함.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>개발 생산성 향상을 위한 작업</strong>
                  <ul>
                    <li>
                      반복 작업 비용을 줄이기 위해 사내 공통 라이브러리를
                      제안·개발하여 약 6개의 사내 시스템에 적용함
                    </li>
                    <li>
                      plop.js와 typedoc을 활용해 컴포넌트·훅·유틸 스토리
                      자동화를 구축, 팀원들이 Storybook을 쉽고 빠르게 확장할 수
                      있는 환경을 마련함.
                    </li>
                    <li>
                      수동 배포 환경에서 CI/CD 파이프라인을 구축하고 팀 내
                      공유하여 개발 환경 구축 비용을 없애고 배포 안정성과 속도를
                      개선함.
                    </li>
                    <li>
                      기존 레이어드 아키텍처를 하위 도메인 단위로 구조화해, 기능
                      확장과 협업 시 변경 범위를 최소화하고 유지보수성을 높임.
                    </li>
                    <li>
                      팀 내 TypeScript, TanStack Query, Vite, Yarn Berry 도입을
                      주도하여 어댑터 응답 처리의 일관성을 확보하고, 빌드·배포
                      속도를 개선함.
                    </li>
                    <li>
                      30여 개의 사내 시스템 간의 연관 테이블/프로시저/API 사용
                      현황을 분석해 의존성 맵을 작성함. ERP 및 연계 시스템의
                      참조 구조를 정리해, 서비스 경계를 재정의하고 변경 시
                      영향도 예측이 가능하도록 함.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="work-item">
            <h3>Elice</h3>
            <p>누적 이수자수 50만명, 온라인 교육 플랫폼</p>

            <div className="work-role">
              <h4>React Tutor</h4>
              <p className="work-period">2022.11. ~ 2023.04</p>
              <ul>
                <li>
                  SW 트랙 3기, AI 트랙 7기 리액트 실습 코치로 활동함.
                  <ul>
                    <li>
                      누적 약 120여명의 예비 개발자들을 대상 실습 문제 풀이 및
                      코드 리뷰를 진행함.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="work-item">
            <h3>마이셀럽즈</h3>
            <p>검색어 추천 기술로 검색 경험을 개선하는 기업</p>

            <div className="work-role">
              <h4>Data Engineer Intership</h4>
              <p className="work-period">2021.08 ~ 2021.11 - Python</p>
              <ul>
                <li>
                  검색어 추천 서비스 개발을 위한 수천만건의 데이터셋 구축을 위한
                  스크래퍼를 개발함.
                </li>
                <li>
                  데이터 클러스터링 작업을 위한 텍스트 유사도 측정 모델링.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Education.</h2>
          <hr />
          <ul>
            <li>2018.07 ~ 2022.12 RMIT 대학교 정보시스템학과 (3.8 / 4.0)</li>
            <li>2021.03 ~ 2021.08 멋쟁이사자처럼 AI 스쿨 과정</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Additional.</h2>
          <hr />
          <ul>
            <li>
              United Nations 다국적 동료들과 한국, 호주 전자정부 웹사이트의
              웹표준 평가단으로 활동함.
            </li>
            <li>언어 - ITT 비즈니스 영어-한국어 통번역 자격증</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>연락처</h2>
          <hr />
          <p>
            대화를 나눠보고 싶으시다면,{" "}
            <a href="mailto:kkjuyeon@gmail.com">이메일</a>로 연락주세요.
          </p>
          <p>
            <a
              href="https://github.com/yeonny0723"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            {" · "}
            <a
              href="https://www.linkedin.com/in/juyeon-kim-6a227a207/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            {" · "}
            <a
              href="https://yeonny0723.tistory.com/"
              target="_blank"
              rel="noreferrer"
            >
              Tistory
            </a>
          </p>
        </section>
      </article>
    </Layout>
  )
}

export const Head: HeadFC<PageData> = () => <Seo title="소개" />

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
