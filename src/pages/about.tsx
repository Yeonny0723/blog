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

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
)

const AboutPage: React.FC<PageProps<PageData>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <article className="post post-content about-page">
        <header className="post-header">
          <h1>김주연</h1>
          <p className="post-meta">AI Application Engineer</p>
          <p className="resume-contact">
            <a href="mailto:kkjuyeon@gmail.com">kkjuyeon@gmail.com</a>
            {" · "}
            <ExternalLink href="https://github.com/Yeonny0723">GitHub</ExternalLink>
            {" · "}
            <ExternalLink href="https://www.linkedin.com/in/juyeon-kim-6a227a207/">
              LinkedIn
            </ExternalLink>
            {" · "}
            <ExternalLink href="https://yeonny0723.github.io/blog/">Blog</ExternalLink>
          </p>
        </header>

        <section className="about-section">
          <h2>Summary.</h2>
          <p>
            팀과 제품의 성장을 우선하고, 호기심을 바탕으로 업무의 경계를 넓혀온
            4년차 개발자입니다. 현재 보안 문서 플랫폼 Wrapsody와 보안교육 제품
            Mind-SAT에서 문서 생성 Agent, 멀티모달 훈련 콘텐츠 생성 Agent,
            RAG·Text2SQL 품질 평가를 개발하고 AI 서버를 운영하고 있습니다.
          </p>
          <p>
            프론트엔드에서 시작해 백엔드, AI 애플리케이션, 운영까지 범위를 넓혀
            오며, 하나의 기능을 제품의 전체 흐름으로 보는 기준을 세웠습니다.
            새로운 기술을 많이 쓰기보다 복잡한 문제를 적절한 경계로 나누고,
            코드·규칙·AI가 책임질 범위를 명확히 하는 것을 중요하게 생각합니다.
            AI 기능에서도 평가셋, 모델 비교, 비용 관리로 LLM의 불확실성을 운영
            가능한 기준으로 바꾸어 왔습니다.
          </p>
          <p>
            이 경험으로 새로운 AI 기능을 기존 제품에 안정적으로 도입하고, 팀이
            더 빠르게 시도하며 안전하게 제품을 발전시킬 수 있도록
            기여하겠습니다.
          </p>
        </section>

        <section className="about-section">
          <h2>Core Skills.</h2>
          <table className="resume-skills">
            <tbody>
              <tr>
                <th>AI·LLM</th>
                <td>OpenAI SDK · LangChain · MCP</td>
              </tr>
              <tr>
                <th>Backend</th>
                <td>
                  Python · FastAPI · Java · Spring Boot · JPA · MySQL · MSSQL ·
                  Node.js · Express
                </td>
              </tr>
              <tr>
                <th>Infra</th>
                <td>OCI · Jenkins · GitLab CI/CD</td>
              </tr>
              <tr>
                <th>Frontend·Quality</th>
                <td>React · TypeScript · Next.js · Playwright</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="about-section">
          <h2>Work Experience.</h2>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                Fasoo AI <span className="resume-role-title">· Software Engineer</span>
              </h3>
              <span className="resume-period">2023.04 – 현재</span>
            </div>

            <h4 className="resume-group">
              AI 제품 개발 <span className="resume-period">2025 – 현재</span>
            </h4>

            <div className="resume-project">
              <h5>Wrapsody 문서 생성 Agent (메인 개발)</h5>
              <ul>
                <li>
                  템플릿과 원천 파일로 docx·xlsx·pptx를 생성하는 Agent를 구조 분석
                  → 변경 계획 → 코드 생성 → 샌드박스 실행 → 렌더링 → 보안 검증
                  단계로 설계하고, 요구가 불명확하면 역질문으로 범위를 좁힌 뒤
                  실행
                </li>
                <li>
                  청킹이 없던 구조 추론에 문서 구조 기준 청킹을 도입하고 크기를
                  실험해 8,000자로 확정, 추론 성공률 약 20% 향상
                </li>
                <li>
                  GPT-5.6 Luna·Terra·Sol을 정확도·비용 기준으로 비교 평가해,
                  최저가 Luna로 목표 정확도를 충족하고 Sol 대비 비용 약 1/10로
                  절감
                </li>
                <li>
                  생성 코드는 OpenAI Code Interpreter 샌드박스에서 실행하고 실패
                  시 오류를 모델에 되돌려 재생성, 입력의 Prompt Injection과 결과
                  Office 파일의 Macro·ActiveX·OLE를 검사
                </li>
                <li>
                  Spring Boot·MySQL과 Python 처리 서버를 분리하고 문서 생성 전용
                  스레드 풀 워커와 SSE로, 최대 10분 걸리는 작업도 화면을 닫았다
                  돌아오면 이어서 확인하도록 구성
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>검색·RAG 답변 품질 평가 체계</h5>
              <ul>
                <li>
                  로컬 LLM(Qwen, vLLM)의 모델·파라미터가 바뀌어도 바로 성능을
                  확인할 수 있도록, 기대 문서·구간·답변을 정의한 36개 평가셋으로
                  Text2SQL·검색·답변 단계를 분리 검증하는 회귀 평가를
                  Playwright로 자동화
                </li>
                <li>
                  평가에서 드러난 동의어·다의어 질의 오류를 Text2SQL 시멘틱
                  레이어(동의어 사전·컬럼 설명) 보강으로 해결, 평가셋 정답 20/36
                  → 36/36
                </li>
                <li>
                  동일 프롬프트·파이프라인에서 Gemma 4 26B-A4B와 Qwen3.5-27B(모두
                  FP8, RTX 5090)를 비교해, Qwen3.5의 상대 시간 표현(어제, 최근
                  등)과 파일 유형에서 확장자 확장 등의 질의 누락·오류를 확인
                </li>
                <li>
                  고객 문서가 외부로 나가지 않도록 내부망의 로컬 LLM으로 처리하고,
                  기존 인증 서버의 JWT 검증·문서 권한 체크와 연동
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>Mind-SAT 보안 훈련 콘텐츠 생성 Agent (메인 개발)</h5>
              <ul>
                <li>
                  산업군·직급·위협 수준을 반영해 훈련 메일·보안 퀴즈를 생성하는
                  멀티턴 Agent를 OpenAI SDK·LangChain으로 개발
                </li>
                <li>
                  담당자가 수신 메일을 추출해 직접 보안 검사 후 HTML로 등록하던
                  과정을, 메일 캡처 이미지 업로드만으로 OCR 해석 → 위협 링크 제거
                  → UI 요소만 템플릿으로 재구성하도록 대체 (31개 고객사 사용)
                </li>
                <li>
                  LLM이 생성한 HTML을 신뢰할 수 없는 입력으로 보고 sanitize와
                  인라인 CSS 속성 화이트리스트로 스크립트 실행 가능 요소를 제거
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>Mind-SAT AI 서버 단독 개발·고가용성 구축</h5>
              <ul>
                <li>
                  OCI Instance Pool·Load Balancer로 트래픽을 분산하고 장애
                  인스턴스를 자동 교체해 단일 장애점을 없애고, 장애 시 1분 이내
                  복구
                </li>
              </ul>
            </div>

            <h4 className="resume-group">
              제품·플랫폼 개발 <span className="resume-period">2023 – 2025</span>
            </h4>

            <div className="resume-project">
              <h5>Mind-SAT 프론트엔드 (메인 개발)</h5>
              <ul>
                <li>
                  31개 고객사·19,790명이 쓰는 OTP/MFA·권한별 화면·학습·퀴즈·관리자
                  통계 흐름 구현
                </li>
                <li>
                  메일·AI·백엔드·프론트 서버를 잇는 종단 E2E 테스트로 수동 검증
                  시간을 약 30분에서 8분으로 단축
                </li>
                <li>
                  로컬 빌드 후 복사하던 배포를 Jenkins 파이프라인으로 전환해,
                  환경별 배포 artifact를 추적하고 직전 정상 버전으로 롤백할 수
                  있게 함
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>디자인 시스템 공통 라이브러리·MCP 서버 개발</h5>
              <ul>
                <li>
                  React·TypeScript 공통 UI 패키지를 개발해 사내 시스템 6개·제품
                  3개에 적용하고, Jenkins로 GitLab Packages 자동 배포
                  파이프라인을 구성해 버전을 관리
                </li>
                <li>
                  Storybook 문서·JSDoc을 레지스트리로 자동 컴파일해 AI가 도구로
                  조회하는 MCP 서버를 개발, AI가 UI 생성 시 기존 컴포넌트·훅·
                  아이콘을 재사용하도록 함
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>M365 Web Add-in 멀티테넌트 플랫폼 (메인 개발)</h5>
              <ul>
                <li>
                  C#/.NET Outlook 클라이언트를 Office.js 기반
                  React·TypeScript로 전환하고, Node.js·Express 프록시 서버와
                  모노레포 공통 계층 구축
                </li>
              </ul>
            </div>

            <div className="resume-project">
              <h5>사내 정보관리 시스템</h5>
              <ul>
                <li>
                  인사·결재·고객 관리 시스템을 ASP.NET WebForms에서
                  React·ASP.NET Core·MSSQL로 마이그레이션하며 업무 단위 API를
                  설계하고, 인덱스·DB view·임시 테이블로 주요 조회 부담을 낮춤
                </li>
                <li>
                  수동 쿼리로 맞추던 ERP 기준 데이터를 재실행 가능한 스케줄러
                  job과 검증 쿼리로 전환하고, 수동 빌드·복사·IIS 재시작을 GitLab
                  CI/CD로 자동화
                </li>
              </ul>
            </div>
          </div>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                엘리스 <span className="resume-role-title">· 프로그래밍 튜터</span>
              </h3>
              <span className="resume-period">2021.08 – 2021.11</span>
            </div>
            <ul>
              <li>
                SW 트랙 3기·AI 트랙 7기 예비 개발자 약 120명 대상 React 개념
                강의, 실습 문제 풀이, 코드 리뷰
              </li>
            </ul>
          </div>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                MyCelebs <span className="resume-role-title">· Data Engineer Intern</span>
              </h3>
              <span className="resume-period">2021.08 – 2021.11</span>
            </div>
            <ul>
              <li>
                리뷰 데이터 수집과 Mecab·TF-IDF·클러스터링 전처리로 검색어 추천
                모델의 학습 데이터셋 구축 지원
              </li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <h2>Side Projects.</h2>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                OnCue Labs{" "}
                <span className="resume-role-title">· AI 페르소나 음성 통화 서비스</span>
              </h3>
              <span className="resume-period">
                2026.09 ·{" "}
                <ExternalLink href="https://github.com/oncue-labs">GitHub</ExternalLink>
              </span>
            </div>
            <p className="resume-stack">
              1인 개발 · Flutter · Spring Boot · FastAPI · WebRTC · OpenAI Realtime API
            </p>
            <ul>
              <li>
                예약 시각에 AI 페르소나가 iOS 앱으로 전화를 거는 서비스. APNs
                VoIP Push → CallKit 수신 → WebSocket 시그널링 → WebRTC 음성
                연결로 구성
              </li>
            </ul>
          </div>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                agent-orchestration{" "}
                <span className="resume-role-title">· AI 개발 워크플로우 플러그인</span>
              </h3>
              <span className="resume-period">
                2026.08 – 현재 ·{" "}
                <ExternalLink href="https://github.com/Yeonny0723/agent-orchestration">
                  GitHub
                </ExternalLink>
              </span>
            </div>
            <ul>
              <li>
                AI 코딩 에이전트가 변경이 쉬운 living spec을 기준으로 작은 Task
                단위의 구현·리뷰·커밋 루프를 돌도록 하는 Claude Code·Codex
                플러그인
              </li>
              <li>
                TDD, 테스트 민감도(mutation) 검증, 설계 비판 리뷰, Issue/PR 작성
                등 15개 스킬을 제작해 Claude Code·Codex 플러그인 마켓플레이스로
                배포
              </li>
            </ul>
          </div>

          <div className="resume-role">
            <div className="resume-role-header">
              <h3>
                PFPlay{" "}
                <span className="resume-role-title">· 실시간 음악 스트리밍 DJ 플랫폼</span>
              </h3>
              <span className="resume-period">
                2025.06 – 현재 ·{" "}
                <ExternalLink href="https://github.com/pfplay/pfplay-web">GitHub</ExternalLink>
              </span>
            </div>
            <ul>
              <li>
                Next.js 기반 OAuth PKCE 인증, NFT 지갑 연결, WebSocket 기반
                재생·대기열 이벤트 흐름 구현
              </li>
              <li>
                수동 재현이 어려운 다중 사용자 실시간 상태 전이를 Playwright E2E로
                자동화, GCP → Vercel 인프라 이전
              </li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <h2>Education · Certifications · Activities.</h2>
          <ul>
            <li>RMIT University · Information Systems · 2018.07 – 2022.12 · GPA 3.8 / 4.0</li>
            <li>
              멋쟁이사자처럼 AI 스쿨 · 2021.03 – 2021.08 · Python 기반 데이터
              수집·전처리, 통계 분석, 머신러닝 모델 학습·평가
            </li>
            <li>AWS Certified Solutions Architect – Associate (SAA)</li>
            <li>ITT 비즈니스 영어-한국어 통번역</li>
            <li>한국 오픈소스 기여 모임 10기</li>
            <li>UN 한국·호주 전자정부 웹표준 평가 참여</li>
          </ul>
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
