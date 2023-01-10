import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../../features/tasks/tasksSlice";

import * as S from "./styles";

import HomeSidebar from "../../components/Home/HomeSidebar/HomeSidebar.jsx";
import HomeTimeSum from "../../components/Home/HomeTimeSum/HomeTimeSum.jsx";
import HomeAddTask from "../../components/Home/HomeAddTask/HomeAddTask.jsx";
import HomePomodoro from "../../components/Home/HomePomodoro/HomePomodoro.jsx";
import HomeList from "../../components/Home/HomeList/HomeList.jsx";
import HomeEditForm from "../../components/Home/HomeEditForm/HomeEditForm.jsx";

function Tasks() {
  const selectUpdateTaskIdOfTasksStore = useSelector(
    (state) => state.tasks.selectUpdateTaskId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <S.MainWrapper>
      <S.HomeSidebarWrapper>
        <HomeSidebar />
      </S.HomeSidebarWrapper>
      <S.ContentWrapper>
        <S.HomeTasksWrapper>
          <HomeTimeSum></HomeTimeSum>
          <HomeAddTask></HomeAddTask>
          <S.HomeListWrapper>
            <HomeList />
          </S.HomeListWrapper>
        </S.HomeTasksWrapper>
        {!!selectUpdateTaskIdOfTasksStore && (
          <S.HomeEditFormWrapper>
            <HomeEditForm
              key={selectUpdateTaskIdOfTasksStore}
              onClose={() => {}}
              onDeleteTask={() => {}}
            />
          </S.HomeEditFormWrapper>
        )}
      </S.ContentWrapper>
      <HomePomodoro></HomePomodoro>
    </S.MainWrapper>
  );
}

export default Tasks;
