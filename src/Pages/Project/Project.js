import React, { useEffect, useState } from "react";
import { getProject } from "../../api/backend";
import storage from "../../api/storage";
import Loading from "../../components/Loading";
import MainLayout from "../../layouts/MainLayout";

function Project(props) {
  const PROJECT_ID = parseInt(props.match.params.id);
  const tour = props.match.params.tour;
  const [project, setProject] = useState(false);
  useEffect(() => {
    if (storage.get("project")) setProject(storage.get("project"));
    else setProject(getProject(PROJECT_ID));
  }, []);

  return project ? (
    <MainLayout project={project} isTour={tour === "tour"} />
  ) : (
    <Loading />
  );
}

export default Project;
