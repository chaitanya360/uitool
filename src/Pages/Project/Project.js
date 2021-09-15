import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getProject } from "../../api/projects";
import Loading from "../../components/Loading";
import AuthContext from "../../context/AuthContext";
import ErrorContext from "../../context/ErrorContext";
import MainLayout from "../../layouts/MainLayout";

function Project(props) {
  const { user } = useContext(AuthContext);
  const { setErrorMsg } = useContext(ErrorContext);
  const [loading, setLoading] = useState(true);

  const PROJECT_ID = props.match.params.id;
  const tour = props.match.params.tour;
  const [project, setProject] = useState(false);
  useEffect(() => {
    getProject(PROJECT_ID).then((response) => {
      if (response.data) {
        if (response.data.status) setProject(response.data.data);
        setLoading(false);
      } else {
        setErrorMsg("Can't Fetch Project, Try Login Again");
        setLoading(false);
      }
    });
  }, []);

  return loading ? (
    <Loading />
  ) : project ? (
    <MainLayout project={project} _isTour={tour === "tour"} />
  ) : (
    <Redirect to="/login" />
  );
}

export default Project;
