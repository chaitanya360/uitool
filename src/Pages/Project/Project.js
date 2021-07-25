import React, { useEffect, useState } from "react";
import { getProject } from "../../api/projects";
import storage from "../../api/storage";
import Loading from "../../components/Loading";
import MainLayout from "../../layouts/MainLayout";

function Project(props) {
  const PROJECT_ID = props.match.params.id;
  const tour = props.match.params.tour;
  const [project, setProject] = useState(false);
  useEffect(() => {
    getProject(PROJECT_ID).then((response) => {
      if (response.data) {
        if (response.data.status) setProject(response.data.data);
      }
    });
  }, []);

  return project ? (
    <MainLayout project={project} isTour={tour === "tour"} />
  ) : (
    <Loading />
  );
}

export default Project;
