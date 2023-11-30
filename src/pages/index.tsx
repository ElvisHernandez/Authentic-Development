import React, { Suspense, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { BlitzPage, Routes } from "@blitzjs/next";
import * as Sentry from "@sentry/nextjs";
import {
  MdComputer,
  MdArrowCircleLeft,
  MdArrowCircleRight,
  MdOutlineCode,
  MdCloudQueue,
} from "react-icons/md";

import Layout from "src/core/layouts/Layout";
import getPosts from "src/posts/queries/getPosts";
import Image from "next/image";
import MeImage from "../../public/me.jpeg";
import Link from "next/link";
import { handleLinkClickSmoothScroll, smoothScroll } from "src/utils/smoothScroll";
import createInquiryResolver from "src/inquiry/mutations/createInquiry";
import { Alert } from "src/core/components/Alert";
import styles from "../styles/Home.module.css";

const SectionHeader = (props: { sectionName: string }) => (
  <div className="flex py-[48px]">
    <div className="w-[35%] sm:w-[40%] md:w-[42.5%] h-6 bg-slate-100"></div>
    <h2 className="text-xl md:text-2xl w-[30%] sm:w-[20%] md:w-[15%] text-base-100 text-center font-semibold">
      {props.sectionName}
    </h2>
    <div className="w-[35%] sm:w-[40%] md:w-[42.5%] h-6 bg-slate-100"></div>
  </div>
);

const SectionTextContainer = ({ children }) => (
  <div className=" mx-[64px] xl:mx-[128px] 2xl:mx-[256px]">{children}</div>
);

const HeroSection = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      smoothScroll(hash.slice(1), 50);
    }

    const timer = setTimeout(() => setIsFirstRender(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="h-screen">
      <div className="font-yellowtail top-[48px] left-[48px] text-4xl absolute text-white hidden xl:block">
        <Link href="/">AD</Link>
      </div>

      <div className="relative overflow-x-clip hidden xl:block">
        <Link
          href={Routes.Home()}
          id="home-nav-link-1"
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          Home
        </Link>
        <Link
          href="#about"
          id="home-nav-link-2"
          onClick={(e) => handleLinkClickSmoothScroll(e, "about")}
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          About
        </Link>
        <Link
          href="#services"
          id="home-nav-link-3"
          onClick={(e) => handleLinkClickSmoothScroll(e, "services")}
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          Services
        </Link>
        <Link
          href="#process"
          id="home-nav-link-4"
          onClick={(e) => handleLinkClickSmoothScroll(e, "process")}
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          Process
        </Link>
        <Link
          href="#contact"
          id="home-nav-link-5"
          onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          Contact
        </Link>
        <Link
          href={Routes.BlogPage()}
          id="home-nav-link-6"
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        >
          Blog
        </Link>
        <div
          id="home-nav-link-7"
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        ></div>
        <div
          id="home-nav-link-8"
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        ></div>
        <div
          id="home-nav-link-9"
          className={`cursor-pointer ${isFirstRender ? "animate" : ""}`}
        ></div>
      </div>

      <div className="px-[24px] md:pl-[48px] pt-[200px] sm:pt-[300px] text-white w-[fit-content]">
        <h1 className="text-5xl">Hi, my name is Elvis</h1>
        <p className="pt-[24px] text-white md:max-w-[70vw] lg:max-w-[55vw]">
          As a software developer, I&apos;m passionate about crafting tools that enhance user
          productivity. Additionally, I enjoy writing about technology, focusing on ways it can
          empower developers to produce superior products and deepen their knowledge.
        </p>

        <div className="flex justify-center mt-[48px]">
          <Link
            href={Routes.BlogPage()}
            className="btn btn-outline btn-accent normal-case w-[220px] mr-[24px]"
          >
            Join My Tech Journey
          </Link>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about">
    <SectionHeader sectionName="About" />
    <SectionTextContainer>
      <p>
        Hi there! My journey has recently led me to a startup as a founding software engineer.
        There, I delved into the complexities of Large Language Models, contributing to a successful
        launch that attracted a notable number of users. One of my key contributions was designing
        an algorithm that significantly improved data processing speeds.
      </p>

      <p className="mt-[24px]">
        Before this role, I was part of a small team at a delivery-focused company. We began with a
        simple MVP and grew the business into a more established enterprise. My work involved
        developing APIs and data pipelines, which played a crucial role in enhancing our product
        offerings and securing new business deals.
      </p>

      <p className="mt-[24px]">
        Earlier in my career, I worked at a tech firm in Miami, where I focused on improving a
        Python-Flask application used by a large user base. My tasks included optimizing database
        performance and implementing more efficient testing and deployment processes.
      </p>

      <p className="mt-[24px]">
        Throughout my career, I&apos;ve embraced various roles, each offering unique challenges and
        opportunities to innovate. From coding to problem-solving, my journey has been about
        constantly learning and applying new skills to develop effective software solutions. And
        I&apos;m excited to see where this path will lead next!
      </p>
    </SectionTextContainer>
    <div className="flex justify-center pt-[48px]">
      <Image className="rounded-full " alt="Me!" src={MeImage} height={300} width={300} />
    </div>
  </section>
);

const SkillsSection = () => (
  <section id="services">
    <SectionHeader sectionName="Skills" />
    <SectionTextContainer>
      <p>
        My technical skill set encompasses a comprehensive range in software development. I am
        proficient in Typescript and Javascript, with expertise in frameworks like NodeJS,
        ExpressJS, and front-end libraries such as ReactJS, React Native, NextJS, and BlitzJS.
      </p>

      <p className="mt-[24px]">
        My abilities also extend to HTML5/CSS for web design, Python with Flask, and Ruby on Rails
        for robust backend development. In database management, I am experienced with SQL,
        PostgreSQL, and NoSQL. My cloud computing skills include deploying and managing applications
        on AWS, GCP, and Firebase.
      </p>

      <p className="mt-[24px]">
        Additionally, I am proficient in Linux and Git for operating system and version control,
        Docker and Terraform for containerization and infrastructure management, and have experience
        with advanced technologies like GPT (Large Language Model) and BullMQ for job queuing.
      </p>
    </SectionTextContainer>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-16 px-[48px] pt-[48px]">
      <div className="text-center">
        <MdOutlineCode className="h-[64px] w-[64px] mx-auto my-[12px]" />

        <div className="font-medium mb-[12px]">Full-Stack Development</div>

        <p className="text-sm">
          <span className="font-semibold">Backend-End</span>: NodeJS, ExpressJS, Flask, Ruby on
          Rails
        </p>

        <p className="text-sm">
          <span className="font-semibold">Front-End</span>: ReactJS, React Native, NextJS, BlitzJS,
          HTML5/CSS
        </p>

        <p className="text-sm">
          <span className="font-semibold">Programming Languages</span>: Typescript, Javascript,
          Python, Ruby
        </p>
      </div>

      <div className="text-center">
        <MdCloudQueue className="h-[64px] w-[64px] mx-auto my-[12px]" />

        <div className="font-medium mb-[12px]">Cloud and DevOps</div>
        <p className="text-sm">
          <span className="font-semibold">Cloud Services</span>: AWS, GCP, Firebase
        </p>

        <p className="text-sm">
          <span className="font-semibold">Infrastructure Management</span>: Docker, Terraform
        </p>

        <p className="text-sm">
          <span className="font-semibold">Version Control and Operating System</span>: Git, Linux
        </p>
      </div>

      <div className="text-center">
        <MdComputer className="h-[64px] w-[64px] mx-auto my-[12px]" />

        <div className="font-medium mb-[12px]">Data Management and Integration</div>
        <p className="text-sm">
          <span className="font-semibold">Database Technologies</span>: SQL (PostgreSQL, NoSQL)
        </p>

        <p className="text-sm">
          <span className="font-semibold">Queue Management</span>: BullMQ, Google Cloud Tasks
        </p>

        <p className="text-sm">
          <span className="font-semibold">Artificial Intelligence</span>: GPT (Large Language Model)
        </p>
      </div>
    </div>
  </section>
);

type Project = {
  index: number;
  name: string;
  description: string;
  imgSrc: string;
  productionUrl: string;
  codeUrl: string;
};

const projects: Project[] = [
  {
    index: 0,
    name: "Cover Letter Generator",
    description:
      "This is a Chrome Extension designed to generate cover letters, developed using Typescript and the Plasmo framework. It leverages the Chat GPT API to analyze resumes and job descriptions, subsequently creating tailored cover letters.",
    imgSrc: "/cover-letter-generator.png",
    productionUrl:
      "https://chromewebstore.google.com/detail/cover-letter-generator/inldinjjkpclfafpbpofehahkacnaegd",
    codeUrl: "https://github.com/ElvisHernandez/Cover-Letter-Generator",
  },
  {
    index: 1,
    name: "Authentic Development Blog",
    description:
      "You are currently visiting my blog and portfolio website. This site has been developed using BlitzJS and deployed on Digital Ocean with the help of Terraform. Additionally, it features continuous integration and continuous deployment (CI/CD) through Github Actions.",
    imgSrc: "/authentic-development-blog.png",
    productionUrl: "/",
    codeUrl: "https://github.com/ElvisHernandez/Authentic-Development",
  },
];

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState(projects[0] as Project);
  const modalRef = useRef<HTMLDialogElement>(null);

  const getVerticalTimelineStyle = (index) => {
    const isFirstStep = index === 0;
    const isLastStep = index === projects.length - 1;
    if (!isFirstStep && !isLastStep)
      return {
        background:
          "linear-gradient(rgb(58, 178, 186) 0%, transparent 40%, transparent 61%, rgb(58, 178, 186) 100%)",
      };

    return {
      background: `linear-gradient(to ${
        isFirstStep ? "bottom" : "top"
      }, transparent 0%, transparent 75%, #3ab2ba 70%, #3ab2ba 100%)`,
    };
  };

  const isFirstStep = () => currentProject.name === (projects[0] as Project).name;
  const isLastStep = () => currentProject.name === (projects[projects.length - 1] as Project).name;

  const setPrevProject = () => {
    setCurrentProject(projects[currentProject.index - 1] as Project);
  };

  const setNextProject = () => {
    setCurrentProject(projects[currentProject.index + 1] as Project);
  };

  return (
    <section id="process">
      <SectionHeader sectionName="Projects" />
      <SectionTextContainer>
        <p>
          This section features projects that I have developed in my spare time, highlighting my
          skills and interests beyond my professional commitments.
        </p>
      </SectionTextContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 pt-[48px]">
        <div className="flex flex-col justify-center items-center">
          {projects.map((project, i) => (
            <div key={project.name} className="flex flex-row items-center relative">
              <div className="mx-[12px] h-[64px] w-[168px] text-center flex justify-center items-center font-medium">
                {project.name}
              </div>
              <div
                className={`
                h-8 w-8 rounded-full bg-black border-primary  flex z-10
                justify-center items-center text-sm font-semibold cursor-pointer
                ${
                  project.name === currentProject.name
                    ? "text-primary border-2"
                    : "text-white border-0"
                } 
              `}
                onClick={() => {
                  // 768px is the cutoff for tailwind md breakpoint
                  setCurrentProject(project);
                  if (window.innerWidth < 768) {
                    modalRef.current?.showModal();
                  }
                }}
              >
                {i + 1}
              </div>
              <div
                className="w-[3px] h-full absolute left-[207px] bg-primary"
                style={getVerticalTimelineStyle(i)}
              ></div>
            </div>
          ))}
        </div>

        <div className={`${styles.projectCard} hidden md:block`}>
          <Image src={currentProject.imgSrc} alt="" fill />

          <div className="flex flex-col items-center justify-center relative h-full z-10 text-white mx-[32px] xl:mx-[128px] text-sm lg:text-base">
            <p>{currentProject.description}</p>

            <div className="flex flex-col lg:flex-row justify-center mt-[16px]">
              <Link
                href={currentProject.productionUrl}
                target="_blank"
                className="btn btn-outline btn-accent normal-case w-[140px] lg:mr-[16px]"
              >
                View App
              </Link>
              <Link
                href={currentProject.codeUrl}
                target="_blank"
                className="btn btn-outline btn-info normal-case w-[140px] mt-[16px] lg:mt-[0px]"
              >
                View Code
              </Link>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={modalRef} className="modal fixed md:hidden">
        <div className="modal-box">
          <div className="flex justify-between mx-[12px]">
            <MdArrowCircleLeft
              className={`text-white transform scale-[2] ${isFirstStep() ? "opacity-50" : ""}`}
              onClick={() => !isFirstStep() && setPrevProject()}
            />
            <h3 className="text-white font-semibold">
              {currentProject.name}{" "}
              <span className="font-normal">
                ({currentProject.index + 1}/{projects.length})
              </span>
            </h3>
            <MdArrowCircleRight
              className={`text-white transform scale-[2] ${isLastStep() ? "opacity-50" : ""}`}
              onClick={() => !isLastStep() && setNextProject()}
            />
          </div>
          <div className="text-white text-sm font-normal mt-[16px]">
            {currentProject.description}
          </div>
          <div className="flex justify-center mt-[16px]">
            <Link
              href={currentProject.productionUrl}
              target="_blank"
              className="btn btn-outline btn-accent normal-case w-[140px] mr-[16px]"
            >
              View App
            </Link>
            <Link
              href={currentProject.codeUrl}
              target="_blank"
              className="btn btn-outline btn-info normal-case w-[140px]"
            >
              View Code
            </Link>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn normal-case">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

const ContactSection = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    inquiryDetails: "",
  });
  const [newProject, setNewProject] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    inquiryDetails: false,
  });
  const [createInquiryMutation, { isLoading, isSuccess, isError }] = useMutation(
    createInquiryResolver,
    {
      onError: (err, variables) => {
        Sentry.captureException({
          userData: variables,
          error: err,
        });
        setBtnDisabled(false);
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    if (name in details) {
      setDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { name, email, inquiryDetails } = details;

    if (!name || !email || !inquiryDetails) {
      setErrors({
        name: !name,
        email: !email,
        inquiryDetails: !inquiryDetails,
      });
      return;
    }
    setBtnDisabled(true);

    await createInquiryMutation({
      name: details.name,
      email: details.email,
      inquiryDetails: details.inquiryDetails,
      projectType: "",
    });
  };

  return (
    <section id="contact">
      <SectionHeader sectionName="Contact" />
      <SectionTextContainer>
        <p className="pb-[48px]">
          If you&apos;re interested in suggesting a topic for a blog article, seeking freelance
          services for website or app development, or if you just want to get in touch, please
          don&apos;t hesitate to reach out!
        </p>
      </SectionTextContainer>

      <div className="flex flex-col items-center">
        <div className="form-control w-[80%] sm:w-[50%]">
          <label className="label">
            <span className="label-text text-base-100">What is your name?*</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={details.name}
            onChange={handleChange}
            className={`input ${
              errors.name ? "input-error" : "input-primary"
            } bg-slate-100 input-bordered w-full text-sm`}
          />
        </div>
        <div className="form-control w-[80%] sm:w-[50%]">
          <label className="label">
            <span className="label-text text-base-100">What is your email?*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={details.email}
            onChange={handleChange}
            className={`input ${
              errors.email ? "input-error" : "input-primary"
            } bg-slate-100 input-bordered w-full text-sm`}
          />
        </div>
        <div className="form-control w-[80%] sm:w-[50%]">
          <label className="label">
            <span className="label-text text-base-100">How can I help you?*</span>
          </label>
          <textarea
            name="inquiryDetails"
            value={details.inquiryDetails}
            onChange={handleChange}
            className={`textarea ${
              errors.inquiryDetails ? "textarea-error" : "textarea-primary"
            } textarea-bordered h-24 bg-slate-100 text-sm`}
            placeholder="I want to build..."
          ></textarea>
        </div>
        <button
          className="btn normal-case w-[144px] my-[24px]"
          onClick={handleSubmit}
          disabled={btnDisabled || isLoading}
        >
          Submit
        </button>{" "}
      </div>
      {isSuccess && (
        <Alert alertVariant="alert-success" msg="Your inquiry was submitted successfully!" />
      )}
      {isError && (
        <Alert
          alertVariant="alert-error"
          msg="Apologies, inquiry failed to send. Please try again."
        />
      )}
    </section>
  );
};

const HomeContent = () => {
  const [result] = useQuery(getPosts, {});

  return (
    <Layout title="Home">
      <HeroSection />
      <div className="bg-white px-0 md:px-[144px]">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </Layout>
  );
};

const Home: BlitzPage = () => (
  <Suspense fallback={<p>loading home content...</p>}>
    <HomeContent />
  </Suspense>
);

export default Home;
