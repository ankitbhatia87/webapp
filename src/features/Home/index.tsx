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
  return (
    <>
      <Banner />
      <div className="p-6 rounded-xl grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cardsData.map(
          (card): ReactNode => (
            <Card className="p-6">
              <div className="self-start">{card.icon}</div>
              <h3>{card.heading}</h3>
              <p>{card.text}</p>
            </Card>
          )
        )}
      </div>
    </>
  );
};

export default Home;
