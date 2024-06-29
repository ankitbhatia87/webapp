import { FC, ReactElement, ReactNode } from "react";
import Banner from "../Banner";
import Card from "../common/Card";
import { CardCommonData } from "../../ui.kit/Button/interface";
import Lottie from "react-lottie";
import {
  qualityPerformanceLottieOptions,
  resultOrientedLottieOptions,
  teamworkLottieOptions,
  technologyLottieOptions
} from "../../assets/lotties";
import Timeline from "../../utils/timeline";

const Home: FC = (): ReactElement => {
  const cardsData: CardCommonData[] = [
    {
      icon: <Lottie options={technologyLottieOptions} height={60} width={60} />,
      heading: "Technical Expertise",
      text: "Proficient in HTML, CSS, and JavaScript, I craft intuitive interfaces that seamlessly blend aesthetics with usability. Leveraging frameworks like React and NodeJS, I bring dynamic and responsive elements to life, ensuring optimal performance across devices and browsers."
    },
    {
      icon: <Lottie options={teamworkLottieOptions} height={60} width={60} />,
      heading: "Teamwork",
      text: "Whether in a leadership role or as an individual contributor in a team, I am committed to build a culture of collaboration, continuous improvement, and mutual support among all stakeholders. With strong communication and interpersonal skills, I effectively contribute to team dynamics."
    },
    {
      icon: (
        <Lottie options={resultOrientedLottieOptions} height={60} width={60} />
      ),
      heading: "Result Oriented",
      text: "With my problem-solving skills and efficient team management, I navigate obstacles and drive progress towards desired outcomes. My adaptability and agility enable me to brainstorm strategies with business stakeholders, while meeting the evolving project requirements yet ensuring the timely deliveries."
    },
    {
      icon: (
        <Lottie
          options={qualityPerformanceLottieOptions}
          height={60}
          width={60}
        />
      ),
      heading: "Quality & Performance",
      text: "With a meticulous attention to detail, I ensure that every aspect of the development process is executed to the highest standards. Leveraging best practices and sophisticated tools, I continuously strive to enhance performance to ensure an optimal user experience across platforms and devices."
    }
  ];

  const timelineData = [
    {
      year: 1987,
      description: "One fine afternoon, I came to this planet",
      tags: ["20th March", "Delhi", "India"]
    },
    {
      year: 1992,
      description:
        "I started going to school a year before, because I learnt more than others",
      tags: ["schooling", "1st standard", "ahead of time"]
    },
    {
      year: 1993,
      description:
        "My father survived a massive heart attack that shook my life to the core",
      tags: ["devastated", "lost", "scattered"]
    },
    {
      year: 2001,
      description: "Received an award for being the best student in 9th class",
      tags: ["motivated", "disciplined", "obedient"]
    },
    {
      year: 2002,
      description: "I completed my Secondary School journey",
      tags: ["70%", "C.B.S.E."]
    },
    {
      year: 2003,
      description:
        "I was part of volley ball & cricket teams, and was in the forefront of school marching batallion",
      tags: [
        "Won Zonal Cricket Championship",
        "2nd position in marching batallion"
      ]
    },
    {
      year: 2004,
      description:
        "I completed my High School journey with a dream of becoming an actor",
      tags: ["74%", "C.B.S.E.", "acting"]
    },
    {
      year: 2008,
      description: "I completed Bachelor of Science & started my first job",
      tags: ["72.5%", "Web Designer", "Vinove Software & Services"]
    },
    {
      year: 2009,
      description:
        "Upskilled myself with jQuery, Javascript and landed in another job",
      tags: ["Treystaa", "jQuery", "Photoshop", "Flash", "BI Product"]
    },
    {
      year: 2011,
      description:
        "Faced the never imagined health problem and nosedived in my career and life but started my spiritual journey",
      tags: [
        "3 months sabbatical",
        "damaged",
        "broken",
        "meditation",
        "healing"
      ]
    },
    {
      year: 2014,
      description:
        "Recovered miraculously and started a new chapter with Sapient",
      tags: ["backboneJS", "ReactJS & Angular", "AEM", "Gymming", "Fitness"]
    },
    {
      year: 2018,
      description: "With the bond of marriage, I grew further and stronger",
      tags: ["Wedding", "Euro Trip", "Bangalore"]
    },
    {
      year: 2019,
      description: "Joined TEKSystems and later Epsilon after 6months",
      tags: ["Early Switch", "TEKSystems", "Epsilon", "Tech Lead"]
    },
    {
      year: 2021,
      description:
        "Joined Novo to switch from Service to Product. Also started living my passion of photography",
      tags: ["Product", "FinTech", "Back to Developer", "Photography"]
    },
    {
      year: 2022,
      description: "An angel came in my life in the form of my daughter",
      tags: ["Blessed", "Fatherhood", "Lucky Charm"]
    },
    {
      year: 2024,
      description:
        "Commenced building my brand starting by developing my website",
      tags: [
        "You are here...",
        "I am here...",
        "Lets connect to build something crazy"
      ]
    }
  ];
  return (
    <>
      <Banner />
      <div className="p-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4 bg-slate-200 transition-all">
        {cardsData.map(
          (card): ReactNode => (
            <Card className="p-6">
              <div className="flex justify-start">
                <div>{card.icon}</div>
              </div>
              <h3>{card.heading}</h3>
              <p>{card.text}</p>
            </Card>
          )
        )}
      </div>
      <div className="flex justify-center relative">
        <Timeline data={timelineData} />
        <p className="absolute -bottom-[96px] text-[192px] right-0 z-10 text-slate-200 hidden sm:block">
          ankit
        </p>
      </div>
    </>
  );
};

export default Home;
