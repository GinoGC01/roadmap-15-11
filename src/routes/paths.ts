export const paths = {
  home: '/',
  roadmap: '/roadmap',
  stage: (stageId: string) => `/etapa/${stageId}`,
  week: (weekNumber: number | string) => `/semana/${weekNumber}`,
  day: (dayId: string) => `/dia/${dayId}`,
}
