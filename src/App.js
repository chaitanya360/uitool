import "antd/dist/antd.less";
import "./App.less";
import "animate.css";
// import "bootstrap/dist/css/bootstrap.css";
import "react-super-treeview/dist/style.css";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import storage from "./api/storage";
import MainLayout from "./layouts/MainLayout";
import Routes from "./Routes";
import ProjectCard from "./Pages/Dashboard/ProjectCard";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProjectsContext from "./context/ProjectsContext";
import { cursors, initialFrameValues, TourSteps } from "./utility/data";
import PublishedTagline from "./components/PublishedTagline";
import ErrorMessage from "./components/ErrorMessage";
import ErrorContext from "./context/ErrorContext";
import { getAllProjects } from "./api/projects";
import NavigationTree from "./components/NavigationTree";
import EditableField from "./components/atoms/EditableField";
import PageDetailsForm from "./components/molecules/PageDetailsForm";
import TourContext from "./context/TourContext";

const loadImage = () => {
  cursors.forEach((cursorSrc) => {
    const img = new Image();
    img.src = cursorSrc;
  });
};

let tourStepIndex = 0;
function App() {
  const [user, setUser] = useState(true);
  const [projects, setProjects] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [isTourOpen, setIsTourOpen] = useState(false);

  const [tourState, setTourState] = useState({});
  const [justFinishedStep, setJustFinishedStep] = useState("init");

  const tourSetup = () => {
    setTourState({
      steps: TourSteps,
      isTourOpen,
      setIsTourOpen,
      showButtons: false,
      disableDotsNavigation: true,
      closeWithMask: true,
      startAt: tourStepIndex,
      disableInteraction: false,
    });
  };

  const showTour = () => setIsTourOpen(true);
  const hideTour = () => setIsTourOpen(false);

  const nextStep = () => {
    tourStepIndex++;
    // hiding tour;
    hideTour();

    if (tourStepIndex >= TourSteps.length) return;

    // to counter ++
    setJustFinishedStep(TourSteps[tourStepIndex - 1].justFinished);

    setTourState((tour) => {
      if (!isTourOpen) showTour();
      tour.startAt = tourStepIndex;
      return tour;
    });
    setTimeout(() => {
      if (TourSteps[tourStepIndex].selector !== "hidden") showTour();
    }, 200);
  };

  const toogleArrow = () => {
    setTimeout(() => {
      setTourState((tour) => {
        tour.showButtons = !tour.showButtons;
        return tour;
      });
    }, 200);
  };

  const prevStep = () => {
    if (tourStepIndex === 6) return alert("Can't go back");
    tourStepIndex--;
    setJustFinishedStep(TourSteps[tourStepIndex + 1].justFinished);

    // hiding tour;
    hideTour();

    if (tourStepIndex >= TourSteps.length) return;

    setTourState((tour) => {
      if (!isTourOpen) showTour();
      tour.startAt = tourStepIndex;
      return tour;
    });
    setTimeout(() => {
      if (TourSteps[tourStepIndex].selector !== "hidden") showTour();
    }, 200);
  };

  const gotoStep = (stepNum) => {
    tourStepIndex = stepNum;
    setJustFinishedStep(TourSteps[tourStepIndex - 1].justFinished);

    // hiding tour;
    console.log(tourState);
    hideTour();

    setTourState((tour) => {
      if (!isTourOpen) showTour();
      tour.startAt = tourStepIndex;
      return tour;
    });

    if (TourSteps[tourStepIndex].selector !== "hidden") showTour();
  };

  useEffect(() => {
    // here we can trigger tour
    if (projects.length === 0 || true) {
      tourSetup();
    }
  }, [projects]);

  const checkUser = () => {
    // checking for user locally
    const savedUser = storage.getUser();
    if (savedUser) setUser(savedUser);
    else setUser(false);
  };

  const getProjects = () => {
    const token = storage.getToken();
    getAllProjects(token).then((response) => {
      console.log("fetching project", response.data);
      if (response.ok) {
        if (response.data.status) setProjects(response.data.data);
      } else setErrorMsg("something went wrong");
    });
  };

  useEffect(() => {
    loadImage();
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <TourContext.Provider
          value={{
            setTourState,
            isTourOpen,
            hideTour,
            showTour,
            nextStep,
            tourState,
            toogleArrow,
            gotoStep,
            justFinishedStep,
            prevStep,
          }}
        >
          <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
            <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
            <ProjectsContext.Provider value={{ projects, setProjects }}>
              <Routes />
            </ProjectsContext.Provider>
          </ErrorContext.Provider>
        </TourContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
