import Companies from "../../components/student/Companies";
import CourseSection from "../../components/student/CourseSection";
import Hero from "../../components/student/Hero";

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <Companies />
      <CourseSection />
    </div>
  );
};

export default Home;
