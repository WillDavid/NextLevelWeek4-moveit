import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import { GetServerSideProps } from 'next'

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home(props) {


  return (
    <div className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>
        <ExperienceBar></ExperienceBar>
      <CountdownProvider>
          <section>
            <div>
              <Profile></Profile>
              <CompletedChallenges></CompletedChallenges>
              <Countdown></Countdown>
            </div>
            <div>

              <ChallengeBox></ChallengeBox>
            </div>
          </section>
      </CountdownProvider>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return {
    props: {
      level,
      currentExperience,
      challengesCompleted
    }
  }
}
