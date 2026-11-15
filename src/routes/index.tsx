import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { RoadmapPage } from '../pages/RoadmapPage'
import { StagePage } from '../pages/StagePage'
import { WeekPage } from '../pages/WeekPage'
import { DayPage } from '../pages/DayPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { paths } from './paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<DashboardPage />} />
        <Route path={paths.roadmap} element={<RoadmapPage />} />
        <Route path="/etapa/:stageId" element={<StagePage />} />
        <Route path="/semana/:weekNumber" element={<WeekPage />} />
        <Route path="/dia/:dayId" element={<DayPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
