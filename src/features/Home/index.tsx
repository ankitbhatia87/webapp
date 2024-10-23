import {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from "react";
import { motion } from "framer-motion";
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
import ScrollingText from "../ScrollingText";

const Home: FC = (): ReactElement => {
  const [svgDimensions, setSvgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const textRef = useRef<SVGTextElement>(null);

  const cardsData: CardCommonData[] = [
    {
      id: 1,
      icon: (
        <Lottie options={technologyLottieOptions} height={100} width={100} />
      ),
      heading: "Technical Expertise",
      text: "Proficient in HTML, CSS, and JavaScript, I design intuitive, visually appealing interfaces. Using React and NodeJS, I create dynamic, responsive elements optimized for all devices."
    },
    {
      id: 2,
      icon: <Lottie options={teamworkLottieOptions} height={100} width={100} />,
      heading: "Teamwork",
      text: "Whether leading or contributing, I foster collaboration, continuous improvement, and support. My strong communication skills enhance team dynamics."
    },
    {
      id: 3,
      icon: (
        <Lottie
          options={resultOrientedLottieOptions}
          height={100}
          width={100}
        />
      ),
      heading: "Result Oriented",
      text: "My problem-solving skills and efficient team management drive progress and overcome obstacles. I adapt to evolving project needs, collaborating with stakeholders to ensure timely deliveries."
    },
    {
      id: 4,
      icon: (
        <Lottie
          options={qualityPerformanceLottieOptions}
          height={100}
          width={100}
        />
      ),
      heading: "Quality & Performance",
      text: "I ensure top-tier development with meticulous detail, leveraging best practices and tools to enhance performance and deliver optimal user experiences across platforms."
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

  useEffect(() => {
    if (textRef.current) {
      const box = textRef.current.getBBox();
      setSvgDimensions({ width: box.width, height: box.height });
    }
  }, []);

  return (
    <>
      <Banner />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 lg:px-32 py-6 lg:py-16 grid gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-4 bg-slate-200 transition-all zigzag relative opacity-0"
      >
        {cardsData.map((card): ReactNode => {
          return (
            <Card
              key={card.id}
              className="p-6"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-start">
                <div>{card.icon}</div>
              </div>
              <h3 className="font-poppinsMedium">{card.heading}</h3>
              <p>{card.text}</p>
            </Card>
          );
        })}
      </motion.div>
      <div className="flex z-50 relative bg-white pt-2 md:pt-4">
        <ScrollingText className="inline-block uppercase pt-4 pb-1 md:pb-2 whitespace-nowrap tracking-wide h-full text-4xl md:text-6xl font-poppinsMedium animate-marquee_rtl">
          <svg
            className="whitespace-nowrap relative"
            width={svgDimensions.width}
            height={svgDimensions.height}
          >
            <text
              x="0"
              y={svgDimensions.height - 5}
              fill="none"
              stroke="grey"
              className="whitespace-nowrap"
              ref={textRef}
            >
              Experienced Frontend Engineer Available For Hire &nbsp;*&nbsp;
            </text>
          </svg>
        </ScrollingText>
      </div>
      <div className="flex z-50 relative bg-white pb-2 md:pb-4">
        <ScrollingText className="inline-block uppercase pb-4 pt-1  md:pt-2 whitespace-nowrap h-full text-2xl md:text-4xl font-poppinsMedium animate-marquee_ltr text-black">
          HTML & CSS * Javascript * MERN Stack * Tech Leadership * Consultant *
          Web Development *&nbsp;
        </ScrollingText>
      </div>
      <div className="flex justify-center items-center flex-col relative  overflow-hidden">
        <h2 className="pt-10 pb-2 font-glorify uppercase bg-gradient-to-r from-brignt-orange to-bright-yellow text-transparent bg-clip-text">
          Milestones
        </h2>
        <h4 className="font-euclidCircularBRegular text-zinc-400">
          Life in a nutshell
        </h4>
        <Timeline data={timelineData} />
        <p className="absolute -bottom-[96px] text-[192px] right-0 z-10 text-slate-200 hidden sm:block">
          ankit
        </p>
      </div>
    </>
  );
};

export default Home;
