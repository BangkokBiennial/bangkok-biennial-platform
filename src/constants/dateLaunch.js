const dateLaunch = {
  OCT31_TO_NOV21_2020: 'OCT31_TO_NOV21_2020',
  MAR13_TO_APR3_2021: 'MAR13_TO_APR3_2021',
  SEP17_TO_OCT9_2021: 'SEP17_TO_OCT9_2021',
  NONE_OF_THE_ABOVE: 'NONE_OF_THE_ABOVE',
}

const readable = {
  OCT31_TO_NOV21_2020: 'oct 31 to nov 21, 2020',
  MAR13_TO_APR3_2021: 'mar 13 to apr 3, 2021',
  SEP17_TO_OCT9_2021: 'sep 17 to oct 9, 2021',
  NONE_OF_THE_ABOVE: 'none of the above'
}

export const transformDateLaunchToReadable = (d) => {
  return readable[d]
}

export default dateLaunch