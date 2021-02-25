import { createContext, useState, ReactNode } from "react";

import challenges from '../../challenges.json'


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    completedChallenge: () => void;

}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children} : ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null)



    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp(){
    setLevel(level + 1)
    
  }

  function startNewChallenge(){
      const randoChallengeIndex = Math.floor(Math.random() * challenges.length)

      const challenge = challenges[randoChallengeIndex]

      setActiveChallenge(challenge)
  }

  function resetChallenge(){
      setActiveChallenge(null)
  }

  function completedChallenge(){
    if(!activeChallenge){
        return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
        finalExperience = finalExperience - experienceToNextLevel;
        levelUp();
        
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
    
    return(
        <ChallengesContext.Provider value={{ 
            level, 
            currentExperience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completedChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}