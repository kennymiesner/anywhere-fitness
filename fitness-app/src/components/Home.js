import "../home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="styling">
        <div className="title">
          <p>The Future of Fitness</p>
        </div>
        <div className="mission">
          <img
            src="https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Galleries/10+Fitness+Tips/Muscle-confusion-is-the-only-way-to-go..jpg"
            alt="class of people working out"
            className="workout-class"
          />
          <p className="caption">
            These days, fitness classes can be held anywhere- a park, an
            unfinished basement or a garage- not just at a traditional gym.
            Certified fitness instructors need an easy way to take the
            awkwardness out of attendance taking and client payment processing.
            While you could use several mobile apps to accomplish this,
            AnywhereFitness is the all-in-one solution to meet your
            “on-location” fitness class needs. AnywhereFitness makes it painless
            for Instructors and Clients alike to hold and attend Fitness classes
            wherever they might be held.
          </p>
        </div>
        <div className="about">
          <h2 className="aboutTitle">About</h2>
          <p className="info">
            Instructors can take attendance, request and process payments,
            create virtual “punch passes” for each type of class offered, alert
            clients of cancellations or location changes and so much more.
            Clients can easily find out information on classes - location, class
            size, start time and duration, as well as reschedule or cancel an
            upcoming appointment or reservation right from the mobile app.
          </p>
        </div>
        <img
          className="instructor-client"
          src="https://www.verywellfit.com/thmb/K9KrzpMReACOMW_CMDd6Fuk2XF0=/2122x1194/smart/filters:no_upscale()/GettyImages-470333827-59d7cc980d327a0011d4b715.jpg"
          alt="instructor and client working out"
        />
      </div>
    </div>
  );
}
