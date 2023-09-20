import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Routes, BlitzPage } from "@blitzjs/next";
import {
  MdEngineering,
  MdDesignServices,
  MdDataThresholding,
  MdOutlineIntegrationInstructions,
  MdComputer,
  MdPrivateConnectivity,
} from "react-icons/md";

import logout from "src/auth/mutations/logout";
import Layout from "src/core/layouts/Layout";
import { useCurrentUser } from "src/users/hooks/useCurrentUser";
import styles from "src/styles/Home.module.css";
import getPosts from "src/posts/queries/getPosts";
import Image from "next/image";
import MeImage from "../../public/me.jpeg";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    );
  }
};

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

const HeroSection = () => (
  <section className="h-screen">
    <div className="font-yellowtail top-[48px] left-[48px] text-4xl absolute text-white hidden xl:block">
      AD
    </div>

    <div className="relative overflow-x-clip hidden xl:block">
      <div id="home-nav-link-1">Home</div>
      <div id="home-nav-link-2">About</div>
      <div id="home-nav-link-3">Services</div>
      <div id="home-nav-link-4">Process</div>
      <div id="home-nav-link-5">Contact</div>
      <div id="home-nav-link-6">Blog</div>
      <div id="home-nav-link-7"></div>
      <div id="home-nav-link-8"></div>
      <div id="home-nav-link-9"></div>
    </div>

    <div className="px-[24px] md:pl-[48px] pt-[200px] sm:pt-[300px] text-white w-[fit-content]">
      <h1 className="text-5xl">Lets build an experience together</h1>
      <p className="pt-[24px] text-white md:max-w-[70vw] lg:max-w-[55vw]">
        My name is Elvis, and I'm a full-stack web developer specializing in creating SaaS products
        for startups. I've honed my skills as a Founding Software Engineer at Onward, backed by
        Techstars, and Kraftful, supported by Y Combinator.
      </p>

      <div className="flex justify-center mt-[48px]">
        <button className="btn btn-outline btn-accent normal-case w-[140px] mr-[24px]">
          Free Consult
        </button>
        <button className="btn btn-outline btn-info normal-case w-[140px]">Services</button>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section>
    <SectionHeader sectionName="About" />
    <SectionTextContainer>
      <p>
        Hi, I'm Elvis, and I specialize in turning your big ideas into reality through custom
        software. With a strong foundation in science and engineering, I've been at the ground floor
        of start-ups and have helped grow companies by providing them with the tools they need to
        succeed. My passion lies in understanding your business goals and transforming them into
        easy-to-use software solutions that not only work seamlessly but also drive revenue and
        efficiency.
      </p>
      <p className="mt-[24px]">
        I have a diverse set of skills that can help your business grow and stay competitive.
        Whether you're looking to provide your customers with a standout digital experience or
        you're in need of behind-the-scenes systems that make your business run smoothly, I've got
        the experience to deliver. Let's talk about how I can help bring your vision to life.
      </p>
    </SectionTextContainer>
    <div className="flex justify-center pt-[48px]">
      <Image className="rounded-full " alt="Me!" src={MeImage} height={300} width={300} />
    </div>
  </section>
);

const ServicesSection = () => (
  <section>
    <SectionHeader sectionName="Services" />
    <SectionTextContainer>
      <p>
        You've got the vision; we've got the expertise to bring it to life. Whether you're starting
        from scratch or need to optimize your existing platform, we offer comprehensive solutions
        that cater specifically to SaaS businesses.
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
          Need to link up with other software or platforms? We've got you covered. Our expertise
          allows for smooth integrations that extend your service's capabilities.
        </p>
      </div>

      <div className="text-center">
        <MdPrivateConnectivity className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">Secure & Scalable</div>
        <p className="text-sm">
          As your business grows, your platform should too. We build with scalability in mind,
          ensuring that you can easily add features or users as needed. Rest easy knowing your data
          and your users' data are well-protected.
        </p>
      </div>

      <div className="text-center">
        <MdComputer className="h-[64px] w-[64px] mx-auto my-[12px]" />
        <div className="font-medium mb-[12px]">24/7 Support & Maintenance</div>
        <p className="text-sm">
          We don't just disappear after launch. Our ongoing support and maintenance services ensure
          your SaaS business continues to run smoothly, allowing you to focus on what you do
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
            client's vision, target audience, unique value proposition, and any existing resources
            or requirements.
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
    <section className="">
      <SectionHeader sectionName="Process" />
      <SectionTextContainer>
        <p>
          Transforming a concept into a successful product is no small feat—it's a journey. And like
          any journey, it's easier with a map. That's why we've broken down our approach into key
          phases designed to tackle your unique challenges.
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
  const [newProject, setNewProject] = useState(true);
  return (
    <section>
      <SectionHeader sectionName="Contact" />
      <SectionTextContainer>
        <p className="pb-[48px]">
          Looking to launch a groundbreaking SaaS solution, or eager to elevate an existing product
          to new heights? Reach out through the form below, and you'll receive a personalized
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
            className="input input-primary bg-slate-100 input-bordered w-full text-sm"
          />
        </div>
        <div className="form-control w-[80%] sm:w-[50%]">
          <label className="label">
            <span className="label-text text-base-100">What is your email?*</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input input-primary bg-slate-100 input-bordered w-full text-sm"
          />
        </div>
        <div className="form-control w-[80%] sm:w-[50%]">
          <label className="label">
            <span className="label-text text-base-100">How can I help you?*</span>
          </label>
          <textarea
            className="textarea textarea-primary textarea-bordered h-24 bg-slate-100 text-sm"
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
        <button className="btn normal-case w-[144px] my-[24px]">Submit</button>{" "}
      </div>
    </section>
  );
};

const HomeContent = () => {
  const [result] = useQuery(getPosts, {});
  console.log(result);

  return (
    <Layout title="Home">
      {/* <div className={styles.buttonContainer}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div> */}
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
