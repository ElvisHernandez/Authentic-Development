import React, { Suspense, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { BlitzPage, Routes } from "@blitzjs/next";
import {
  MdEngineering,
  MdDesignServices,
  MdDataThresholding,
  MdOutlineIntegrationInstructions,
  MdComputer,
  MdPrivateConnectivity,
} from "react-icons/md";

import Layout from "src/core/layouts/Layout";
import getPosts from "src/posts/queries/getPosts";
import Image from "next/image";
import MeImage from "../../public/me.jpeg";
import Link from "next/link";
import { handleLinkClickSmoothScroll, smoothScroll } from "src/utils/smoothScroll";
import createInquiryResolver from "src/inquiry/mutations/createInquiry";

const SectionHeader = (props: { sectionName: string }) => (
  <div className="flex py-[48px]">
    <div className="w-[35%] sm:w-[40%] md:w-[42.5%] h-6 bg-slate-100"></div>
    <h2 className="text-xl md:text-2xl w-[30%] sm:w-[20%] md:w-[15%] text-base-100 text-center font-semibold">
      {props.sectionName}
    </h2>
    <div className="w-[35%] sm:w-[40%] md:w-[42.5%] h-6 bg-slate-100"></div>
  </div>
);

const SectionTextContainer = ({ children }) => <div className="mx-[48px]">{children}</div>;

const HeroSection = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      smoothScroll(hash.slice(1));
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
        <h1 className="text-5xl">Lets build an experience together</h1>
        <p className="pt-[24px] text-white md:max-w-[70vw] lg:max-w-[55vw]">
          My name is Elvis, and I&apos;m a full-stack web developer specializing in creating SaaS
          products for startups. I&apos;ve honed my skills as a Founding Software Engineer at
          Onward, backed by Techstars, and Kraftful, supported by Y Combinator.
        </p>

        <div className="flex justify-center mt-[48px]">
          <Link
            href={`/#contact`}
            className="btn btn-outline btn-accent normal-case w-[140px] mr-[24px]"
            onClick={(e) => handleLinkClickSmoothScroll(e, "contact")}
          >
            Free Consult
          </Link>
          <Link
            href={`/#services`}
            className="btn btn-outline btn-info normal-case w-[140px]"
            onClick={(e) => handleLinkClickSmoothScroll(e, "services")}
          >
            Services
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
        Hi, I&apos;m Elvis, and I specialize in turning your big ideas into reality through custom
        software. With a strong foundation in science and engineering, I&apos;ve been at the ground
        floor of start-ups and have helped grow companies by providing them with the tools they need
        to succeed. My passion lies in understanding your business goals and transforming them into
        easy-to-use software solutions that not only work seamlessly but also drive revenue and
        efficiency.
      </p>
      <p className="mt-[24px]">
        I have a diverse set of skills that can help your business grow and stay competitive.
        Whether you&apos;re looking to provide your customers with a standout digital experience or
        you&apos;re in need of behind-the-scenes systems that make your business run smoothly,
        I&apos;ve got the experience to deliver. Let&apos;s talk about how I can help bring your
        vision to life.
      </p>
    </SectionTextContainer>
    <div className="flex justify-center pt-[48px]">
      <Image className="rounded-full " alt="Me!" src={MeImage} height={300} width={300} />
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services">
    <SectionHeader sectionName="Services" />
    <SectionTextContainer>
      <p>
        You&apos;ve got the vision; we&apos;ve got the expertise to bring it to life. Whether
        you&apos;re starting from scratch or need to optimize your existing platform, we offer
        comprehensive solutions that cater specifically to SaaS businesses.
      </p>
    </SectionTextContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 px-[48px] pt-[48px]">
      <div className="text-center">
        <MdEngineering className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">End-to-End Development</div>
        <p className="text-sm">
          Why piece together multiple specialists when you can get it all done in one place? We
          handle everything from initial sketches to the launch of your SaaS product. We even ensure
          it runs smoothly after the big day.
        </p>
      </div>

      <div className="text-center">
        <MdDesignServices className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">User-Friendly Interfaces</div>
        <p className="text-sm">
          A great idea deserves a sleek and intuitive design. With your customer in mind, we create
          engaging user experiences that not only look good but are easy to navigate.
        </p>
      </div>

      <div className="text-center">
        <MdDataThresholding className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">Data Optimization</div>
        <p className="text-sm">
          We implement smart data solutions that make your service faster and more reliable.
          Understand your business better through key performance indicators and analytics that we
          integrate seamlessly into your platform.
        </p>
      </div>

      <div className="text-center">
        <MdOutlineIntegrationInstructions className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">Seamless Third-Party Integrations</div>
        <p className="text-sm">
          Need to link up with other software or platforms? We&apos;ve got you covered. Our
          expertise allows for smooth integrations that extend your service&apos;s capabilities.
        </p>
      </div>

      <div className="text-center">
        <MdPrivateConnectivity className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">Secure & Scalable</div>
        <p className="text-sm">
          As your business grows, your platform should too. We build with scalability in mind,
          ensuring that you can easily add features or users as needed. Rest easy knowing your data
          and your users&apos; data are well-protected.
        </p>
      </div>

      <div className="text-center">
        <MdComputer className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">24/7 Support & Maintenance</div>
        <p className="text-sm">
          We don&apos;t just disappear after launch. Our ongoing support and maintenance services
          ensure your SaaS business continues to run smoothly, allowing you to focus on what you do
          best—running your business.
        </p>
      </div>
    </div>
  </section>
);

const ProcessSection = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);
  const processSteps = [
    {
      name: "Discovery & Planning",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">Initial Consultation</span>: Discuss the
            client&apos;s vision, target audience, unique value proposition, and any existing
            resources or requirements.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">Scope & Proposal</span>: Present a project
            proposal including a timeline, cost estimates, and a list of deliverables.
          </li>
          <li>
            <span className="font-semibold text-primary">Contract Signing</span>: Finalize the
            agreement outlining the scope of work, payment terms, and other legalities.
          </li>
        </ol>
      ),
    },
    {
      name: "Design & Prototyping",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">User Experience (UX) Design</span>: Work on
            sketches or wireframes that focus on creating a user-friendly interface.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">User Interface (UI) Design</span>: Once the
            UX is approved, proceed to finalize the visual elements like color schemes, typography,
            and other design components.
          </li>
          <li>
            <span className="font-semibold text-primary">Prototype Testing</span>: Validate the
            design with a clickable prototype and make iterations based on client and user feedback.
          </li>
        </ol>
      ),
    },
    {
      name: "Development",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">Backend & Frontend Development</span>:
            Start the coding process, incorporating best practices for scalability and security.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">Data Optimization</span>: Integrate data
            analytics tools and KPI (Key Performance Indicator) dashboards as part of the backend.
          </li>
          <li>
            <span className="font-semibold text-primary">Third-Party Integrations</span>:
            Incorporate necessary third-party services like payment gateways, social media logins,
            or any other external APIs.
          </li>
        </ol>
      ),
    },
    {
      name: "Quality Assurance",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">Testing</span>: Rigorous testing to catch
            bugs, security loopholes, and any usability concerns.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">Client Review</span>: Allow the client to
            review and approve the work before moving to the launch phase.
          </li>
        </ol>
      ),
    },
    {
      name: "Launch",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">Deployment</span>: Make the SaaS product
            live after final approval from the client.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">Monitoring</span>: Closely watch the
            platform for any issues and to ensure everything is operating as intended.
          </li>
        </ol>
      ),
    },
    {
      name: "Post-Launch",
      content: (
        <ol className="p-8">
          <li>
            <span className="font-semibold text-primary">24/7 Support & Maintenance</span>: Ongoing
            monitoring, updates, and customer support.
          </li>
          <li className="py-8">
            <span className="font-semibold text-primary">Performance Analytics</span>: Regularly
            update the client with performance metrics, helping them understand how the platform is
            being used and how it can be improved.
          </li>
          <li>
            <span className="font-semibold text-primary">Iterative Improvements</span>: Continuously
            work with the client for any new features or improvements based on analytics and user
            feedback.
          </li>
        </ol>
      ),
    },
  ];

  const getVerticalTimelineStyle = (index) => {
    const isFirstStep = index === 0;
    const isLastStep = index === processSteps.length - 1;
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

  return (
    <section id="process">
      <SectionHeader sectionName="Process" />
      <SectionTextContainer>
        <p>
          Transforming a concept into a successful product is no small feat—it&apos;s a journey. And
          like any journey, it&apos;s easier with a map. That&apos;s why we&apos;ve broken down our
          approach into key phases designed to tackle your unique challenges.
        </p>
      </SectionTextContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 pt-[48px]">
        <div className="flex flex-col justify-center items-center">
          {processSteps.map((processStep, i) => (
            <div key={processStep.name} className="flex flex-row items-center relative">
              <div className="mx-[12px] h-[64px] w-[168px] text-center flex justify-center items-center font-medium">
                {processStep.name}
              </div>
              <div
                className={`
                h-8 w-8 rounded-full bg-black border-primary  flex z-10
                justify-center items-center text-sm font-semibold cursor-pointer
                ${i === currentStepIndex ? "text-primary" : "text-white"} 
                ${i === currentStepIndex ? "border-2" : "border-0"}
              `}
                onClick={() => {
                  // 640px is the cutoff for tailwind sm breakpoint
                  if (window.innerWidth < 640) {
                    modalRef.current?.showModal();
                  } else {
                    setCurrentStepIndex(i);
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

        <div className="bg-base-100 rounded-lg text-white text-base font-normal hidden sm:block">
          {processSteps[currentStepIndex]?.content}
        </div>
      </div>

      <dialog ref={modalRef} className="modal fixed sm:hidden">
        <div className="modal-box">
          <div className="text-white text-sm font-normal">
            {processSteps[currentStepIndex]?.content}
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
      onError: () => {
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
      projectType: newProject ? "New project" : "Existing project",
    });
  };

  return (
    <section id="contact">
      <SectionHeader sectionName="Contact" />
      <SectionTextContainer>
        <p className="pb-[48px]">
          Looking to launch a groundbreaking SaaS solution, or eager to elevate an existing product
          to new heights? Reach out through the form below, and you&apos;ll receive a personalized
          response from me within one to two business days.
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
        <div className="w-[80%] sm:w-[50%]">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-100">Project Type*</span>
            </label>
            <div>
              <label className="label cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio bg-slate-200 checked:bg-accent mr-[12px]"
                  checked={newProject}
                  onChange={(e) => setNewProject(e.target.checked)}
                />
                <span className="label-text text-base-100">Building a new project</span>
              </label>
            </div>
            <div>
              <label className="label cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio bg-slate-200 checked:bg-accent mr-[12px]"
                  checked={!newProject}
                  onChange={(e) => setNewProject(!e.target.checked)}
                />
                <span className="label-text text-base-100">Improving an existing project</span>
              </label>
            </div>
          </div>
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

const Alert = (props: { alertVariant: string; msg: string }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={`alert ${props.alertVariant} fixed top-[88px] right-[24px] w-[fit-content]`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{props.msg}</span>
    </div>
  );
};

const HomeContent = () => {
  const [result] = useQuery(getPosts, {});

  return (
    <Layout title="Home">
      <HeroSection />
      <div className="bg-white px-0 md:px-[144px]">
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
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
